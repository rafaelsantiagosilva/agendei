import { View, Text, FlatList } from 'react-native';
import { appointments } from '@/helpers/fakeData';
import { Appointment } from '@/components/appointment';
import { styles } from './styles';
import { Header } from '@/components/header';

export function Calendar() {
	return (
		<View>
			<Header text='Minhas Reservas' />
			<FlatList
				data={appointments}
				style={styles.appointmentsList}
				keyExtractor={(appointment) => String(appointment.id)}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => {
					return <Appointment appointment={item} />;
				}}
			/>
		</View>
	);
}
