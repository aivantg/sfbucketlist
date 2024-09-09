import { Client } from "@notionhq/client"
import { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
export type TodoBlock = {
    type: 'todo'
    text: string
}

export type HeadingBlock = {
    type: 'heading'
    text: string
}

export type CleanBlock = TodoBlock | HeadingBlock

const fetchAllBlocks = async (notion: Client, pageId: string): Promise<Array<BlockObjectResponse | PartialBlockObjectResponse>> => {
    let blocks: Array<BlockObjectResponse | PartialBlockObjectResponse> = []
    let cursor: string | null = null;
    do {
        const response = await notion.blocks.children.list({
            block_id: pageId,
            start_cursor: cursor ?? undefined
        })
        blocks = blocks.concat(response.results)
        cursor = response.next_cursor
    } while (cursor !== null)
    return blocks
}

export async function GET() {
    const notion = new Client({ auth: process.env.NOTION_SECRET })
    const pageId = "a33df00ed4f443e3a11abe3052a5dd9f"
    const blocks = await fetchAllBlocks(notion, pageId)
    const cleanedBlocks = blocks.map((block): CleanBlock | null => {
        if (!('type' in block)) {
            return null
        }
        if (block.type == 'to_do') {
            if (block.to_do.rich_text.length === 0) {
                return null
            }
            if (block.to_do.rich_text.length > 1) {
                console.log(block)
                throw new Error("To do block has more than one text element")
            }

            return { type: 'todo', text: block.to_do.rich_text[0].plain_text }
        }
        if (block.type == 'paragraph') {
            if (block.paragraph.rich_text.length === 0) {
                return null
            }
            if (block.paragraph.rich_text.length > 1) {
                console.log(block)
                throw new Error("Paragraph block has more than one text element")

            }
            return { type: 'heading', text: block.paragraph.rich_text[0].plain_text }
        }
        return null
    }).filter((block) => block !== null)

    return Response.json(cleanedBlocks)
}