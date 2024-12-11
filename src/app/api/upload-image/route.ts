import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { imageUrl, appointmentId, serviceId } = await request.json()

    const uploadedImage = await prisma.uploadedImage.create({
      data: {
        url: imageUrl,
        appointmentId,
        serviceId,
      },
    })

    return NextResponse.json(uploadedImage)
  } catch (error) {
    console.error('Error saving image data:', error)
    return NextResponse.json({ error: 'Failed to save image data' }, { status: 500 })
  }
}

