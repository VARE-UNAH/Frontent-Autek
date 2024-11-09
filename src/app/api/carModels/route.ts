// src/app/api/carModels/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brandKey = searchParams.get('brand');

  if (!brandKey) {
    return NextResponse.json({ error: 'Brand key is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${brandKey}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch car models from external API');
    }

    const data = await response.json();

    const models = data.Models.map((model: any) => ({
      key: model.model_name,
      label: model.model_name,
    }));

    return NextResponse.json({ models });
  } catch (error) {
    console.error('Error fetching car models:', error);
    return NextResponse.json({ error: 'Failed to fetch car models' }, { status: 500 });
  }
}
