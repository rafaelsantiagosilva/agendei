import { DoctorServices } from '@/app/doctorServices';
import Main from '@/app/main';
import { Schedule } from '@/app/schedule';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '@/theme';

const Stack = createNativeStackNavigator();

export function PrivateRoutes() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="main"
				component={Main}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="services"
				component={DoctorServices}
				options={{
					headerShown: true,
					title: 'Serviços',
					headerTitleAlign: 'center',
					headerTintColor: colors.white,
					headerStyle: {
						backgroundColor: colors.blue,
					},
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name="schedule"
				component={Schedule}
				options={{
					headerShown: true,
					title: 'Fazer uma reserva',
					headerTitleAlign: 'center',
					headerShadowVisible: false,
					headerTintColor: colors.blue,
				}}
			/>
		</Stack.Navigator>
	);
}
