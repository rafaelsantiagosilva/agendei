import { Header } from '../../components/headers/header';
import { OutlineButton } from '../../components/buttons/outlineButton';
import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { Doctor as DoctorInterface } from '../../interfaces/Doctor';
import { Doctor } from './components/doctor';
import { getDoctors } from '../../services/getDoctors';
import { Button } from '../../components/buttons/button';
import { Input } from '../../components/inputs/input';
import { StatusModal } from '../../components/modals/statusModal';
import { Modal } from '../../components/modals/modal';

export default function Doctors() {
	const [doctors, setDoctors] = useState<DoctorInterface[]>([]);
	const [visibleDoctors, setVisibleDoctors] = useState<DoctorInterface[]>([]);
	const [doctorFilterName, setDoctorFilterName] = useState('');
	const [doctorToDeleteId, setDoctorToDeleteId] = useState(0);
	const navigate = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

	function openModal(doctorId: number) {
		setDoctorToDeleteId(doctorId);
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

	const loadDoctors = useCallback(async () => {
		try {
			const data = await getDoctors('');
			setDoctors(data);
			setVisibleDoctors(data);
		} catch (error) {
			console.error(`> Error in load doctors: ${error}`);
		}
	}, []);

	async function handleDeleteDoctor() {
		try {
			await api.delete(`/doctors/${doctorToDeleteId}`);
			setDoctors(doctors.filter((doctor) => doctor.id != doctorToDeleteId));
			closeModal();
			openSuccessModal();
		} catch (error) {
			console.error(`> Error on delete appointment: ${error}`);
			openErrorModal();
		}
	}

	function handleFilterDoctors() {
		const newDoctors = doctors.filter((doctor) =>
			doctor.name.toLowerCase().includes(doctorFilterName)
		);

		setVisibleDoctors(newDoctors);
	}

	useEffect(() => {
		if (!api.defaults.headers.common.Authorization) {
			navigate('/');
		}

		loadDoctors();
	}, [navigate, loadDoctors]);

	useEffect(() => {
		setVisibleDoctors(doctors);
	}, [doctors]);

	return (
		<>
			<Header page="doctors" />
			<main className="p-6 overflow-x-auto">
				<header className="flex items-center w-full justify-between mb-8">
					<div className="flex w-1/3 items-center gap-6">
						<h1 className="text-xl font-semibold">Médicos</h1>
						<Link to={'/doctors/add'}>
							<OutlineButton text="Novo Médico" />
						</Link>
					</div>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							handleFilterDoctors();
						}}
						className="flex w-1/3 gap-4 items-center"
					>
						<Input
							placeholder="Buscar por nome do médico"
							className="w-full"
							value={doctorFilterName}
							onChange={(event) => setDoctorFilterName(event.target.value)}
						/>
						<Button className="px-5" type="submit">
							Filtrar
						</Button>
					</form>
				</header>
				<table className="table-auto border-y w-full">
					<thead>
						<tr className="border-y p-12">
							<th className="text-left p-4" colSpan={7}>
								Médico
							</th>
						</tr>
					</thead>
					<tbody>
						{visibleDoctors.map((doctor) => (
							<Doctor key={doctor.id} deleteFunction={openModal} doctor={doctor} />
						))}
					</tbody>
				</table>
			</main>
			<Modal
				title="Confirmar exclusão de agendamento"
				description="Você tem certeza que deseja deletar estes dados?"
				isOpen={isModalOpen}
				onConfirm={() => handleDeleteDoctor()}
				onClose={closeModal}
			/>
			<StatusModal
				type="success"
				isOpen={isSuccessModalOpen}
				title="Agendamento deletado com sucesso"
				description={
					'O agendamento foi deletado com sucesso. Caso isso seja um erro, contate o administrador de TI imediatamente.'
				}
				onConfirm={closeSuccessModal}
				onClose={closeSuccessModal}
			/>
			<StatusModal
				type="error"
				isOpen={isErrorModalOpen}
				title="Erro"
				description={
					'Ocorreu um erro ao deletar o agendamento. Tente novamente mais tarde.'
				}
				onConfirm={closeErrorModal}
				onClose={closeErrorModal}
			/>
		</>
	);
}
