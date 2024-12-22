import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './styles';

interface Props {
	text: string;
	linkText: string;
	linkHref: string;
}

export function FooterWithLink({ text, linkText, linkHref }: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
			<TouchableOpacity>
				<Text style={styles.link}>{linkText}</Text>
			</TouchableOpacity>
		</View>
	);
}
