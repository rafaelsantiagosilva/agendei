import { View, Text, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Doctor } from '@/components/doctor';
import DoctorInterface from '@/interfaces/Doctor';
import { NavigationProp } from '@react-navigation/native';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Loading } from '@/components/loading';

interface Props {
	navigation: NavigationProp<any, any>;
}

export function Home({ navigation }: Props) {
	const [doctors, setDoctors] = useState<DoctorInterface[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	async function loadDoctors() {
		try {
			setIsLoading(true);
			const doctors = await api
				.get('/doctors')
				.then((res) => res.data);
			setDoctors(doctors);
		} catch (error) {
			Alert.alert(
				'Ocorreu um erro',
				'Não foi possível visualizar os médicos. Por favor, tente novamente mais tarde.'
			);
		}
	}

	useEffect(() => {
		loadDoctors();
		setIsLoading(false);
	}, []);

	function handleClickDoctor(doctor: DoctorInterface) {
		const { id, name, specialty, icon } = doctor;
		navigation.navigate('services', {
			doctorId: id,
			doctorName: name,
			doctorSpecialty: specialty,
			doctorIcon: icon,
		});
	}

	return (
		<View style={styles.container}>
			{isLoading || !doctors ? (
				<Loading />
			) : doctors?.length > 0 ? (
				<>
					<Text style={styles.title}>Agende seus serviços médicos</Text>
					<FlatList
						data={doctors}
						style={styles.doctorsList}
						keyExtractor={(doctor) => String(doctor.id)}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => {
							return <Doctor doctor={item} onPress={() => handleClickDoctor(item)} />;
						}}
					/>
				</>
			) : (
				<View style={styles.notDoctorsContainer}>
					<Text style={styles.notDoctors}>
						Não há médicos disponíveis no momento.
					</Text>
				</View>
			)}
		</View>
	);
}
