"use client"

import { Box, Flex, IconButton, useDisclosure, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Head from "next/head"
import { AddIcon } from "@chakra-ui/icons"
import { BucketList } from "../types/bucketList"
import { BucketListDisplay } from "../components/BucketListDisplay"
import { VaraTitle } from "../components/VaraTitle"
import { CreateListModal } from "../components/CreateListModal"

export default function Home() {
    const [bucketList, setBucketList] = useState<BucketList | null>(null)
    const [fetching, setFetching] = useState(true)
    const [finishedAnimating, setFinishedAnimating] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        fetch('/api').then(async (response) => {
            const data = await response.json()
            setBucketList(data)
            setFetching(false)
        })
    }, [])

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
                <title>SF Bucket List</title>
                <meta name="description" content="Helping you explore the best of San Francisco" />
            </Head>
            <Flex width="100dvw" height="100dvh" backgroundRepeat="repeat" backgroundImage="https://img.freepik.com/free-photo/paperboard-texture_95678-72.jpg" p={8}>
                <VStack alignItems="center" width="100%">
                    <Flex width="100%" justifyContent="flex-end" position="absolute" top={4} right={4}>
                        <IconButton
                            aria-label="Create new list"
                            icon={<AddIcon />}
                            onClick={onOpen}
                            colorScheme="blue"
                            variant="solid"
                            size="lg"
                            isRound
                        />
                    </Flex>
                    <VaraTitle text="SF Bucket List" onAnimationEnd={() => setFinishedAnimating(true)} />
                    <Box width="100%" overflowY="scroll" height={{ base: '80%', xs: '90%' }}>
                        <BucketListDisplay
                            bucketList={bucketList}
                            finishedAnimating={finishedAnimating}
                            fetching={fetching}
                            onToggle={handleToggle}
                        />
                    </Box>
                </VStack>
            </Flex>
            <CreateListModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}
