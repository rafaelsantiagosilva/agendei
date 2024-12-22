import { View, FlatList } from 'react-native';
import { appointments } from '@/helpers/fakeData';
import { Appointment } from '@/components/appointment';
import { styles } from './styles';

export function Calendar() {
	return (
		<View style={styles.container}>
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
