import Account from '@/app/account';
import Login from '@/app/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function OpenRoutes() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="login"
				component={Login}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="account"
				component={Account}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
}
