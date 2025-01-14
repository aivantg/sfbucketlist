import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

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

    if (req.method === 'POST') {
        const { title } = req.body
        const list = await prisma.bucketList.create({
            data: {
                title,
                key,
            }
        })
        return res.json(list)
    }

    if (req.method === 'PUT') {
        const { itemId, completed } = req.body
        const item = await prisma.bucketListItem.update({
            where: { id: itemId },
            data: { completed }
        })
        return res.json(item)
    }

    res.status(405).json({ message: 'Method not allowed' })
} 