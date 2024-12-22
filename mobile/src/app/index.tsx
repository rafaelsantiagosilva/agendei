import {
	NavigationContainer,
	NavigationIndependentTree,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from './account';
import Login from './login';
import { Home } from './tabs/home';
import { Calendar } from './tabs/calendar';
import { User } from './tabs/user';
import { Header } from '@/components/header';
import { IconHome, IconCalendar, IconUser } from '@/icons';
import { colors } from '@/constants/colors';

const Tab = createBottomTabNavigator();

export default function Index() {
	return (
		<NavigationIndependentTree>
			<NavigationContainer>
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
								return (
									<IconHome color={colors.blue} opacity={focused ? 1 : 0.6} />
								);
							},
							tabBarShowLabel: false,
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
							tabBarIcon: ({focused}) => {
								return <IconCalendar color={colors.blue} opacity={focused ? 1 : 0.6} />;
							},
							tabBarShowLabel: false,
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
							tabBarIcon: ({focused}) => {
								return <IconUser color={colors.blue} opacity={focused ? 1 : 0.6} />;
							},
							tabBarShowLabel: false,
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</NavigationIndependentTree>
	);
}
