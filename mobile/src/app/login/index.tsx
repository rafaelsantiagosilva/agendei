import { View, Image } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { FooterWithLink } from '@/components/footerWithLink';

export default function Login() {
	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require('@/assets/logo.png')} />

			<View style={{ gap: 15 }}>
				<Input placeholder="E-mail" />
				<Input placeholder="Senha" secureTextEntry={true} />
				<Button>
					<Button.Text>Enviar</Button.Text>
				</Button>
			</View>

			<FooterWithLink
				text="Não possui uma conta?"
				linkText="Criar conta."
				linkHref=""
			/>
		</View>
	);
}
