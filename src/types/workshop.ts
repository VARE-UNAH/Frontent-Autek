// types.ts

export type WorkShop = {
    id_workshop: number;
    name: string;
    phone_number: string;
    email: string;
    address: {
      id_address: number;
      city: {
        id_city: number;
        name: string;
        state: {
          id_state: number;
          name: string;
          country: {
            id_country: number;
            name: string;
          };
        } | null;
      };
      address: string;
    };
  };
  