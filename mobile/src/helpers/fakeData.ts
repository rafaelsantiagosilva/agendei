import DoctorInterface from "@/interfaces/Doctor";
import AppointmentInterface from "@/interfaces/Appointment";
import DoctorServiceInterface from "@/interfaces/DoctorService";
import UserInterface from "@/interfaces/User";

export const doctors: DoctorInterface[] = [
  {
    id: 1,
    name: "Dr. Armando Matheus",
    specialty: "Ginecologia e obstetrícia",
    icon: "M"
  },
  {
    id: 2,
    name: "Dra. Ana Beatriz Rutini",
    specialty: "Cardiologista",
    icon: "F"
  },
  {
    id: 3,
    name: "Dr. Antônio Almeida Souza ",
    specialty: "Pediatria",
    icon: "M"
  },
  {
    id: 4,
    name: "Dra. Roberta Martins",
    specialty: "Clínica Geral",
    icon: "F"
  },
  {
    id: 5,
    name: "Dra. Nise da Silveira",
    specialty: "Cirurgia Plástica",
    icon: "F"
  },
  {
    id: 6,
    name: "Dr. Jonatan Silvestre",
    specialty: "Pediatria",
    icon: "M"
  },
  {
    id: 7,
    name: "Dr. José Eduardo Souza",
    specialty: "Clínica Geral",
    icon: "M"
  },
  {
    id: 8,
    name: "Dra. Adriana Melo",
    specialty: "Clínica Geral",
    icon: "F"
  },
  {
    id: 9,
    name: "Dra. Valeria Petri",
    specialty: "Cirurgia Plástica",
    icon: "F"
  }
];

// export const appointments: AppointmentInterface[] = [
//   {
//     id: 1,
//     service: "Consulta",
//     doctor: "Dra. Nise da Silveira",
//     specialty: "Cirurgia Plástica",
//     booking_date: "2024-10-25",
//     booking_hour: "08:30",
//   },
//   {
//     id: 2,
//     service: "Consulta",
//     doctor: "Dr. Antônio Almeida Souza",
//     specialty: "Pediatria",
//     booking_date: "2024-10-28",
//     booking_hour: "15:40",
//   },
//   {
//     id: 3,
//     service: "Consulta",
//     doctor: "Dra. Roberta Martins",
//     specialty: "Clínica Geral",
//     booking_date: "2024-11-05",
//     booking_hour: "14:15",
//   },
//   {
//     id: 4,
//     service: "Consulta",
//     doctor: "Dra. Nise da Silveira",
//     specialty: "Cirurgia Plástica",
//     booking_date: "2024-11-18",
//     booking_hour: "11:00",
//   },
//   {
//     id: 5,
//     service: "Consulta",
//     doctor: "Dr. Antônio Almeida Souza",
//     specialty: "Pediatria",
//     booking_date: "2024-12-02",
//     booking_hour: "10:40",
//   },
//   {
//     id: 6,
//     service: "Consulta",
//     doctor: "Dra. Roberta Martins",
//     specialty: "Clínica Geral",
//     booking_date: "2024-12-14",
//     booking_hour: "17:30",
//   }
// ];

export const doctorServices: DoctorServiceInterface[] = [
  {
    id: 1,
    description: "Consulta Médica",
    price: 499.99
  },
  {
    id: 2,
    description: "Drenagem Linfática",
    price: 650
  },
  {
    id: 3,
    description: "Lipoaspiração",
    price: 5000
  },
  {
    id: 4,
    description: "Mamoplastia",
    price: 1700
  }
];

export const schedules = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"];

export const initialUser: UserInterface = {
  id: 0,
  name: "",
  email: "",
  token: ""
};