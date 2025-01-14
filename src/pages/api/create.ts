import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { title, items, key } = req.body

    if (!title || !Array.isArray(items) || !key) {
        return res.status(400).json({ message: 'Invalid request body' })
    }

    try {
        // Generate a URL-friendly key from the title if not provided
        const generatedKey = key || title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

        const newList = await prisma.bucketList.create({
            data: {
                title,
                key: generatedKey,
                items: {
                    create: items.map((item, index) => ({
                        title: item.title,
                        description: item.description || '',
                        order: index
                    }))
                }
            },
            include: {
                items: true
            }
        })

        res.json(newList)
    } catch (error) {
        console.error('Error creating bucket list:', error)
        res.status(500).json({ message: 'Error creating bucket list' })
    }
} 