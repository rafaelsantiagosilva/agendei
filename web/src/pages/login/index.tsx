import { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../../components/alert';
import { api } from '../../lib/api';
import { AxiosError } from 'axios';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	const navigate = useNavigate();

	function clearAlertMessage() {
		setAlertMessage('');
	}

	function validateInputs() {
		if (email.length === 0 || password.length === 0) {
			setAlertMessage('Os campos devem ser preenchidos');
			return false;
		}

		const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!EMAIL_REGEX.test(email)) {
			setAlertMessage('Insira um email válido');
			return false;
		}

		return true;
	}

	async function handleLogin() {
		const areValids = validateInputs();

		if (!areValids) return;

		try {
			const response = await api.post('/admins/login', { email, password });
			api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
			localStorage.setItem('username', response.data.name);
			navigate('/appointments');
		} catch (error) {
			const apiError = error as AxiosError;

			if (apiError.status === 404 || apiError.status === 401) {
				setAlertMessage('Usuário não cadastrado.');
				return;
			}

			setAlertMessage('Ocorreu um erro. Tente novamente mais tarde.');
			console.error(`> Error in user login: ${error}`);
		}
	}

	return (
		<div className="flex w-full h-full">
			<section className="bg-white w-[45%] h-screen flex flex-col justify-between p-8">
				<header className="flex flex-col items-center justify-center">
					<img
						src={logo}
						className="w-1/4 mb-8"
						alt="A logo de Agendei, que possui um A inicial, com o nome da marca escrito em minusculo. Tudo em cor azul."
					/>
					<p className="text-xl text-center text-zinc-800 font-bold">
						Gerencie seus agendamentos <br /> de forma descomplicada.
					</p>
				</header>
				<main className="text-center">
					<h2 className="text-xl mb-10">Acesse a sua conta</h2>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							handleLogin();
						}}
						className="flex flex-col gap-4 w-72 mx-auto"
					>
						<input
							type="email"
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
						<button
							type="submit"
							className="text-white bg-blue-600 p-2 rounded hover:bg-blue-500"
						>
							Acessar
						</button>
						{alertMessage.length > 0 && (
							<Alert text={alertMessage} onClose={clearAlertMessage} />
						)}
					</form>
				</main>
				<footer className="text-center">
					Não tenho conta.{' '}
					<Link
						className="text-blue-600 font-semibold hover:underline"
						to="/register"
					>
						Criar conta agora.
					</Link>
				</footer>
			</section>
			<div className="bg-blue-400 bg-blue-doctor bg-cover bg-center w-[60%] h-screen"></div>
		</div>
	);
}
