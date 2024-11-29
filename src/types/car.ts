export type Car = {
    id_car: number;
    brand: {
        id_brand: number;
        name: string;
    };
    model: {
        id_model: number;
        name: string;
    };
    color: {
        id_color: number;
        name: string;
    };
    license_plate: string;
    year: string;
    user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        date_of_birth: string;
    };
}