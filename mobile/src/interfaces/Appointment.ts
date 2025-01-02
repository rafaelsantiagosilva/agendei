export default interface AppointmentInterface {
  id: number;
  booking_date: string;
  booking_hour: string;
  service: {
    description: string;
  };
  doctor: {
    name: string;
    specialty: string;
  };
  doctorService: {
    price: string;
  };
}