import { PrismaClient } from '@prisma/client'

// Definimos un tipo para el objeto global con una propiedad prisma opcional
declare global {
  var prisma: PrismaClient | undefined
}

// Creamos y exportamos una instancia de PrismaClient
export const prisma = global.prisma || new PrismaClient()

// En desarrollo, guardamos la instancia en el objeto global para evitar
// múltiples instancias de Prisma Client en hot-reloading
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}