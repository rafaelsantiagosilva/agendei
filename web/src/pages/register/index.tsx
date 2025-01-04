import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Alert } from '../../components/alert';
import { api } from '../../lib/api';
import { Button } from '../../components/button';
import { LoginAndRegisterHeader } from '../../components/loginAndRegisterHeader';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	const navigate = useNavigate();

	function clearAlertMessage() {
		setAlertMessage('');
	}

	function validateInputs() {
		if (
			name.length === 0 ||
			email.length === 0 ||
			password.length === 0 ||
			confirmPassword.length === 0
		) {
			setAlertMessage('Os campos devem ser preenchidos');
			return false;
		}

		const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!EMAIL_REGEX.test(email)) {
			setAlertMessage('Insira um email válido');
			return false;
		}

		if (password.length < 5) {
			setAlertMessage('A senha deve ter no mínimo 5 caracteres.');
			return false;
		}

		if (password != confirmPassword) {
			setAlertMessage('Os campos de senha estão diferentes.');
			return false;
		}

		return true;
	}

	async function handleCreateAccount() {
		const areValids = validateInputs();

		if (!areValids) return;

		try {
			await api.post('/admins/register', {
				name,
				email,
				password,
			});
			navigate('/login');
		} catch (error) {
			setAlertMessage('Ocorreu um erro. Tente novamente mais tarde.');
			console.error(`> Error in create account: ${error}`);
		}
	}

	return (
		<div className="flex w-full h-full">
			<section className="bg-white w-[45%] h-screen flex flex-col justify-between p-8">
				<LoginAndRegisterHeader>Crie sua conta agora mesmo.</LoginAndRegisterHeader>
				<main className="text-center">
					<h2 className="text-xl mb-10">Preencha os campos abaixo</h2>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							handleCreateAccount();
						}}
						className="flex flex-col gap-4 w-72 mx-auto"
					>
						<input
							type="text"
							placeholder="Nome"
							className="border-2 rounded p-2 focus:outline-none"
							value={name}
							onChange={(event) => setName(event.target.value)}
						/>
						<input
							type="text"
							placeholder="E-mail"
							className="border-2 rounded p-2 focus:outline-none"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
						<input
							type="password"
							placeholder="Senha"
							className="border-2 rounded p-2 focus:outline-none"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
						/>
						<input
							type="password"
							placeholder="Confirme a senha"
							className="border-2 rounded p-2 focus:outline-none"
							value={confirmPassword}
							onChange={(event) => setConfirmPassword(event.target.value)}
						/>
						<Button type="submit">Criar conta</Button>
						{alertMessage.length > 0 && (
							<Alert text={alertMessage} onClose={clearAlertMessage} />
						)}
					</form>
				</main>
				<footer className="text-center">
					Já tenho uma conta.{' '}
					<Link className="text-blue-600 font-semibold hover:underline" to="/">
						Acessar agora!
					</Link>
				</footer>
			</section>
			<div className="bg-blue-400 bg-blue-doctor bg-cover bg-center w-[60%] h-screen"></div>
		</div>
	);
}
