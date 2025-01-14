import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const lists = await prisma.bucketList.findMany({
            include: {
                items: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        res.json(lists)
    } catch (error) {
        console.error('Error fetching bucket lists:', error)
        res.status(500).json({ message: 'Error fetching bucket lists' })
    }
} 