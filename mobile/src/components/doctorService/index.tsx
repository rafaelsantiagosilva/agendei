import DoctorServiceInterface from '@/interfaces/DoctorService';
import { View, Text } from 'react-native';
import { Button } from '../button';
import { styles } from './styles';
import { NavigationProp } from '@react-navigation/native';

interface Props {
	service: DoctorServiceInterface;
	doctorId: number;
	navigation: NavigationProp<any, any>;
}

export function DoctorService({ service, doctorId, navigation }: Props) {
	function handleClickService(serviceId: number) {
		navigation.navigate('schedule', { serviceId, doctorId });
	}

	return (
		<View style={styles.container}>
			<View style={styles.info}>
				<Text style={styles.description}>{service.description}</Text>
				<Text style={styles.price}>
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}).format(service.price)}
				</Text>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					style={styles.button}
					onPress={() => handleClickService(service.id)}
				>
					<Button.Text>Agendar</Button.Text>
				</Button>
			</View>
		</View>
	);
}
