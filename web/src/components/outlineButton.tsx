interface Props {
	text: string;
	onClick?: () => void;
}

export function OutlineButton({ text, onClick }: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="border border-blue-600 text-blue-600 p-2 rounded-md transition-colors hover:text-white hover:bg-blue-600"
		>
			{text}
		</button>
	);
}
