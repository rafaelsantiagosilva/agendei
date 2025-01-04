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

export default function Appointments() {
	const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
	const [doctors, setDoctors] = useState<DoctorInterface[]>([]);
	const navigate = useNavigate();

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
					<div className="flex items-center gap-8">
						<div className="flex items-center gap-3">
							<input
								className="border-2 p-2 pr-8 rounded text-zinc-800 focus:outline-none"
								type="date"
								name=""
								id=""
							></input>
							<span>até</span>
							<input
								className="border-2 p-2 pr-8 rounded text-zinc-800 focus:outline-none"
								type="date"
								name=""
								id=""
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
							<button className="bg-blue-600 text-white p-2 px-5 rounded hover:bg-blue-500">
								Filtrar
							</button>
						</div>
					</div>
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
							return <Appointment key={appointment.id} appointment={appointment} />;
						})}
					</tbody>
				</table>
			</main>
		</>
	);
}
