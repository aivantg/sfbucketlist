import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { key } = req.query

    if (typeof key !== 'string') {
        return res.status(400).json({ message: 'Invalid key' })
    }

    if (req.method === 'POST') {
        const { title, description } = req.body

        const bucketList = await prisma.bucketList.findUnique({
            where: { key },
            include: { items: true }
        })

        if (!bucketList) {
            return res.status(404).json({ message: 'List not found' })
        }

        const item = await prisma.bucketListItem.create({
            data: {
                title,
                description: description || '',
                order: bucketList.items.length,
                bucketListId: bucketList.id
            }
        })

        return res.json(item)
    }

    res.status(405).json({ message: 'Method not allowed' })
} 