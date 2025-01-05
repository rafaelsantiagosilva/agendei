import { Link, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/header';
import { OutlineButton } from '../../components/outlineButton';
import { useEffect, useState, useCallback } from 'react';
import { User as UserInterface } from '../../interfaces/User';
import { Doctor as DoctorInterface } from '../../interfaces/Doctor';
import { DoctorService as DoctorServiceInterface } from '../../interfaces/DoctorService';
import { getCustomers } from '../../services/getCustomers';
import { getDoctors } from '../../services/getDoctors';
import { getDoctorServices } from '../../services/getDoctorServices';
import { api } from '../../lib/api';
import { Alert } from '../../components/alert';
import { Appointment as AppointmentInterface } from '../../interfaces/Appointment';
import { getOneAppointment } from '../../services/getOneAppointment';
import { Modal } from '../../components/modal';
import { Button } from '../../components/button';
import { StatusModal } from '../../components/statusModal';
import { Select } from '../../components/select';
import { Input } from '../../components/input';

export default function AddAppointment() {
	const appointmentId = Number(useParams()?.id);
	const [appointment, setAppointment] = useState<AppointmentInterface | null>(
		null
	);
	const [customers, setCustomers] = useState<UserInterface[]>([]);
	const [doctors, setDoctors] = useState<DoctorInterface[]>([]);
	const [doctorServices, setDoctorServices] = useState<DoctorServiceInterface[]>(
		[]
	);
	const navigate = useNavigate();

	const [selectedCustomerId, setSelectedCustomerId] = useState(0);
	const [selectedDoctorId, setSelectedDoctorId] = useState(0);
	const [selectedServiceId, setSelectedServiceId] = useState(0);
	const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
	const [selectedHour, setSelectedHour] = useState('09:00');
	const [alertMessage, setAlertMessage] = useState('');

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [successModalTitle, setSuccessModalTitle] = useState('');
	const [successModalDescription, setSuccessModalDescription] = useState('');

	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [errorModalDescription, setErrorModalDescription] = useState('');

	function clearAlertMessage() {
		setAlertMessage('');
	}

	const loadAppointment = useCallback(async () => {
		try {
			const data = await getOneAppointment(appointmentId);
			setAppointment(data);
		} catch (error) {
			console.error(`> Error in load appointment: ${error}`);
		}
	}, [appointmentId]);

	async function loadCustomers() {
		try {
			const data = await getCustomers();
			setCustomers(data);
		} catch (error) {
			console.error(`> Error in load customers: ${error}`);
		}
	}

	async function loadDoctors() {
		try {
			const data = await getDoctors('');
			setDoctors(data);
		} catch (error) {
			console.error(`> Error in load doctors: ${error}`);
		}
	}

	async function loadDoctorServices(doctorId: number) {
		try {
			const data = await getDoctorServices(doctorId);
			setDoctorServices(data);
		} catch (error) {
			console.error(`> Error in load doctor services: ${error}`);
		}
	}

	function validateValues() {
		console.table({
			selectedCustomerId,
			selectedDoctorId,
			selectedServiceId,
			date,
			selectedHour,
		});

		if (
			selectedCustomerId === 0 ||
			selectedDoctorId === 0 ||
			selectedServiceId === 0 ||
			date.length === 0 ||
			selectedHour.length === 0
		) {
			setAlertMessage('Preencha todos os campos');
			return false;
		}

		if (new Date(`${date} ${selectedHour}:00`).getTime() < new Date().getTime()) {
			setAlertMessage('Por favor, selecione a data atual ou posterior');
			return false;
		}

		if (alertMessage.length > 0) setAlertMessage('');

		return true;
	}

	function openModal() {
		const areValids = validateValues();

		if (!areValids) return;

		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
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

	async function handleCreateAppointment() {
		try {
			const appointment = {
				user_id: selectedCustomerId,
				doctor_id: selectedDoctorId,
				service_id: selectedServiceId,
				booking_date: `${date}T${selectedHour}:00`,
				booking_hour: selectedHour,
			};

			await api.post('/admins/appointments', appointment);
			setSuccessModalTitle('Agendamento criado com sucesso');
			setSuccessModalDescription(
				`Seu agendamento foi criado com sucesso. Confirme para retornar ou feche para continuar cadastrando.`
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

	async function handleUpdateAppointment() {
		try {
			const newAppointment = {
				user_id: selectedCustomerId,
				doctor_id: selectedDoctorId,
				service_id: selectedServiceId,
				booking_date: `${date}T${selectedHour}:00`,
				booking_hour: selectedHour,
			};

			await api.put(`/appointments/${appointmentId}`, newAppointment);
			setSuccessModalTitle('Agendamento atualizado com sucesso');
			setSuccessModalDescription(
				`Seu agendamento foi atualizado com sucesso. Confirme para retornar ou feche para editar novamente.`
			);
			openSuccessModal();
		} catch (error) {
			console.error(
				`> Error in update appointment with id ${appointmentId}: ${error}`
			);
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

		loadCustomers();
		loadDoctors();

		if (appointmentId) {
			loadAppointment();
		}
	}, [appointmentId, navigate, loadAppointment]);

	useEffect(() => {
		if (appointment) {
			setSelectedCustomerId(appointment?.user_id);
			setSelectedDoctorId(appointment.doctor_id);
			setSelectedServiceId(appointment.service_id);
			setDate(appointment.booking_date.slice(0, 10));
			setSelectedHour(appointment.booking_hour);
		}
	}, [appointment, appointmentId]);

	useEffect(() => {
		if (selectedDoctorId === 0) return;

		loadDoctorServices(selectedDoctorId);
	}, [selectedDoctorId]);

	return (
		<>
			<Header />
			<main className="flex flex-col items-center justify-center">
				<h1 className="text-left w-2/5 text-2xl font-medium p-6 pl-10">
					{appointmentId > 0 ? 'Editar Agendamento' : 'Novo Agendamento'}
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
						<label htmlFor="customer">Cliente</label>
						<Select
							onChange={(event) => setSelectedCustomerId(Number(event.target.value))}
							value={selectedCustomerId}
						>
							<option value="0">Selecione o cliente</option>
							{customers.map((customer) => (
								<option
									key={customer.id}
									value={customer.id}
									defaultChecked={appointment?.user_id === customer.id}
								>
									{customer.name}
								</option>
							))}
						</Select>
					</div>
					<div className="w-full flex flex-col">
						<label htmlFor="doctor">Médico</label>
						<Select
							onChange={(event) => setSelectedDoctorId(Number(event.target.value))}
							value={selectedDoctorId}
						>
							<option value="0" defaultChecked>
								Selecione o médico
							</option>
							{doctors.map((doctor) => (
								<option key={doctor.id} value={doctor.id} onSelect={() => alert()}>
									{doctor.name}
								</option>
							))}
						</Select>
					</div>
					<div className="w-full flex flex-col">
						<label htmlFor="service">Serviço</label>
						<Select
							onChange={(event) => setSelectedServiceId(Number(event.target.value))}
							value={selectedServiceId}
						>
							<option value="0" defaultChecked>
								{doctorServices.length > 0
									? selectedDoctorId === 0
										? 'Selecione o médico'
										: 'Selecione o serviço'
									: 'Este médico não apresenta serviços'}
							</option>
							{doctorServices.map((doctorService) => (
								<option key={doctorService.id} value={doctorService.id}>
									{doctorService.description}
								</option>
							))}
						</Select>
					</div>
					<div className="flex items-center gap-4 w-full">
						<div className="flex flex-col w-1/2">
							<label htmlFor="date">Data</label>
							<Input
								className="text-zinc-800"
								onChange={(event) => setDate(event.target.value)}
								value={date}
								type="date"
							/>
						</div>
						<div className="flex flex-col w-1/2">
							<label htmlFor="hour">Hora</label>
							<Select
								onChange={(event) => setSelectedHour(event.target.value)}
								value={selectedHour}
							>
								<option value="09:00">09:00</option>
								<option value="09:30">09:30</option>
								<option value="10:00">10:00</option>
								<option value="10:30">10:30</option>
								<option value="11:00">11:00</option>
								<option value="11:30">11:30</option>
								<option value="12:00">12:00</option>
							</Select>
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
			{isNaN(appointmentId) ? (
				<Modal
					title="Confirmar criação de agendamento"
					description="Você tem certeza que deseja criar um agendamento com esses dados?"
					isOpen={isModalOpen}
					onConfirm={() => handleCreateAppointment()}
					onClose={closeModal}
				/>
			) : (
				<Modal
					title="Confirmar edição de agendamento"
					description="Você tem certeza que deseja alterar para estes dados?"
					isOpen={isModalOpen}
					onConfirm={() => handleUpdateAppointment()}
					onClose={closeModal}
				/>
			)}
			<StatusModal
				type="success"
				isOpen={isSuccessModalOpen}
				title={successModalTitle}
				description={successModalDescription}
				onConfirm={() => navigate('/appointments')}
				onClose={closeSuccessModal}
			/>
			<StatusModal
				type="error"
				isOpen={isErrorModalOpen}
				title="Erro"
				description={errorModalDescription}
				onConfirm={() => navigate('/appointments')}
				onClose={() => {
					closeErrorModal();
					navigate('/appointments');
				}}
			/>
		</>
	);
}
