interface Props {
	className?: string;
	value: string | number;
	children: React.ReactNode;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({ className, value, children, onChange }: Props) {
	return (
		<select
			className={`border-2 p-2 pr-8 rounded text-zinc-800 focus:outline-none ${className}`}
			value={value}
			onChange={onChange}
		>
			{children}
		</select>
	);
}
