import { ActionButton } from '../../../components/actionButton';
import { Doctor as DoctorInterface } from '../../../interfaces/Doctor';

export function Doctor({ doctor }: { doctor: DoctorInterface }) {
	return (
		<tr className="border-y flex items-center justify-between">
			<td className="p-4" colSpan={7}>
				{doctor.name}
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
	);
}
