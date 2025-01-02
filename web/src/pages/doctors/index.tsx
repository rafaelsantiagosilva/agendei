import { Header } from '../../components/header';
import { ActionButton } from '../../components/actionButton';
import { OutlineButton } from '../../components/outlineButton';

export default function Doctors() {
	return (
		<>
			<Header page="doctors" />
			<main className="p-6">
				<header className="flex items-center w-screen justify-between mb-8">
					<div className="flex items-center gap-6">
						<h1 className="text-xl font-semibold">Médicos</h1>
						<OutlineButton text="Novo Médico" />
					</div>
					<div className="flex w-1/3 items-center gap-8">
						<div className="flex w-full gap-4 items-center">
							<input
								className="border-2 p-2 pr-8 w-2/3 rounded text-zinc-800 focus:outline-none"
								placeholder="Buscar por nome do médico"
								name=""
								id=""
							/>
							<button className="bg-blue-600 text-white p-2 px-5 rounded hover:bg-blue-500">
								Filtrar
							</button>
						</div>
					</div>
				</header>
				<table className="table-auto border-y w-full">
					<thead>
						<tr className="border-y p-12">
							<th className="text-left p-4" colSpan={8}>
								Médico
							</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-y flex items-center justify-between">
							<td className="p-4" colSpan={8}>
								Heber Stein Mazutti
							</td>
							<div className="flex gap-8">
								<td>
									<ActionButton type="edit" />
								</td>
								<td>
									<ActionButton type="delete" />
								</td>
							</div>
						</tr>
						<tr className="border-y flex items-center justify-between">
							<td className="p-4" colSpan={8}>
								Heber Stein Mazutti
							</td>
							<div className="flex gap-8">
								<td>
									<ActionButton type="edit" />
								</td>
								<td>
									<ActionButton type="delete" />
								</td>
							</div>
						</tr>
						<tr className="border-y flex items-center justify-between">
							<td className="p-4" colSpan={8}>
								Heber Stein Mazutti
							</td>
							<div className="flex gap-8">
								<td>
									<ActionButton type="edit" />
								</td>
								<td>
									<ActionButton type="delete" />
								</td>
							</div>
						</tr>
						<tr className="border-y flex items-center justify-between">
							<td className="p-4" colSpan={8}>
								Heber Stein Mazutti
							</td>
							<div className="flex gap-8">
								<td>
									<ActionButton type="edit" />
								</td>
								<td>
									<ActionButton type="delete" />
								</td>
							</div>
						</tr>
						<tr className="border-y flex items-center justify-between">
							<td className="p-4" colSpan={8}>
								Heber Stein Mazutti
							</td>
							<div className="flex gap-8">
								<td>
									<ActionButton type="edit" />
								</td>
								<td>
									<ActionButton type="delete" />
								</td>
							</div>
						</tr>
					</tbody>
				</table>
			</main>
		</>
	);
}
