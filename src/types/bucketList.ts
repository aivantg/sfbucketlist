export type BucketListItem = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    order: number;
}

export type BucketList = {
    id: string;
    title: string;
    key: string;
    items: BucketListItem[];
} 