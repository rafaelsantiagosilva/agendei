import { View, FlatList, Alert, Text } from 'react-native';
import { Appointment } from '@/components/appointment';
import { Loading } from '@/components/loading';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AppointmentInterface from '@/interfaces/Appointment';

export function Calendar() {
	const [appointments, setAppointments] = useState<AppointmentInterface[]>();
	const [isLoading, setIsLoading] = useState(false);

	async function loadAppointments() {
		try {
			setIsLoading(true);
			const response = await api.get('/appointments');
			setAppointments(response.data);
		} catch (error) {
			Alert.alert(
				'Ocorreu um erro.',
				'Erro ao tentar carregar as reservas. Por favor, tente novamente mais tarde.'
			);
		}
	}

	useEffect(() => {
		loadAppointments();
		setIsLoading(false);
	}, []);

	return (
		<View style={styles.container}>
			{isLoading || !appointments ? (
				<Loading />
			) : appointments.length > 0 ? (
				<FlatList
					data={appointments}
					style={styles.appointmentsList}
					keyExtractor={(appointment) => String(appointment.id)}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => {
						return (
							<Appointment
								loadAppointments={loadAppointments}
								setIsLoading={setIsLoading}
								appointment={item}
							/>
						);
					}}
				/>
			) : (
				<View style={styles.notAppointmentsContainer}>
					<Text style={styles.notAppointments}>
						Não há reservas ainda. Que tal realizar uma?
					</Text>
				</View>
			)}
		</View>
	);
}
