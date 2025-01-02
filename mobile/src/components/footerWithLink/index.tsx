import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './styles';
import { NavigationProp } from '@react-navigation/native';

interface Props {
	text: string;
	linkText: string;
	linkHref: string;
	navigation: NavigationProp<any, any>;
}

export function FooterWithLink({
	text,
	linkText,
	linkHref,
	navigation,
}: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
			<TouchableOpacity onPress={() => navigation.navigate(linkHref)}>
				<Text style={styles.link}>{linkText}</Text>
			</TouchableOpacity>
		</View>
	);
}
