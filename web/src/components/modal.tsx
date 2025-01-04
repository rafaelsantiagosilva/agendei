import { IoClose } from 'react-icons/io5';
import { OutlineButton } from './outlineButton';
import { Button } from './button';

interface Props {
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export function Modal({
	title,
	description,
	isOpen,
	onClose,
	onConfirm,
}: Props) {
	return (
		<div
			className={`${
				isOpen ? '' : 'hidden'
			} transition-all fixed inset-0 bg-black/60 flex items-center justify-center`}
		>
			<div className="w-[640px] rounded-lg py-5 px-6 shadow-shape bg-white space-y-5">
				<header className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">{title}</h2>
					<button
						onClick={onClose}
						className="text-xl border border-white hover:border-gray-200 rounded"
					>
						<IoClose />
					</button>
				</header>

				<p className="mt-2">{description}</p>

				<form
					onSubmit={(event) => {
						event.preventDefault();
						onConfirm();
					}}
					className="flex justify-end gap-4"
				>
					<OutlineButton onClick={onClose} text="Cancelar" />
					<Button type="submit">Confirmar</Button>
				</form>
			</div>
		</div>
	);
}
