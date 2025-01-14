import { Checkbox, Text } from "@chakra-ui/react"
import { BucketListItem } from "../types/bucketList"

interface TodoItemProps {
    item: BucketListItem
    onToggle: (id: string, completed: boolean) => void
}

export const TodoItem = ({ item, onToggle }: TodoItemProps) => {
    return (
        <Checkbox isChecked={item.completed} onChange={(e) => onToggle(item.id, e.target.checked)}>
            <Text size="m">{item.title}</Text>
        </Checkbox>
    )
} 