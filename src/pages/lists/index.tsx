"use client"

import { Box, Flex, Heading, VStack, Text, LinkBox, LinkOverlay } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Head from "next/head"
import NextLink from 'next/link'
import { BucketList } from "../../types/bucketList"
import { VaraTitle } from "../../components/VaraTitle"

export default function ListsPage() {
    const [lists, setLists] = useState<BucketList[]>([])
    const [fetching, setFetching] = useState(true)
    const [finishedAnimating, setFinishedAnimating] = useState(false)

    useEffect(() => {
        fetch('/api/lists')
            .then(async (response) => {
                const data = await response.json()
                setLists(data)
                setFetching(false)
            })
            .catch(error => {
                console.error('Error fetching lists:', error)
                setFetching(false)
            })
    }, [])

    return (
        <>
            <Head>
                <title>All Lists - SF Bucket List</title>
                <meta name="description" content="Browse all SF Bucket Lists" />
            </Head>
            <Flex width="100dvw" height="100dvh" backgroundRepeat="repeat" backgroundImage="https://img.freepik.com/free-photo/paperboard-texture_95678-72.jpg" p={8}>
                <VStack alignItems="center" width="100%" spacing={8}>
                    <VaraTitle
                        text="All Bucket Lists"
                        onAnimationEnd={() => setFinishedAnimating(true)}
                    />
                    <Box width="100%" maxW="800px" overflowY="auto">
                        <VStack spacing={4} align="stretch">
                            {lists.map((list) => (
                                <LinkBox
                                    key={list.id}
                                    p={4}
                                    borderRadius="md"
                                    bg="white"
                                    boxShadow="md"
                                    _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
                                >
                                    <NextLink href={`/${list.key}`} passHref>
                                        <LinkOverlay>
                                            <Heading size="md">{list.title}</Heading>
                                            <Text color="gray.600" mt={2}>
                                                {list.items.length} items • {list.items.filter(item => item.completed).length} completed
                                            </Text>
                                        </LinkOverlay>
                                    </NextLink>
                                </LinkBox>
                            ))}
                        </VStack>
                    </Box>
                </VStack>
            </Flex>
        </>
    )
} 