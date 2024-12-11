'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ImageUploaderProps {
  appointmentId: string
  serviceId: string
}

export default function ImageUploader({ appointmentId, serviceId }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (result: any) => {
    if (result.event !== "success") return;
    
    setIsUploading(true)
    setError(null)
    
    const imageUrl = result.info.secure_url
    setImageUrl(imageUrl)

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
          appointmentId,
          serviceId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save image data')
      }

      const data = await response.json()
      console.log('Image data saved:', data)
    } catch (error) {
      console.error('Error saving image data:', error)
      setError('Hubo un error al guardar la imagen. Por favor, intenta de nuevo.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <CldUploadWidget 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result: any) => handleUpload(result)}
      >
        {({ open }) => (
          <Button onClick={() => open()} disabled={isUploading}>
            {isUploading ? 'Subiendo...' : 'Subir Imagen'}
          </Button>
        )}
      </CldUploadWidget>
      {error && (
        <p className="text-red-500" role="alert">{error}</p>
      )}
      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Imagen subida" className="max-w-xs" />
        </div>
      )}
    </div>
  )
}

