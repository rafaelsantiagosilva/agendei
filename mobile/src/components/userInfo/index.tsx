import { View, ViewProps, Text } from 'react-native';
import { styles } from './styles';

interface Props extends ViewProps {
	title: string;
  info: string;
}

export function UserInfo({ title, info, ...rest }: Props) {
	return (
		<View style={styles.container} {...rest}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.info}>{info}</Text>
		</View>
	);
}
