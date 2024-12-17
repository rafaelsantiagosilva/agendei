import { styles } from './styles';
import {
	TouchableOpacity,
	Text as T,
	TextProps,
	TouchableOpacityProps,
} from 'react-native';

function Text({ children, ...rest }: TextProps) {
	return <T style={styles.text}>{children}</T>;
}

function Button({ children, ...rest }: TouchableOpacityProps) {
	return (
		<TouchableOpacity style={styles.btn} {...rest}>
			{children}
		</TouchableOpacity>
	);
}

Button.Text = Text;

export { Button };
