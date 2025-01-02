import { Routes } from '@/routes/Routes';
import { AuthProvider } from '@/contexts/Auth';

export default function Index() {
	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	);
}
