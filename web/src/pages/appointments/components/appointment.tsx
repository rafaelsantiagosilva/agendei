import { Link } from 'react-router-dom';
import { ActionButton } from '../../../components/actionButton';
import { Appointment as AppointmentInterface } from '../../../interfaces/Appointment';

interface Props {
	appointment: AppointmentInterface;
}

export function Appointment({ appointment }: Props) {
	return (
		<tr className="border-y">
			<td className="p-4">{appointment.user.name}</td>
			<td>{appointment.doctor.name}</td>
			<td>{appointment.service.description}</td>
			<td>
				{new Date(appointment.booking_date).toLocaleDateString('pt-BR')}{' '}
				{appointment.booking_hour}h
			</td>
			<td>
				{new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				}).format(Number(appointment.doctorService.price))}
			</td>
			<td>
				<Link to={"/appointments/edit/" + appointment.id}>
					<ActionButton type="edit" />
				</Link>
			</td>
			<td>
				<ActionButton type="delete" />
			</td>
		</tr>
	);
}
