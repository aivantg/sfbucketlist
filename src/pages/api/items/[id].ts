import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query

    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid id' })
    }

    if (req.method === 'PATCH') {
        const { completed } = req.body

        if (typeof completed !== 'boolean') {
            return res.status(400).json({ message: 'Invalid request body' })
        }

        try {
            const updatedItem = await prisma.bucketListItem.update({
                where: { id },
                data: { completed }
            })

            res.json(updatedItem)
        } catch (error) {
            console.error('Error updating item:', error)
            res.status(500).json({ message: 'Error updating item' })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
} 