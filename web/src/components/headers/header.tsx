import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import logo from '../../assets/white-logo.png';
import { GoTriangleDown } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Header({ page }: { page?: 'appointments' | 'doctors' }) {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	function openDropdown() {
		setIsDropDownOpen(true);
	}

	function closeDropdown() {
		setIsDropDownOpen(false);
	}

	function changeDropdown() {
		if (isDropDownOpen) {
			closeDropdown();
			return;
		}

		openDropdown();
	}

	return (
		<header className="w-screen h-16 bg-blue-600 flex items-center justify-between p-2">
			<div className="flex items-center">
				<Link to={'#'}>
					<img
						src={logo}
						className="w-40 p-4 cursor-pointer"
						alt="A logo de Agendei, que possui um A inicial, com o nome da marca escrito em minusculo. Tudo em cor branca."
					/>
				</Link>
				<nav className="text-white flex gap-6">
					<Link
						to="/appointments"
						className={`${
							page === 'appointments' ? 'font-semibold' : ''
						} hover:underline`}
					>
						Agendamentos
					</Link>
					<Link
						to="/doctors"
						className={`${page === 'doctors' ? 'font-semibold' : ''} hover:underline`}
					>
						Médicos
					</Link>
				</nav>
			</div>
			<div>
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<MenuButton onClick={changeDropdown} className="p-4 text-white flex items-center">
							<span>{localStorage.getItem('username')}</span>
							<GoTriangleDown className={`text-4xl transition-all ${isDropDownOpen ? 'rotate-180' : ''}`} />
						</MenuButton>
					</div>

					<MenuItems
						transition
						className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
					>
						<div className="py-1">
							<MenuItem>
								<a
									href="#"
									className="block px-4 py-2 text-sm border-b text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
								>
									Minha Conta
								</a>
							</MenuItem>
							<MenuItem>
								<a
									href="#"
									className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
								>
									Sair
								</a>
							</MenuItem>
						</div>
					</MenuItems>
				</Menu>
			</div>
		</header>
	);
}
