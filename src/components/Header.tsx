import { Flex, IconButton, Link } from "@chakra-ui/react"
import { AddIcon, ViewIcon } from "@chakra-ui/icons"
import NextLink from 'next/link'

interface HeaderProps {
    showCreateButton?: boolean
    onCreateClick?: () => void
}

export const Header = ({ showCreateButton, onCreateClick }: HeaderProps) => {
    return (
        <Flex width="100%" justifyContent="flex-end" position="absolute" top={4} right={4} gap={2}>
            <NextLink href="/lists" passHref>
                <IconButton
                    as={Link}
                    aria-label="View all lists"
                    icon={<ViewIcon />}
                    colorScheme="blue"
                    variant="solid"
                    size="lg"
                    isRound
                />
            </NextLink>
            {showCreateButton && (
                <IconButton
                    aria-label="Create new list"
                    icon={<AddIcon />}
                    onClick={onCreateClick}
                    colorScheme="blue"
                    variant="solid"
                    size="lg"
                    isRound
                />
            )}
        </Flex>
    )
} 