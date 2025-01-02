import { View, Image, Alert } from 'react-native';
import { useState, useContext } from 'react';
import { styles } from './styles';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { FooterWithLink } from '@/components/footerWithLink';
import { api } from '@/lib/api';
import { AxiosError } from 'axios';
import { NavigationProp } from '@react-navigation/native';
import { AuthContext } from '@/contexts/Auth';

export default function Login({
	navigation,
}: {
	navigation: NavigationProp<any, any>;
}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const authContext = useContext(AuthContext);

	if (!authContext) throw new Error('> AuthContext is null');

	const { setUser } = authContext;

	async function handleLogin(navigation: NavigationProp<any, any>) {
		try {
			const response = await api.post('/users/login', { email, password });
			if (response.data) {
				api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
				setUser(response.data);
			}
		} catch (error: AxiosError | any) {
			const apiError = error as AxiosError;

			if (apiError.status === 401 || apiError.status === 404) {
				Alert.alert(
					'E-mail ou senha inválidos.',
					'Verifique os campos e tente novamente.'
				);
				return;
			}

			Alert.alert(
				'Ocorreu um erro ao realizar o login.',
				'Por favor, tente novamente mais tarde.'
			);
		}
	}

	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require('@/assets/logo.png')} />

			<View style={{ gap: 15 }}>
				<Input
					placeholder="E-mail"
					value={email}
					onChangeText={(text) => setEmail(text)}
					autoCapitalize="none"
				/>
				<Input
					placeholder="Senha"
					value={password}
					secureTextEntry={true}
					onChangeText={(text) => setPassword(text)}
					autoCapitalize="none"
				/>
				<Button
					onPress={async () => {
						await handleLogin(navigation);
					}}
				>
					<Button.Text>Enviar</Button.Text>
				</Button>
			</View>

			<FooterWithLink
				text="Não possui uma conta?"
				navigation={navigation}
				linkText="Criar conta."
				linkHref="account"
			/>
		</View>
	);
}
