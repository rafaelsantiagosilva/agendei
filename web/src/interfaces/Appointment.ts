export interface Appointment {
  id: number;
  booking_date: string;
  booking_hour: string;
  doctor_id: number;
  service_id: number;
  user_id: number;
  service: {
    description: string;
  };
  doctor: {
    name: string;
  };
  user: {
    name: string;
  };
  doctorService: {
    price: string;
  }
}