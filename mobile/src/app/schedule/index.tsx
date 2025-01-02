import { View, Text, Alert } from 'react-native';
import { calendar, styles } from './styles';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ptBR } from '@/constants/calendarLocale';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { schedules } from '@/helpers/fakeData';
import { Button } from '@/components/button';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { api } from '@/lib/api';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface Props {
	navigation: StackNavigationProp<any, any>;
	route: RouteProp<any, any>;
}

export function Schedule({ navigation, route }: Props) {
	// Projeto Calendario: https://github.com/wix/react-native-calendars
	// Projeto Picker: https://github.com/react-native-picker/picker

	const serviceId = route.params?.serviceId;
	const doctorId = route.params?.doctorId;

	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().slice(0, 10)
	);
	const [selectedHour, setSelectedHour] = useState('09:00');

	async function handleSchedule() {
		try {
			const response = await api.post('/appointments', {
				doctor_id: doctorId,
				service_id: serviceId,
				booking_date: `${selectedDate} ${selectedHour}:00`,
				booking_hour: selectedHour,
			});

			if (response.status === 201) navigation.popToTop();
		} catch (error) {
			Alert.alert(
				'Ocorreu um erro',
				'Ocorreu um erro ao marcar a reserva. Por favor, tente novamente mais tarde.'
			);
		}
	}

	return (
		<View style={styles.container}>
			<View>
				<Calendar
					style={styles.calendar}
					theme={calendar.theme}
					onDayPress={(day: any) => {
						if (day.dateString === selectedDate) {
							setSelectedDate('');
							return;
						}
						setSelectedDate(day.dateString);
					}}
					markedDates={{
						[selectedDate]: { selected: true },
					}}
					minDate={new Date().toDateString()}
				/>
				<View>
					<Text style={styles.textHour}>Horário</Text>
				</View>

				<View style={styles.picker}>
					<Picker
						selectedValue={selectedHour}
						onValueChange={(itemValue, itemIndex) => setSelectedHour(itemValue)}
					>
						{schedules.map((schedule) => {
							return (
								<Picker.Item key={Math.random()} label={schedule} value={schedule} />
							);
						})}
					</Picker>
				</View>
			</View>

			<Button
				onPress={() => {
					Alert.alert(
						'Confirmar reserva',
						`Você deseja agendar esse serviço para ${new Date(
							selectedDate + 'T00:00:00'
						).toLocaleDateString('pt-BR')}, às ${selectedHour}?`,
						[
							{
								text: 'Sim',
								onPress: () => handleSchedule(),
							},
							{
								text: 'Não',
								style: "cancel"
							},
						]
					);
				}}
			>
				<Button.Text>Confirmar Reserva</Button.Text>
			</Button>
		</View>
	);
}
