import { View, Text } from 'react-native';
import { calendar, styles } from './styles';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ptBR } from '@/constants/calendarLocale';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { schedules } from '@/helpers/fakeData';
import { Button } from '@/components/button';
import { colors } from '@/constants/colors';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export function Schedule() {
	// Projeto Calendario: https://github.com/wix/react-native-calendars
	// Projeto Picker: https://github.com/react-native-picker/picker

	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().slice(0, 10)
	);
	const [selectedHour, setSelectedHour] = useState('');

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

			<Button>
				<Button.Text>Confirmar Reserva</Button.Text>
			</Button>
		</View>
	);
}
