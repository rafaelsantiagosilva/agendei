import AppointmentInterface from '@/interfaces/Appointment';
import { View, ViewProps, Text } from 'react-native';
import { Button } from '../button';
import { styles } from './styles';
import { IconCalendar, IconClock } from '@/icons';
import { IconWithText } from '../iconWithText';

interface Props extends ViewProps {
	appointment: AppointmentInterface;
}

export function Appointment({ appointment, ...rest }: Props) {
	return (
		<View style={styles.container} {...rest}>
			<View>
				<Text style={styles.title}>
					{appointment.service} - {appointment.doctor}
				</Text>
				<Text style={styles.specialty}>{appointment.specialty}</Text>
			</View>
			<View style={styles.footer}>
				<View style={styles.datetime}>
					<IconWithText>
						<IconWithText.Icon icon={IconCalendar} />
						<IconWithText.Text>{appointment.booking_date}</IconWithText.Text>
					</IconWithText>
					<IconWithText>
						<IconWithText.Icon icon={IconClock} />
						<IconWithText.Text>{appointment.booking_hour}h</IconWithText.Text>
					</IconWithText>
				</View>
				<View style={styles.buttonContainer}>
					<Button style={styles.button}>
						<Button.Text>Cancelar Reserva</Button.Text>
					</Button>
				</View>
			</View>
		</View>
	);
}
