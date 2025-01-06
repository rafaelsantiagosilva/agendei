import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Appointments from './pages/appointments';
import Doctors from './pages/doctors';
import AddAppointment from './pages/addAppointment';
import AddDoctor from './pages/addDoctor';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/appointments" element={<Appointments />} />
				<Route path="/appointments/add" element={<AddAppointment />} />
				<Route path="/appointments/edit/:id" element={<AddAppointment />} />
				<Route path="/doctors" element={<Doctors />} />
				<Route path="/doctors/add" element={<AddDoctor />} />
				<Route path="/doctors/edit/:id" element={<AddDoctor />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
