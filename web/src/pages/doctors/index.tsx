import { Header } from '../../components/header';
import { OutlineButton } from '../../components/outlineButton';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { Doctor as DoctorInterface } from '../../interfaces/Doctor';
import { Doctor } from './components/doctor';
import { getDoctors } from '../../services/getDoctors';

export default function Doctors() {
	const [doctors, setDoctors] = useState<DoctorInterface[]>([]);
	const [doctorFilterName, setDoctorFilterName] = useState('');
	const navigate = useNavigate();

	async function loadDoctors() {
		try {
			const data = await getDoctors(doctorFilterName);
			setDoctors(data);
		} catch (error) {
			console.error(`> Error in load doctors: ${error}`);
		}
	}

	async function handleFilterDoctors() {
		try {
			const response = await api.get('/doctors?name=' + doctorFilterName);
			setDoctors(response.data);
		} catch (error) {
			console.error(`> Error in load doctors: ${error}`);
		}
	}

	useEffect(() => {
		if (!api.defaults.headers.common.Authorization) {
			navigate('/');
		}

		loadDoctors();
	}, [navigate]);

	return (
		<>
			<Header page="doctors" />
			<main className="p-4 overflow-x-auto">
				<header className="flex items-center w-full justify-between mb-8">
					<div className="flex w-1/3 items-center gap-6">
						<h1 className="text-xl font-semibold">Médicos</h1>
						<OutlineButton text="Novo Médico" />
					</div>
					<div className="flex items-center gap-8">
						<form
							onSubmit={(event) => {
								event.preventDefault();
								handleFilterDoctors();
							}}
							className="flex gap-4 items-center"
						>
							<input
								className="border-2 w-80 p-2 pr-8 rounded text-zinc-800 focus:outline-none"
								placeholder="Buscar por nome do médico"
								name="doctorFilter"
								id="doctorFilter"
								value={doctorFilterName}
								onChange={(event) => setDoctorFilterName(event.target.value)}
							/>
							<button
								type="submit"
								className="bg-blue-600 text-white p-2 px-5 rounded hover:bg-blue-500"
							>
								Filtrar
							</button>
						</form>
					</div>
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
						{doctors.map((doctor) => (
							<Doctor key={doctor.id} doctor={doctor} />
						))}
					</tbody>
				</table>
			</main>
		</>
	);
}
