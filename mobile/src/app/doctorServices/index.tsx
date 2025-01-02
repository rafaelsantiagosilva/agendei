import { DoctorService } from '@/components/doctorService';
import { FlatList, View, Image, Text, Alert } from 'react-native';
import { styles } from './styles';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';
import DoctorServiceInterface from '@/interfaces/DoctorService';
import { Loading } from '@/components/loading';

interface Props {
	navigation: NavigationProp<any, any>;
	route: RouteProp<any, any>;
}

export function DoctorServices({ navigation, route }: Props) {
	const [doctorServices, setDoctorServices] = useState<DoctorServiceInterface[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(false);

	const doctorId = route.params?.doctorId;
	const doctorName = route.params?.doctorName;
	const doctorSpecialty = route.params?.doctorSpecialty;
	const doctorIcon = route.params?.doctorIcon;

	async function loadServices() {
		try {
			setIsLoading(true);
			const response = await api.get(`/doctors/${doctorId}/services`);

			setDoctorServices(response.data);
		} catch (error) {
			console.error(error);
			Alert.alert(
				'Ocorreu um erro',
				'Ocorreu um erro ao exibir os serviços. Por favor, tente novamente mais tarde.'
			);
		}
	}

	useEffect(() => {
		loadServices();
		setIsLoading(false);
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.doctor}>
					{doctorIcon === 'M' && (
						<Image source={require('@/assets/male.png')} style={styles.doctorIcon} />
					)}
					{doctorIcon === 'F' && (
						<Image
							source={require('@/assets/female.png')}
							style={styles.doctorIcon}
						/>
					)}
					<Text style={styles.doctorName}>{doctorName}</Text>
					<Text style={styles.doctorSpecialty}>{doctorSpecialty}</Text>
				</View>
			</View>

			{isLoading ? (
				<Loading />
			) : doctorServices.length > 0 ? (
				<FlatList
					data={doctorServices}
					keyExtractor={(service) => String(service.id)}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<DoctorService
							service={item}
							doctorId={doctorId}
							navigation={navigation}
						/>
					)}
				/>
			) : (
				<View style={styles.notServicesContainer}>
					<Text style={styles.notServices}>
						{doctorName} não apresenta serviços no momento.
					</Text>
				</View>
			)}
		</View>
	);
}
