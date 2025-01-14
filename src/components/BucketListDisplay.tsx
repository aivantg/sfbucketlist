import { VStack, Collapse } from "@chakra-ui/react"
import { BucketList } from "../types/bucketList"
import { TodoItem } from "./TodoItem"

interface BucketListDisplayProps {
    bucketList: BucketList | null
    finishedAnimating: boolean
    fetching: boolean
    onToggle: (id: string, completed: boolean) => void
}

export const BucketListDisplay = ({
    bucketList,
    finishedAnimating,
    fetching,
    onToggle
}: BucketListDisplayProps) => {
    return (
        <Collapse in={finishedAnimating && !fetching}>
            <VStack alignItems="left" spacing={4}>
                {bucketList?.items.map((item, index) => (
                    <TodoItem key={index} item={item} onToggle={onToggle} />
                ))}
            </VStack>
        </Collapse>
    )
} 