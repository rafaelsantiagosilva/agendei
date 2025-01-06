import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa6';

interface Props {
	type: 'edit' | 'delete' | 'add';
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
		case 'add':
			color = 'bg-blue-600 hover:bg-blue-500';
			Icon = FaPlus;
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
