export interface Payment {
    id: string;
    date: string;
    amount: number;
    concept: string;
    status: 'Completado' | 'Pendiente' | 'Cancelado';
  }
  
  export const payments: Payment[] = [
    {
      id: '1',
      date: '2023-12-01',
      amount: 150.00,
      concept: 'Cambio de aceite',
      status: 'Completado',
    },
    {
      id: '2',
      date: '2023-12-05',
      amount: 500.00,
      concept: 'Reparación de frenos',
      status: 'Completado',
    },
    {
      id: '3',
      date: '2023-12-10',
      amount: 300.00,
      concept: 'Alineación y balanceo',
      status: 'Pendiente',
    },
    {
      id: '4',
      date: '2023-12-15',
      amount: 1000.00,
      concept: 'Cambio de transmisión',
      status: 'Cancelado',
    },
    {
      id: '5',
      date: '2023-12-20',
      amount: 200.00,
      concept: 'Revisión general',
      status: 'Completado',
    },
  ];
  
  