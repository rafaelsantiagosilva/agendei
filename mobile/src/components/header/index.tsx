import { View, ViewProps, Image, Text } from 'react-native';
import { styles } from './styles';

interface Props extends ViewProps {
	logo?: boolean;
	text?: string;
}

export function Header({ logo, text, ...rest }: Props) {
	return (
		<View style={styles.container} {...rest}>
			{logo ? (
				<Image style={styles.logo} source={require('@/assets/logo.png')} />
			) : (
				<Text style={styles.text}>{text}</Text>
			)}
		</View>
	);
}
