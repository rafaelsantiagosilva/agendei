import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Alert } from '../../components/alert';
import { ActionButton } from '../../components/buttons/actionButton';
import { Button } from '../../components/buttons/button';
import { OutlineButton } from '../../components/buttons/outlineButton';
import { Header } from '../../components/headers/header';
import { Input } from '../../components/inputs/input';
import { Select } from '../../components/inputs/select';
import { CreateDoctorServiceModal } from '../../components/modals/createDoctorServiceModal';
import { Modal } from '../../components/modals/modal';
import { StatusModal } from '../../components/modals/statusModal';
import { Doctor as DoctorInterface } from '../../interfaces/Doctor';
import { DoctorService as DoctorServiceInterface } from '../../interfaces/DoctorService';
import { Service as ServiceInterface } from '../../interfaces/Service';
import { api } from '../../lib/api';
import { getOneDoctor } from '../../services/getOneDoctor';
import { getServices } from '../../services/getServices';
import { DoctorService } from './components/doctorService';
import { getDoctorServices } from '../../services/getDoctorServices';

export default function AddDoctor() {
	const doctorId = Number(useParams()?.id);
	const [doctor, setDoctor] = useState<DoctorInterface>();

	const navigate = useNavigate();

	const [doctorName, setDoctorName] = useState('');
	const [doctorSpecialty, setDoctorSpecialty] = useState('');
	const [selectedGender, setSelectedGender] = useState('M');
	const [services, setServices] = useState<ServiceInterface[]>([]);
	const [doctorServices, setDoctorServices] = useState<DoctorServiceInterface[]>(
		[]
	);
	const [newDoctorServices, setNewDoctorServices] = useState<
		DoctorServiceInterface[]
	>([]);

	const [serviceId, setServiceId] = useState(0);
	const [servicePrice, setServicePrice] = useState('');

	const [alertMessage, setAlertMessage] = useState('');

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [isCreateDoctorServiceModalOpen, setIsCreateDoctorServiceModalOpen] =
		useState(false);

	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [successModalTitle, setSuccessModalTitle] = useState('');
	const [successModalDescription, setSuccessModalDescription] = useState('');

	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [errorModalDescription, setErrorModalDescription] = useState('');

	function clearAlertMessage() {
		setAlertMessage('');
	}

	const loadDoctor = useCallback(async () => {
		try {
			const data = await getOneDoctor(doctorId);
			setDoctor(data);
		} catch (error) {
			console.error(`> Error in load doctor: ${error}`);
			setErrorModalDescription('Ocorreu um erro ao carregar o médico.');
		}
	}, [doctorId]);

	const loadServices = useCallback(async () => {
		try {
			const data = await getServices();
			setServices(data);
		} catch (error) {
			console.error(`> Error in load services: ${error}`);
			setErrorModalDescription(
				'Ocorreu um erro ao carregar os serviços disponíveis para o médico. Tente novamente mais tarde.'
			);
			openErrorModal();
		}
	}, []);

	const loadDoctorServices = useCallback(async () => {
		try {
			const data = await getDoctorServices(doctorId);
			setDoctorServices(data);
		} catch (error) {
			console.error(`> Error in load services: ${error}`);
			setErrorModalDescription(
				'Ocorreu um erro ao carregar os serviços disponíveis para o médico. Tente novamente mais tarde.'
			);
			openErrorModal();
		}
	}, [doctorId]);

	function validateValues() {
		if (alertMessage.length > 0) setAlertMessage('');

		return true;
	}

	function addInDoctorServices(service: DoctorServiceInterface) {
		if (doctor) {
			setNewDoctorServices((values) => [...values, service]);
		}

		setDoctorServices((values) => [...values, service]);
	}

	function openModal() {
		const areValids = validateValues();

		if (!areValids) return;

		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
	}

	function openCreateDoctorServiceModal() {
		setIsCreateDoctorServiceModalOpen(true);
	}

	function closeCreateDoctorServiceModal() {
		setIsCreateDoctorServiceModalOpen(false);
	}

	function openSuccessModal() {
		setIsSuccessModalOpen(true);
	}

	function closeSuccessModal() {
		setIsSuccessModalOpen(false);
	}

	function openErrorModal() {
		setIsErrorModalOpen(true);
	}

	function closeErrorModal() {
		setIsErrorModalOpen(false);
	}

	async function handleCreateDoctor() {
		try {
			const doctor: DoctorInterface = {
				id: 0,
				name: doctorName,
				specialty: doctorSpecialty,
				icon: selectedGender,
			};

			const newDoctorServices: { service_id: number; price: string }[] = [];

			doctorServices.forEach((doctorService) => {
				newDoctorServices.push({
					service_id: doctorService.id,
					price: doctorService.price,
				});
			});

			await api.post('/doctors', { doctor, doctorServices: newDoctorServices });
			setSuccessModalTitle('Médico criado');
			setSuccessModalDescription(
				'O médico foi criado com sucesso! Clique em confirmar para voltar a listagem de médicos ou feche para continuar cadastrando.'
			);
			openSuccessModal();
		} catch (error) {
			console.error(`> Error in create appointment ${error}`);
			setErrorModalDescription(
				'Ocorreu um erro ao criar um novo agendamento. Por favor, tente novamente mais tarde.'
			);
			openErrorModal();
		}
	}

	async function handleUpdateDoctor() {
		try {
			const doctor: DoctorInterface = {
				id: doctorId,
				name: doctorName,
				specialty: doctorSpecialty,
				icon: selectedGender,
			};

			const moreDoctorServices: {
				doctor_id: number;
				service_id: number;
				price: string;
			}[] = [];

			newDoctorServices.forEach((doctorService) => {
				moreDoctorServices.push({
					doctor_id: doctorId,
					service_id: doctorService.id,
					price: doctorService.price,
				});
			});

			await api.put(`/doctors/${doctorId}`, { doctor, doctorServices: moreDoctorServices });

			setSuccessModalTitle('Médico editado');
			setSuccessModalDescription(
				'O médico foi editado com sucesso! Clique em confirmar para voltar a listagem de médicos ou feche para editar novamente.'
			);
			openSuccessModal();
		} catch (error) {
			console.error(`> Error in update doctor: ${error}`);
			setErrorModalDescription(
				'Ocorreu um erro ao editar o agendamento. Por favor, tente novamente mais tarde.'
			);
			openErrorModal();
		}
	}

	useEffect(() => {
		if (!api.defaults.headers.common.Authorization) {
			navigate('/');
		}

		if (doctorId && !doctor) {
			loadDoctor();
		}
	}, [doctorId, doctor, loadDoctor, navigate]);

	useEffect(() => {
		if (doctor) {
			setDoctorName(doctor.name);
			setDoctorSpecialty(doctor.specialty);
			setSelectedGender(doctor.icon);
		}
	}, [doctor]);

	useEffect(() => {
		loadServices();
		loadDoctorServices();
	}, [loadServices, loadDoctorServices]);

	return (
		<>
			<Header />
			<main className="flex flex-col items-center justify-center">
				<h1 className="text-left w-2/5 text-2xl font-medium p-6 pl-10">
					{doctorId > 0 ? 'Editar Médico' : 'Novo Médico'}
				</h1>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						validateValues();
					}}
					className="flex flex-col items-end gap-7 w-1/3"
				>
					{alertMessage.length > 0 && (
						<Alert text={alertMessage} onClose={clearAlertMessage} />
					)}
					<div className="w-full flex flex-col">
						<label htmlFor="name">Nome</label>
						<Input
							className="text-zinc-800"
							value={doctorName}
							onChange={(event) => setDoctorName(event.target.value)}
							placeholder="Digite o nome do médico"
						/>
					</div>
					<div className="w-full flex flex-col">
						<label htmlFor="specialty">Especialidade</label>
						<Input
							className="text-zinc-800"
							value={doctorSpecialty}
							onChange={(event) => setDoctorSpecialty(event.target.value)}
							placeholder="Digite a especialidade do médico"
						/>
					</div>
					<div className="w-full flex flex-col">
						<label htmlFor="doctor">Gênero</label>
						<Select
							value={selectedGender}
							onChange={(event) => setSelectedGender(event.target.value)}
						>
							<option value="M">Masculino</option>
							<option value="F">Feminino</option>
						</Select>
					</div>
					<div className="w-full flex flex-col">
						<label className="pb-2" htmlFor="service">
							Serviços
						</label>
						<div className="flex flex-col gap-4">
							<div className="flex items-center justify-between">
								<span className="">Adicionar serviço</span>
								<ActionButton onClick={openCreateDoctorServiceModal} type="add" />
							</div>
							<table className="table-auto border-y w-full">
								<thead>
									<tr className="border-y p-12">
										<th className="text-left p-4">Serviço</th>
										<th className="text-left">Preço</th>
									</tr>
								</thead>
								<tbody>
									{doctorServices.map((doctorService) => (
										<DoctorService doctorService={doctorService} />
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div className="flex gap-5">
						<Link to={'/appointments'}>
							<OutlineButton text="Cancelar" />
						</Link>
						<Button onClick={openModal} type="submit">
							Salvar dados
						</Button>
					</div>
				</form>
			</main>
			{isNaN(doctorId) ? (
				<Modal
					title="Confirmar criação de médico"
					description="Você tem certeza que deseja criar um médico com esses dados?"
					isOpen={isModalOpen}
					onConfirm={() => handleCreateDoctor()}
					onClose={closeModal}
				/>
			) : (
				<Modal
					title="Confirmar edição de médico"
					description="Você tem certeza que deseja alterar para estes dados?"
					isOpen={isModalOpen}
					onConfirm={() => handleUpdateDoctor()}
					onClose={closeModal}
				/>
			)}
			<CreateDoctorServiceModal
				isOpen={isCreateDoctorServiceModalOpen}
				services={services}
				selectedServiceId={serviceId}
				onChangeSelectedServiceId={setServiceId}
				price={servicePrice}
				onChangePrice={setServicePrice}
				onConfirm={addInDoctorServices}
				onClose={closeCreateDoctorServiceModal}
			/>
			<StatusModal
				type="success"
				isOpen={isSuccessModalOpen}
				title={successModalTitle}
				description={successModalDescription}
				onConfirm={() => navigate('/doctors')}
				onClose={closeSuccessModal}
			/>
			<StatusModal
				type="error"
				isOpen={isErrorModalOpen}
				title="Erro"
				description={errorModalDescription}
				onConfirm={() => navigate('/doctors')}
				onClose={() => {
					closeErrorModal();
					navigate('/doctors');
				}}
			/>
		</>
	);
}
