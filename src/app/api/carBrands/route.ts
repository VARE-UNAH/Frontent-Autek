// src/app/api/carBrands/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Llama a la API externa desde el servidor
    const response = await fetch('https://www.carqueryapi.com/api/0.3/?cmd=getMakes', {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Evita almacenar en caché para obtener datos actualizados
    });

    if (!response.ok) {
      throw new Error('Failed to fetch car brands from external API');
    }

    const data = await response.json();

    // Formatea los datos antes de enviarlos al cliente
    const brands = data.Makes.map((brand: any) => ({
      key: brand.make_id,
      label: brand.make_display,
    }));

    return NextResponse.json(brands);
  } catch (error) {
    console.error('Error fetching car brands:', error);
    return NextResponse.json({ error: 'Failed to fetch car brands' }, { status: 500 });
  }
}
