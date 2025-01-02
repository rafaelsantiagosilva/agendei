import { View, ViewProps, Text, Alert } from 'react-native';
import { Button } from '../button';
import { styles } from './styles';
import { IconCalendar, IconClock } from '@/icons';
import { IconWithText } from '../iconWithText';
import { api } from '@/lib/api';
import AppointmentInterface from '@/interfaces/Appointment';

interface Props extends ViewProps {
	appointment: AppointmentInterface;
	loadAppointments: () => void;
	setIsLoading: (value: boolean) => void;
}

export function Appointment({ appointment, loadAppointments, setIsLoading, ...rest }: Props) {
	async function deleteAppointment() {
		try {
			await api.delete('/appointments/' + appointment.id);
			Alert.alert('Reserva cancelada com sucesso.');
			await loadAppointments();
			setIsLoading(false);
		} catch (error) {
			Alert.alert(
				'Ocorreu um erro.',
				'Ocorreu um erro ao cancelar a reserva. Por favor, tente novamente mais tarde.'
			);
		}
	}

	function handleCancelAppointment() {
		Alert.alert(
			'Confirmar',
			'Você realmente deseja cancelar essa reserva? OBS: Essa ação não pode ser desfeita.',
			[
				{
					text: 'Sim',
					onPress: async () => await deleteAppointment(),
				},
				{
					text: 'Não',
					style: 'cancel',
				},
			]
		);
	}

	return (
		<View style={styles.container} {...rest}>
			<View>
				<Text style={styles.title}>
					{appointment.service.description} - {appointment.doctor.name}
				</Text>
				<Text style={styles.specialty}>{appointment.doctor.specialty}</Text>
			</View>
			<View style={styles.footer}>
				<View style={styles.datetime}>
					<IconWithText>
						<IconWithText.Icon icon={IconCalendar} />
						<IconWithText.Text>
							{new Date(appointment.booking_date).toLocaleDateString('pt-BR')}
						</IconWithText.Text>
					</IconWithText>
					<IconWithText>
						<IconWithText.Icon icon={IconClock} />
						<IconWithText.Text>{appointment.booking_hour}h</IconWithText.Text>
					</IconWithText>
				</View>
				<View style={styles.buttonContainer}>
					<Button onPress={handleCancelAppointment} style={styles.button}>
						<Button.Text>Cancelar Reserva</Button.Text>
					</Button>
				</View>
			</View>
		</View>
	);
}
