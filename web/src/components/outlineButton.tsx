export function OutlineButton({ text }: { text: string }) {
	return (
		<button className="border border-blue-600 text-blue-600 p-2 rounded-md transition-colors hover:text-white hover:bg-blue-600">
			{text}
		</button>
	);
}
