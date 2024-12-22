import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { doctors } from '@/helpers/fakeData';
import { Doctor } from '@/components/doctor';
import { Header } from '@/components/header';

export function Home() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Agende seus serviços médicos</Text>
			<FlatList
				data={doctors}
				style={styles.doctorsList}
				keyExtractor={(doctor) => String(doctor.id)}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => {
					return <Doctor doctor={item} />;
				}}
			/>
		</View>
	);
}
