import { View, Image, Alert } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { FooterWithLink } from '@/components/footerWithLink';
import { NavigationProp } from '@react-navigation/native';
import { api } from '@/lib/api';
import { AxiosError } from 'axios';
import { useState } from 'react';

export default function Account({
	navigation,
}: {
	navigation: NavigationProp<any, any>;
}) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function validateInputs() {
		if (name.length === 0 || email.length === 0 || password.length === 0) {
			Alert.alert('Atenção', 'Todos os campos devem ser preenchidos.');
			return false;
		}
		if (name.length < 5 || name.length > 25) {
			Alert.alert('Erro', 'O campo nome deve conter entre 5 e 25 caracteres');
			return false;
		}

		if (email.length < 5) {
			Alert.alert('Erro', 'Verifique o campo E-mail');
			return false;
		}

		if (password.length < 5) {
			Alert.alert('Erro', 'O campo senha deve ter no mínimo 5 caracteres');
			return false;
		}

		return true;
	}

	async function handleCreateAccount(navigation: NavigationProp<any, any>) {
		try {
			const areValids = validateInputs();

			if (!areValids) return;

			await api.post('/users/register', {
				name,
				email,
				password,
			});
			Alert.alert('Bem-vindo!', 'Conta criada com sucesso.');
			navigation.navigate('login');
		} catch (error: AxiosError | any) {
			Alert.alert(
				'Ocorreu um erro ao criar conta!',
				'Por favor, tente novamente mais tarde.'
			);
		}
	}

	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require('@/assets/logo.png')} />
			<View style={{ gap: 15 }}>
				<Input
					placeholder="Nome"
					value={name}
					onChangeText={(text) => setName(text)}
					autoCapitalize="words"
				/>
				<Input
					placeholder="E-mail"
					value={email}
					onChangeText={(text) => setEmail(text)}
					autoCapitalize="none"
				/>
				<Input
					placeholder="Senha"
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => setPassword(text)}
					autoCapitalize="none"
				/>
				<Button
					onPress={async () => {
						await handleCreateAccount(navigation);
					}}
				>
					<Button.Text>Enviar</Button.Text>
				</Button>
			</View>

			<FooterWithLink
				text="Já possui uma conta?"
				navigation={navigation}
				linkText="Entrar."
				linkHref="login"
			/>
		</View>
	);
}
