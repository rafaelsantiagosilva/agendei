import { Header } from '../../components/header';
import { OutlineButton } from '../../components/outlineButton';
import { Appointment as AppointmentInterface } from '../../interfaces/Appointment';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Appointment } from './components/appointment';
import { Link, useNavigate } from 'react-router-dom';
import { getAppointments } from '../../services/getAppointments';
import { Doctor as DoctorInterface } from '../../interfaces/Doctor';
import { getDoctors } from '../../services/getDoctors';
import { Button } from '../../components/button';
import { Modal } from '../../components/modal';
import { StatusModal } from '../../components/statusModal';

export default function Appointments() {
	const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
	const [doctors, setDoctors] = useState<DoctorInterface[]>([]);
	const [appointmentToDeleteId, setAppointmentToDeleteId] = useState(0);
	const navigate = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

	function openModal(appointmentId: number) {
		setAppointmentToDeleteId(appointmentId);
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

	async function loadAppointments() {
		try {
			const data = await getAppointments();
			setAppointments(data);
		} catch (error) {
			console.error(`> Error in load appointments: ${error}`);
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

	async function handleDeleteAppointment() {
		try {
			await api.delete(`/appointments/${appointmentToDeleteId}`);
			setAppointments(
				appointments.filter(
					(appointment) => appointment.id != appointmentToDeleteId
				)
			);
			closeModal();
			openSuccessModal();
		} catch (error) {
			console.error(`> Error on delete appointment: ${error}`);
			openErrorModal();
		}
	}

	useEffect(() => {
		if (!api.defaults.headers.common.Authorization) {
			navigate('/');
		}

		loadAppointments();
		loadDoctors();
	}, [navigate]);

	return (
		<>
			<Header page="appointments" />
			<main className="p-6">
				<header className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-6">
						<h1 className="text-xl font-semibold">Agendamentos</h1>
						<Link to={'/appointments/add'}>
							<OutlineButton text="Novo Agendamento" />
						</Link>
					</div>
					<form className="flex items-center gap-8">
						<div className="flex items-center gap-3">
							<input
								className="border-2 p-2 pr-8 rounded text-zinc-800 focus:outline-none"
								type="date"
								name="beginDate"
								id="beginDate"
							></input>
							<span>até</span>
							<input
								className="border-2 p-2 pr-8 rounded text-zinc-800 focus:outline-none"
								type="date"
								name="endDate"
								id="endDate"
							></input>
						</div>
						<div className="flex gap-4 items-center">
							<select
								className="border-2 p-2 pr-8 rounded text-zinc-800 focus:outline-none"
								name="doctors"
								id="doctors"
							>
								<option value={0} defaultChecked>
									Todos os médicos
								</option>
								{doctors.map((doctor) => (
									<option key={doctor.id} value={doctor.id}>
										{doctor.name}
									</option>
								))}
							</select>
							<Button type="submit" className="px-5">
								Filtrar
							</Button>
						</div>
					</form>
				</header>
				<table className="table-auto border-y w-full">
					<thead>
						<tr className="border-y p-12">
							<th className="text-left p-4">Paciente</th>
							<th className="text-left">Médico</th>
							<th className="text-left">Serviço</th>
							<th className="text-left">Data / Hora</th>
							<th className="text-left">Valor</th>
						</tr>
					</thead>
					<tbody>
						{appointments.map((appointment) => {
							return (
								<Appointment
									key={appointment.id}
									appointment={appointment}
									deleteFunction={openModal}
								/>
							);
						})}
					</tbody>
				</table>
			</main>
			<Modal
				title="Confirmar exclusão de agendamento"
				description="Você tem certeza que deseja alterar para estes dados?"
				isOpen={isModalOpen}
				onConfirm={() => handleDeleteAppointment()}
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
