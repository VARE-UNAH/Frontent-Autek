'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@nextui-org/react"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-purple-900 to-indigo-600 flex flex-col items-center justify-center text-white p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-7xl sm:text-8xl font-bold mb-2 sm:mb-4">404</h1>
        <h2 className="text-xl sm:text-3xl mb-4 sm:mb-8">Oops! Parece que te has perdido</h2>
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="mb-4 sm:mb-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sm:w-24 sm:h-24"
        >
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M14 13.34A3 3 0 1 1 9.34 9.34" />
        </svg>
      </motion.div>
      
      <Link href="/" passHref>
        <Button 
          color="secondary" 
          variant="shadow"
          className="font-semibold"
        >
          Return to Homepage
        </Button>
      </Link>
      
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  )
}

