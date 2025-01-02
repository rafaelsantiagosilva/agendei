import { Header } from '../../components/header';
import { ActionButton } from '../../components/actionButton';
import { OutlineButton } from '../../components/outlineButton';

export default function Appointments() {
	return (
		<>
			<Header page="appointments" />
			<main className="p-6">
				<header className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-6">
						<h1 className="text-xl font-semibold">Agendamentos</h1>
						<OutlineButton text="Novo Agendamento" />
					</div>
					<div className="flex items-center gap-8">
						<div className="flex items-center gap-3">
							<select
								className="border-2 p-2 pr-8 rounded text-zinc-800 focus:outline-none"
								name=""
								id=""
							>
								<option value="" defaultChecked>
									01/10/2024
								</option>
							</select>
							<span>até</span>
							<select
								className="border-2 p-2 pr-8 rounded text-zinc-800 focus:outline-none"
								name=""
								id=""
							>
								<option value="" defaultChecked>
									10/10/2024
								</option>
							</select>
						</div>
						<div className="flex gap-4 items-center">
							<select
								className="border-2 p-2 pr-8 rounded text-zinc-800 focus:outline-none"
								name=""
								id=""
							>
								<option value="" defaultChecked>
									Todos os médicos
								</option>
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
						<tr className="border-y">
							<td className="p-4">Heber Stein Mazutti</td>
							<td>Dr. Antônio Almeida Souza</td>
							<td>Consulta</td>
							<td>01/10/2024 08:30h</td>
							<td>R$ 300,00</td>
							<td>
								<ActionButton type="edit" />
							</td>
							<td>
								<ActionButton type="delete" />
							</td>
						</tr>
						<tr className="border-y">
							<td className="p-4">Heber Stein Mazutti</td>
							<td>Dr. Antônio Almeida Souza</td>
							<td>Consulta</td>
							<td>01/10/2024 08:30h</td>
							<td>R$ 300,00</td>
							<td>
								<ActionButton type="edit" />
							</td>
							<td>
								<ActionButton type="delete" />
							</td>
						</tr>
						<tr className="border-y">
							<td className="p-4">Heber Stein Mazutti</td>
							<td>Dr. Antônio Almeida Souza</td>
							<td>Consulta</td>
							<td>01/10/2024 08:30h</td>
							<td>R$ 300,00</td>
							<td>
								<ActionButton type="edit" />
							</td>
							<td>
								<ActionButton type="delete" />
							</td>
						</tr>
						<tr className="border-y">
							<td className="p-4">Heber Stein Mazutti</td>
							<td>Dr. Antônio Almeida Souza</td>
							<td>Consulta</td>
							<td>01/10/2024 08:30h</td>
							<td>R$ 300,00</td>
							<td>
								<ActionButton type="edit" />
							</td>
							<td>
								<ActionButton type="delete" />
							</td>
						</tr>
						<tr className="border-y">
							<td className="p-4">Heber Stein Mazutti</td>
							<td>Dr. Antônio Almeida Souza</td>
							<td>Consulta</td>
							<td>01/10/2024 08:30h</td>
							<td>R$ 300,00</td>
							<td>
								<ActionButton type="edit" />
							</td>
							<td>
								<ActionButton type="delete" />
							</td>
						</tr>
					</tbody>
				</table>
			</main>
		</>
	);
}
