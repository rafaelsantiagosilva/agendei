import { IoClose } from 'react-icons/io5';
import { OutlineButton } from '../buttons/outlineButton';
import { Button } from '../buttons/button';
import { Select } from '../inputs/select';
import { Input } from '../inputs/input';
import { Service as ServiceInterface } from '../../interfaces/Service';
import { DoctorService as DoctorServiceInterface } from '../../interfaces/DoctorService';
import { useEffect, useState } from 'react';
import { Alert } from '../alert';

interface Props {
	isOpen: boolean;
	services: ServiceInterface[];
	price: string;
	selectedServiceId: number;
	onChangePrice: (value: string) => void;
	onChangeSelectedServiceId: (value: number) => void;
	onClose: () => void;
	onConfirm: (service: DoctorServiceInterface) => void;
}

export function CreateDoctorServiceModal({
	isOpen,
	services,
	price,
	selectedServiceId,
	onChangePrice,
	onChangeSelectedServiceId,
	onClose,
	onConfirm,
}: Props) {
	const [selectedServiceDescription, setSelectedServiceDescription] =
		useState('');
	const [alertMessage, setAlertMessage] = useState('');

	useEffect(() => {
		if (services.length > 0) {
			setSelectedServiceDescription(services[0].description);
			onChangeSelectedServiceId(services[0].id);
		}
	}, [onChangeSelectedServiceId, services]);

	function validateValues() {
		setAlertMessage('');

		if (price.length === 0) {
			setAlertMessage('Por favor, preencha o campo de preço.');
			return false;
		}

		if (price.includes('.') || isNaN(Number(price.replace(',', '.')))) {
			setAlertMessage('Por favor, digite o preço no seguinte formato: XXXX,XX');
			return false;
		}

		if (!price.includes(',')) {
			onChangePrice(price + ',00');
		}

		if (price.split(',')[1].length > 2) {
			setAlertMessage('Por favor, digite somente duas casas após a vírgula');
			return false;
		}

		return true;
	}

	return (
		<div
			className={`${
				isOpen ? '' : 'hidden'
			} transition-all fixed inset-0 bg-black/60 flex items-center justify-center`}
		>
			<div className="w-[640px] rounded-lg py-5 px-6 shadow-shape bg-white space-y-5">
				<header className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">Adicionar serviços</h2>
					<button
						onClick={onClose}
						className="text-xl border border-white hover:border-gray-200 rounded"
					>
						<IoClose />
					</button>
				</header>

				<p className="mt-2">Selecione o serviço que deseja adicionar</p>
				{alertMessage.length > 0 && (
					<Alert text={alertMessage} onClose={() => setAlertMessage('')} />
				)}
				<form
					onSubmit={(event) => {
						event.preventDefault();

						if (validateValues()) {
							onConfirm({
								id: selectedServiceId,
								description: selectedServiceDescription,
								price: price.replace(',', '.'),
							});

							onChangeSelectedServiceId(services[0].id);
							onChangePrice('');
							onClose();
							return;
						}
					}}
					className="flex flex-col gap-4"
				>
					<div className="flex gap-4 w-full">
						<Select
							className="w-1/2"
							value={selectedServiceId}
							onChange={(event) => {
								const selectedIndex = event.target.selectedIndex;
								const selectedText = event.target.options[selectedIndex].innerText;
								onChangeSelectedServiceId(Number(event.target.value));
								setSelectedServiceDescription(selectedText);
							}}
						>
							{services.map((service, index) => {
								return (
									<option
										key={service.id}
										value={service.id}
										defaultChecked={index == 0}
									>
										{service.description}
									</option>
								);
							})}
						</Select>
						<Input
							className="text-zinc-800 w-1/2"
							type="text"
							placeholder="Digite o preço em R$: 0,00"
							value={price}
							onChange={(event) => onChangePrice(event.target.value)}
						/>
					</div>
					<div className="flex justify-end items-center gap-4">
						<OutlineButton onClick={onClose} text="Cancelar" />
						<Button
							className="border border-blue-600 hover:border-blue-500"
							type="submit"
						>
							Confirmar
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
