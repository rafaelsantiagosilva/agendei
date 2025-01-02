import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './tabs/home';
import { colors } from '@/constants/colors';
import { IconHome, IconCalendar, IconUser } from '@tabler/icons-react-native';
import { Calendar } from './tabs/calendar';
import { Header } from '@/components/header';
import { User } from './tabs/user';

const Tab = createBottomTabNavigator();

export default function Main() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					headerTitleAlign: 'center',
					headerTitle: () => {
						return <Header logo={true} />;
					},
					tabBarIcon: ({ focused }) => {
						return <IconHome color={colors.blue} opacity={focused ? 1 : 0.6} />;
					},
					tabBarShowLabel: false,
					headerShadowVisible: false,
				}}
			/>
			<Tab.Screen
				name="Consultas"
				component={Calendar}
				options={{
					headerTitleAlign: 'center',
					headerTitle: () => {
						return <Header text="Minhas Reservas" />;
					},
					tabBarIcon: ({ focused }) => {
						return <IconCalendar color={colors.blue} opacity={focused ? 1 : 0.6} />;
					},
					tabBarShowLabel: false,
					headerShadowVisible: false,
				}}
			/>
			<Tab.Screen
				name="Conta"
				component={User}
				options={{
					headerTitleAlign: 'center',
					headerTitle: () => {
						return <Header text="Minha Conta" />;
					},
					tabBarIcon: ({ focused }) => {
						return <IconUser color={colors.blue} opacity={focused ? 1 : 0.6} />;
					},
					tabBarShowLabel: false,
					headerShadowVisible: false,
				}}
			/>
		</Tab.Navigator>
	);
}
