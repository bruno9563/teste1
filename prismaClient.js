import { PrismaClient } from '@prisma/client'

// Na versão 6, ele lê o .env automaticamente sem precisar de mais nada
export const prisma = new PrismaClient()