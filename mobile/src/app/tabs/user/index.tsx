import { View } from 'react-native';
import { styles } from './styles';
import { UserInfo } from '@/components/userInfo';

export function User() {
	return (
		<View style={styles.container}>
			<UserInfo title='Nome' info='Heber Stein Mazutti' />
      <UserInfo title='E-mail' info='heber@99coders.com.br' />
		</View>
	);
}
