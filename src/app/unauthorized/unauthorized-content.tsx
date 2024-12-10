'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LockIcon, SmileIcon } from 'lucide-react'
import { Button } from '@nextui-org/react'

export default function UnauthorizedContent() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5, times: [0, 0.2, 0.5, 0.8, 1] }}
        className="mb-6"
      >
        <LockIcon className="w-24 h-24 mx-auto text-primary" />
      </motion.div>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">¡Ups! Acceso no autorizado</h1>
      <p className="text-gray-600 mb-6">
        Parece que no tienes permiso para ver esta página. Pero no te preocupes, ¡siempre hay un lado positivo!
      </p>
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg font-semibold text-primary mb-6">
            ¡Al menos descubriste nuestra divertida página de error! <SmileIcon className="inline-block ml-2" />
          </p>
          <Button
            onClick={() => {
              if (window.history.length > 2) {
                window.history.go(-2); // Va dos pasos atrás
              } else {
                window.location.href = "/auth/signin"; // Redirige a auth/signin si no hay historial previo suficiente
              }
            }}
            className="bg-primary hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
          >
            Volver atrás
          </Button>
        </motion.div>
      )}
    </div>
  )
}

