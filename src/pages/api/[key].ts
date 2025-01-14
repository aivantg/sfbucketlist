import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { key } = req.query

    if (typeof key !== 'string') {
        return res.status(400).json({ message: 'Invalid key' })
    }

    if (req.method === 'GET') {
        const list = await prisma.bucketList.findUnique({
            where: { key },
            include: {
                items: {
                    orderBy: { order: 'asc' }
                }
            }
        })

        if (!list) {
            return res.status(404).json({ message: 'List not found' })
        }

        return res.json(list)
    }

    res.status(405).json({ message: 'Method not allowed' })
} 