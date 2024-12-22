import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { doctors } from '@/helpers/fakeData';
import { Doctor } from '@/components/doctor';
import { UserInfo } from '@/components/userInfo';
import { Header } from '@/components/header';

export function User() {
	return (
		<View style={styles.container}>
			<UserInfo title='Nome' info='Heber Stein Mazutti' />
      <UserInfo title='E-mail' info='heber@99coders.com.br' />
		</View>
	);
}
