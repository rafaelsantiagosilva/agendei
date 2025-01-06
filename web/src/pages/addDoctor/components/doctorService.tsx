import { DoctorService as DoctorServiceInterface } from '../../../interfaces/DoctorService';

export function DoctorService({
	doctorService,
}: {
	doctorService: DoctorServiceInterface;
}) {
	return (
		<tr className="border-y">
			<td className="text-left p-4">{doctorService.description}</td>
			<td className="text-left">
				{new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				}).format(Number(doctorService.price))}
			</td>
		</tr>
	);
}
