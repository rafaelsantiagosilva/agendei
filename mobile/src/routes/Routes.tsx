import { useContext } from 'react';
import { OpenRoutes } from './OpenRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { AuthContext } from '@/contexts/Auth';

export function Routes() {
	const authContext = useContext(AuthContext);
	const user = authContext?.user ?? undefined;

	return user ? <PrivateRoutes /> : <OpenRoutes />;
}
