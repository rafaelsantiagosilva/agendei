import { ActivityIndicator } from 'react-native';
import { colors } from '@/theme';
import { styles } from './styles';

export function Loading() {
	return <ActivityIndicator size={36} color={colors.blue} style={styles.container} />;
}
