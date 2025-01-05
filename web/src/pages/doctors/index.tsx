import { Header } from '../../components/header';
import { OutlineButton } from '../../components/outlineButton';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { Doctor as DoctorInterface } from '../../interfaces/Doctor';
import { Doctor } from './components/doctor';
import { getDoctors } from '../../services/getDoctors';
import { Button } from '../../components/button';
import { Input } from '../../components/input';

export default function Doctors() {
	const [doctors, setDoctors] = useState<DoctorInterface[]>([]);
	const [visibleDoctors, setVisibleDoctors] = useState<DoctorInterface[]>([]);
	const [doctorFilterName, setDoctorFilterName] = useState('');
	const navigate = useNavigate();

	const loadDoctors = useCallback(async () => {
		try {
			const data = await getDoctors('');
			setDoctors(data);
			setVisibleDoctors(data);
		} catch (error) {
			console.error(`> Error in load doctors: ${error}`);
		}
	}, []);

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

	return (
		<>
			<Header page="doctors" />
			<main className="p-6 overflow-x-auto">
				<header className="flex items-center w-full justify-between mb-8">
					<div className="flex w-1/3 items-center gap-6">
						<h1 className="text-xl font-semibold">Médicos</h1>
						<OutlineButton text="Novo Médico" />
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
							<Doctor key={doctor.id} doctor={doctor} />
						))}
					</tbody>
				</table>
			</main>
		</>
	);
}
