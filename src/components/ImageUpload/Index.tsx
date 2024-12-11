import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { Image } from '@nextui-org/react';
import { Check, FolderCheck, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
    onImageUpload: (imageUrl: string) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleUpload = (result: any) => {
        if (result.event !== "success") return;
        const uploadedImageUrl = result.info.secure_url;
        setImageUrl(uploadedImageUrl);
        onImageUpload(uploadedImageUrl);
    };

    return (
        <div className="flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
            <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) => handleUpload(result)}
            >
                {({ open }) => (
                    <Button 
                        onClick={() => open()} 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <Upload className="w-5 h-5 mr-2" />
                        Subir Imagen
                    </Button>
                )}
            </CldUploadWidget>
            {imageUrl && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 flex flex-col items-center space-y-4"
                >
                    <div className="relative">
                        <Image
                            alt="Imagen subida"
                            className="object-cover rounded-lg shadow-md"
                            height={200}
                            src={imageUrl}
                            width={200}
                        />
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                            className="absolute -top-3 -right-3 z-9999 bg-green-500 rounded-full p-2"
                        >
                            <Check className="text-white w-6 h-6 -z-0" />
                        </motion.div>
                    </div>
                    <p className="text-green-600 font-semibold text-lg">
                        ¡Imagen subida correctamente!
                    </p>
                </motion.div>
            )}
        </div>
    );
}

