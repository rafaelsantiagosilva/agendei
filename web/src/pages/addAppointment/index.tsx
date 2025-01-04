import { Link, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/header';
import { OutlineButton } from '../../components/outlineButton';
import { useEffect, useState } from 'react';
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

	function clearAlertMessage() {
		setAlertMessage('');
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	async function loadAppointment() {
		try {
			const data = await getOneAppointment(appointmentId);
			setAppointment(data);
		} catch (error) {
			console.error(`> Error in load appointment: ${error}`);
		}
	}

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

		return true;
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

		if (appointment) {
			setSelectedCustomerId(appointment?.user_id);
			setSelectedDoctorId(appointment.doctor_id);
			setSelectedServiceId(appointment.service_id);
		}
	}, [appointment, appointmentId, loadAppointment, navigate]);

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
					<div className="w-full">
						<label htmlFor="customer">Cliente</label>
						<select
							className="border-2 p-2 pr-8 rounded w-full text-zinc-800 focus:outline-none"
							onChange={(event) => setSelectedCustomerId(Number(event.target.value))}
							value={selectedCustomerId}
							name="customer"
							id="customer"
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
						</select>
					</div>
					<div className="w-full">
						<label htmlFor="doctor">Médico</label>
						<select
							className="border-2 p-2 pr-8 rounded w-full text-zinc-800 focus:outline-none"
							onChange={(event) => setSelectedDoctorId(Number(event.target.value))}
							value={selectedDoctorId}
							name="doctor"
							id="doctor"
						>
							<option value="0" defaultChecked>
								Selecione o médico
							</option>
							{doctors.map((doctor) => (
								<option key={doctor.id} value={doctor.id} onSelect={() => alert()}>
									{doctor.name}
								</option>
							))}
						</select>
					</div>
					<div className="w-full">
						<label htmlFor="service">Serviço</label>
						<select
							className="border-2 p-2 pr-8 rounded w-full text-zinc-800 focus:outline-none"
							onChange={(event) => setSelectedServiceId(Number(event.target.value))}
							value={selectedServiceId}
							name="service"
							id="service"
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
						</select>
					</div>
					<div className="flex w-full">
						<div className="w-1/2">
							<label htmlFor="date">Data</label>
							<input
								className="border-2 p-2 pr-8 rounded text-zinc-800 focus:outline-none"
								onChange={(event) => setDate(event.target.value)}
								value={date}
								type="date"
								name="date"
								id="date"
							/>
						</div>
						<div className="flex flex-col w-1/2">
							<label htmlFor="hour">Hora</label>
							<select
								className="border-2 p-2 pr-8 rounded text-zinc-800 focus:outline-none"
								onChange={(event) => setSelectedHour(event.target.value)}
								value={selectedHour}
								name="hour"
								id="hour"
							>
								<option value="09:00" defaultChecked>
									09:00
								</option>
								<option value="09:30">09:30</option>
								<option value="10:00">10:00</option>
								<option value="10:30">10:30</option>
								<option value="11:00">11:00</option>
								<option value="11:30">11:30</option>
								<option value="12:00">12:00</option>
							</select>
						</div>
					</div>
					<div className="flex gap-5">
						<Link to={'/appointments'}>
							<OutlineButton text="Cancelar" />
						</Link>
						<button className="bg-blue-600 text-white p-2 px-5 rounded hover:bg-blue-500">
							Salvar dados
						</button>
					</div>
				</form>
			</main>
		</>
	);
}
