import { IoClose } from 'react-icons/io5';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdOutlineErrorOutline } from 'react-icons/md';

interface Props {
	title: string;
	description: string;
	isOpen: boolean;
	type: 'success' | 'error';
	onClose: () => void;
	onConfirm: () => void;
}

export function StatusModal({
	title,
	description,
	isOpen,
	type,
	onClose,
	onConfirm,
}: Props) {
	let color = '';
	let iconColor = '';
	let Icon = FaRegCheckCircle;

	switch (type) {
		case 'success':
			color = 'bg-green-600 hover:bg-green-500';
			iconColor = 'text-green-600';
			break;
		case 'error':
			color = 'bg-red-600 hover:bg-red-500';
			iconColor = 'text-red-600';
			Icon = MdOutlineErrorOutline;
			break;
	}

	return (
		<div
			className={`${
				isOpen ? '' : 'hidden'
			} transition-all fixed inset-0 bg-black/60 flex items-center justify-center`}
		>
			<div className="w-[640px] rounded-lg py-5 px-6 shadow-shape bg-white space-y-5">
				<header>
					<div className="flex items-center justify-end">
						<button
							onClick={onClose}
							className="text-xl border border-white hover:border-gray-200 rounded"
						>
							<IoClose />
						</button>
					</div>
					<div className="flex flex-col items-center">
						<Icon className={`text-8xl ${iconColor}`} />
						<h2 className="text-2xl font-semibold">{title}</h2>
					</div>
				</header>

				<p className="mt-2">{description}</p>

				<form
					onSubmit={(event) => {
						event.preventDefault();
						onConfirm();
					}}
					className="flex justify-end gap-4"
				>
					<button type="submit" className={`${color} text-white p-2 px-5 rounded`}>
						Confirmar
					</button>
				</form>
			</div>
		</div>
	);
}
