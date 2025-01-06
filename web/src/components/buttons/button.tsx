import { ComponentProps } from 'react';

export function Button({
	className,
	children,
	type,
	onClick,
}: ComponentProps<'button'>) {
	return (
		<button
			className={`text-white bg-blue-600 p-2 rounded hover:bg-blue-500 ${className}`}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
