import { ComponentProps } from 'react';

export function Input({
	className,
	type,
	value,
	placeholder,
	onChange,
}: ComponentProps<'input'>) {
	return (
		<input
			className={`border-2 rounded p-2 focus:outline-none ${className}`}
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}
