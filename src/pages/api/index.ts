import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const defaultList = await prisma.bucketList.findFirst({
            where: { key: 'default' },
            include: {
                items: {
                    orderBy: { order: 'asc' }
                }
            }
        })

        if (!defaultList) {
            // Create default list if it doesn't exist
            const newList = await prisma.bucketList.create({
                data: {
                    title: 'SF Bucket List',
                    key: 'default',
                    items: {
                        create: [
                            { title: 'Visit Golden Gate Bridge', description: '', order: 0 },
                            { title: 'Ride a Cable Car', description: '', order: 1 },
                            { title: 'Visit Alcatraz', description: '', order: 2 },
                            { title: 'Walk through Chinatown', description: '', order: 3 }
                        ]
                    }
                },
                include: {
                    items: true
                }
            })
            return res.json(newList)
        }

        return res.json(defaultList)
    }

    res.status(405).json({ message: 'Method not allowed' })
} 