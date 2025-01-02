import { View } from 'react-native';
import { styles } from './styles';
import { UserInfo } from '@/components/userInfo';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/Auth';
import { Button } from '@/components/button';
import { colors } from '@/theme';

export function User() {
	const authContext = useContext(AuthContext);
	if (!authContext) return;

	const { user, setUser } = authContext;

	return (
		<View style={styles.container}>
			<UserInfo title="Nome" info={user!.name} />
			<UserInfo title="E-mail" info={user!.email} />
			<View style={{display: "flex", alignItems: "center", width: "100%"}}>
				<Button
					onPress={() => setUser(null as any)}
					style={styles.buttonLogout}
				>
					<Button.Text>Sair</Button.Text>
				</Button>
			</View>
		</View>
	);
}
