import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface Props {
	type: 'edit' | 'delete';
	onClick?: () => void;
}

export function ActionButton({ type, onClick }: Props) {
	let color = '';
	let Icon = FaEdit;

	switch (type) {
		case 'edit':
			color = 'bg-blue-600 hover:bg-blue-500';
			break;
		case 'delete':
			color = 'bg-red-600 hover:bg-red-500';
			Icon = RiDeleteBin6Line;
			break;
	}

	return (
		<button
			onClick={onClick}
			className={`${color} text-white p-2 rounded text-center`}
		>
			<Icon />
		</button>
	);
}
