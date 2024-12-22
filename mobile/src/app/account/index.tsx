import { View, Image } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { FooterWithLink } from '@/components/footerWithLink';
import { colors } from '@/constants/colors';
import { IconHome } from '@/icons';

export default function Account() {
	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require('@/assets/logo.png')} />

			<View style={{ gap: 15 }}>
				<Input placeholder="Nome" />
				<Input placeholder="E-mail" />
				<Input placeholder="Senha" secureTextEntry={true} />
				<Button>
					<Button.Text>Enviar</Button.Text>
				</Button>
			</View>

			<FooterWithLink text="Já possui uma conta?" linkText="Entrar." linkHref="" />
		</View>
	);
}
