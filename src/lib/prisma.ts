
import { PrismaClient } from '.prisma/client'

// Force the IDE to recognize the delegates if the generator proxy is lagging
export type ExtendedPrismaClient = PrismaClient & {
    materials: any;
    drivers: any;
    armada: any;
    equipments: any;
    partners: any;
    transactions: any;
}

const prismaClientSingleton = () => {
    return new PrismaClient()
}

const globalForPrisma = globalThis as unknown as {
    prisma: ExtendedPrismaClient | undefined
}

export const prisma = (globalForPrisma.prisma ?? prismaClientSingleton()) as ExtendedPrismaClient

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
