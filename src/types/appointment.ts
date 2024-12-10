export interface Appointment {
    id_appointment: number;
    user: {
      id: string;
      first_name: string;
      email: string;
    };
    car: {
      id: number;
      brand: string;
      model: string;
      license_plate: string;
      year: string;
    };
    workshops: {
      id: number;
      name: string;
      address: string;
      city: string;
    };
    description: string;
    date: string; 
    appointment_status?: {
      id: number;
      name: string;
    } | null; // Optional or nullable
  }
  