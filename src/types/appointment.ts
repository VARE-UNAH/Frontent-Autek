export type Appointment = {
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
    };
    description: string;
    date: string; // ISO 8601 string format
    appointment_status: {
        id: number;
        name: string;
    }
};
