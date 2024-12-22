import { DoctorService } from '@/components/doctorService';
import { doctorServices } from '@/helpers/fakeData';
import { FlatList, View, Image, Text } from 'react-native';
import { styles } from './styles';

export function DoctorServices() {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Serviços</Text>
				<View style={styles.doctor}>
					<Image source={require('@/assets/female.png')} style={styles.doctorIcon} />
					<Text style={styles.doctorName}>Dra. Nise da Silveira</Text>
          <Text style={styles.doctorSpecialty}>Cirurgia Plástica</Text>
				</View>
			</View>
			<FlatList
				data={doctorServices}
				keyExtractor={(service) => String(service.id)}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => <DoctorService service={item} />}
			/>
		</View>
	);
}
