// src/app/api/carBrands/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    // Extrae el token desde los headers de la solicitud
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization token provided' }, { status: 401 });
    }

    const token = authHeader;

    if (!token) {
      return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
    }

    // Realiza la solicitud a la API externa para obtener las marcas de autos
    const response = await axios.get(`${process.env.NEXT_API_URL}/api/v1/cars/show/all/brands/`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Enviar el token en la cabecera
        'Content-Type': 'application/json',
      },
    });

    // Si la respuesta es exitosa, formateamos los datos
    const data = response.data;
    const brands = data.map((brand: any) => ({
      key: brand.id_brand,
      label: brand.name,
    }));

    return NextResponse.json(brands);
  } catch (error) {
    console.error('Error fetching car brands:', error);
    return NextResponse.json({ error: 'Failed to fetch car brands' }, { status: 500 });
  }
}
