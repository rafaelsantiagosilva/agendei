import {
	useState,
	createContext,
	ReactNode,
	Dispatch,
	SetStateAction,
} from 'react';
import UserInterface from '@/interfaces/User';
import { initialUser } from '@/helpers/fakeData';

export interface ContextInterface {
	user: UserInterface | null;
	setUser:
		| Dispatch<SetStateAction<UserInterface>>
		| Dispatch<SetStateAction<null>>;
}

const AuthContext = createContext<ContextInterface | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState(null);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };
