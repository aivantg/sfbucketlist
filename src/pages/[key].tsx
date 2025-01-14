"use client"

import { Box, Flex, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { BucketList } from "../types/bucketList"
import { BucketListDisplay } from "../components/BucketListDisplay"
import { VaraTitle } from "../components/VaraTitle"

export default function BucketListPage() {
    const router = useRouter()
    const { key } = router.query
    const [bucketList, setBucketList] = useState<BucketList | null>(null)
    const [fetching, setFetching] = useState(true)
    const [finishedAnimating, setFinishedAnimating] = useState(false)

    useEffect(() => {
        if (key) {
            fetch(`/api/${key}`).then(async (response) => {
                if (!response.ok) {
                    router.push('/')
                    return
                }
                const data = await response.json()
                setBucketList(data)
                setFetching(false)
            })
        }
    }, [key, router])

    const handleToggle = async (id: string, completed: boolean) => {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed })
            })

            if (response.ok && bucketList) {
                setBucketList({
                    ...bucketList,
                    items: bucketList.items.map(item =>
                        item.id === id ? { ...item, completed } : item
                    )
                })
            }
        } catch (error) {
            console.error('Error updating item:', error)
        }
    }

    return (
        <>
            <Head>
                <title>{bucketList?.title || 'Loading...'} - SF Bucket List</title>
                <meta name="description" content={`${bucketList?.title || 'Loading...'} - SF Bucket List`} />
            </Head>
            <Flex width="100dvw" height="100dvh" backgroundRepeat="repeat" backgroundImage="https://img.freepik.com/free-photo/paperboard-texture_95678-72.jpg" p={8}>
                {bucketList && (
                    <VStack alignItems="center" width="100%">
                        <VaraTitle
                            text={bucketList.title}
                            onAnimationEnd={() => setFinishedAnimating(true)}
                        />
                        <Box width="100%" overflowY="scroll" height={{ base: '80%', xs: '90%' }}>
                            <BucketListDisplay
                                bucketList={bucketList}
                                finishedAnimating={finishedAnimating}
                                fetching={fetching}
                                onToggle={handleToggle}
                            />
                        </Box>
                    </VStack>
                )}
            </Flex>
        </>
    )
} 