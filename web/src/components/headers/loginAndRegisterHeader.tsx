import { ComponentProps } from 'react';
import logo from '../../assets/logo.png';

export function LoginAndRegisterHeader({children}: ComponentProps<"header">) {
	return (
		<header className="flex flex-col items-center justify-center">
			<img
				src={logo}
				className="w-1/4 mb-8"
				alt="A logo de Agendei, que possui um A inicial, com o nome da marca escrito em minusculo. Tudo em cor azul."
			/>
			<p className="text-xl text-center text-zinc-800 font-bold">
				{children}
			</p>
		</header>
	);
}
