import logo from '../../assets/logo.png';

export default function Register() {
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
						Crie sua conta agora mesmo.
					</p>
				</header>
				<main className="text-center">
					<h2 className="text-xl mb-10">Preencha os campos abaixo</h2>
					<form className="flex flex-col gap-4 w-72 mx-auto">
						<input
							type="text"
							placeholder="Nome"
							className="border-2 rounded p-2 focus:outline-none"
							required
						/>
						<input
							type="email"
							placeholder="E-mail"
							className="border-2 rounded p-2 focus:outline-none"
							required
						/>
						<input
							type="password"
							placeholder="Senha"
							className="border-2 rounded p-2 focus:outline-none"
							required
						/>
						<input
							type="password"
							placeholder="Confirme a senha"
							className="border-2 rounded p-2 focus:outline-none"
							required
						/>
						<button
							type="submit"
							className="text-white bg-blue-600 p-2 rounded hover:bg-blue-500"
						>
							Criar minha conta
						</button>
					</form>
				</main>
				<footer className="text-center">
					Já tenho uma conta.{' '}
					<a className="text-blue-600 font-semibold hover:underline" href="#">
						Acessar agora!
					</a>
				</footer>
			</section>
			<div className="bg-blue-400 bg-blue-doctor bg-cover bg-center w-[60%] h-screen"></div>
		</div>
	);
}
