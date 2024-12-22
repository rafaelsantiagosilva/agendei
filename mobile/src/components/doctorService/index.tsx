import DoctorServiceInterface from '@/interfaces/DoctorService';
import { View, Text } from 'react-native';
import { Button } from '../button';
import { styles } from './styles';

interface Props {
	service: DoctorServiceInterface;
}

export function DoctorService({ service }: Props) {
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
				<Button style={styles.button}>
					<Button.Text>Agendar</Button.Text>
				</Button>
			</View>
		</View>
	);
}
