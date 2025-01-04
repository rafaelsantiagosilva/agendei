import { ActionButton } from '../../../components/actionButton';
import { Doctor as DoctorInterface } from '../../../interfaces/Doctor';

export function Doctor({ doctor }: { doctor: DoctorInterface }) {
	return (
		<tr className="border-y flex items-center justify-between">
			<td className="p-4" colSpan={7}>
				{doctor.name}
			</td>
			<td className='flex gap-3'>
				<ActionButton type="edit" />
				<ActionButton type="delete" />
			</td>
		</tr>
	);
}
