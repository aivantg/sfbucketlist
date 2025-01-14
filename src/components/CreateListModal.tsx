import { Button, Text } from "@chakra-ui/react";

import { Input, ModalFooter, Textarea } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

import { ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { Modal } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export function CreateListModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [title, setTitle] = useState("")
    const [customKey, setCustomKey] = useState("")
    const [items, setItems] = useState("")
    const router = useRouter()

    const generateKeyFromTitle = (title: string) => {
        return title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
    }

    const handleSubmit = async () => {
        const itemList = items.split('\n').filter(item => item.trim()).map(item => ({
            title: item.trim(),
            description: ''
        }))

        const key = customKey.trim() || generateKeyFromTitle(title)

        const response = await fetch('/api/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, key, items: itemList })
        })

        const data = await response.json()
        router.push(`/${data.key}`)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Bucket List</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Box width="100%">
                            <Text mb={2}>List Title</Text>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="My SF Adventure"
                            />
                        </Box>
                        <Box width="100%">
                            <Text mb={2}>Custom URL Key (optional)</Text>
                            <Input
                                value={customKey}
                                onChange={(e) => setCustomKey(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                placeholder={title ? generateKeyFromTitle(title) : "my-sf-adventure"}
                            />
                            <Text fontSize="sm" color="gray.600" mt={1}>
                                This will be used in the URL: sfbucketlist.com/{customKey || (title ? generateKeyFromTitle(title) : "my-sf-adventure")}
                            </Text>
                        </Box>
                        <Box width="100%">
                            <Text mb={2}>Items (one per line)</Text>
                            <Textarea
                                value={items}
                                onChange={(e) => setItems(e.target.value)}
                                placeholder="Visit Golden Gate Bridge&#10;Ride a Cable Car&#10;Visit Alcatraz"
                                minHeight="200px"
                            />
                        </Box>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Create List
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

