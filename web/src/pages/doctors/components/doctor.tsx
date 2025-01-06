import { Link } from 'react-router-dom';
import { ActionButton } from '../../../components/buttons/actionButton';
import { Doctor as DoctorInterface } from '../../../interfaces/Doctor';

interface Props {
	doctor: DoctorInterface;
	deleteFunction: (doctorId: number) => void;
}

export function Doctor({ doctor, deleteFunction }: Props) {
	return (
		<tr className="border-y flex items-center justify-between">
			<td className="p-4" colSpan={7}>
				{doctor.name}
			</td>
			<td className="flex gap-3">
				<Link to={`/doctors/edit/${doctor.id}`}>
					<ActionButton type="edit" />
				</Link>
				<ActionButton onClick={() => deleteFunction(doctor.id)} type="delete" />
			</td>
		</tr>
	);
}
