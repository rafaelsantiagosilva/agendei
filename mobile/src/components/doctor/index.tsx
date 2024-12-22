import DoctorInterface from '@/interfaces/Doctor';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TouchableOpacityProps,
} from 'react-native';
import { styles } from './styles';

interface Props extends TouchableOpacityProps {
	doctor: DoctorInterface;
}

export function Doctor({ doctor, ...rest }: Props) {
	return (
		<TouchableOpacity style={styles.container} {...rest}>
			{doctor.icon === 'M' && <Image source={require('@/assets/male.png')} />}
			{doctor.icon === 'F' && <Image source={require('@/assets/female.png')} />}
			<View>
				<Text style={styles.name}>{doctor.name}</Text>
				<Text style={styles.specialty}>{doctor.specialty}</Text>
			</View>
		</TouchableOpacity>
	);
}
