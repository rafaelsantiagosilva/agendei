import { IoClose } from 'react-icons/io5';

interface Props {
	text: string;
	onClose: () => void;
}

export function Alert({ text, onClose }: Props) {
	return (
		<aside className="flex w-full max-w-full justify-between text-white bg-red-500 border border-red-600 p-2 rounded">
			<span className="text-left max-w-2/3">{text}</span>{' '}
			<IoClose
				className="cursor-pointer text-xl rounded hover:border"
				onClick={onClose}
			/>
		</aside>
	);
}
