'use client'

import { Box, Checkbox, Collapse, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Vara from "vara";
import { CleanBlock, HeadingBlock, TodoBlock } from "./api/route";

// Function with prop of CleanBlock where block.type is narrowed to be todo
const TodoItem = ({ block }: { block: TodoBlock }) => {

  return <Checkbox><Text size="m">{block.text}</Text></Checkbox>
}

const HeadingItem = ({ block }: {
  block: HeadingBlock
}) => {
  return <Heading my={2} size="md">{block.text}</Heading>
}

export default function Home() {
  const titleRef = useRef<HTMLDivElement | null>(null)
  const [todos, setTodos] = useState<Array<CleanBlock>>([])
  const [fetching, setFetching] = useState(true)
  const [finishedAnimating, setFinishedAnimating] = useState(false)

  useEffect(() => {
    if (titleRef.current && titleRef.current.children.length > 0) {
      titleRef.current.innerHTML = ''
    }
    const vara = new Vara("#titleContainer", "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Shadows-Into-Light/shadows-into-light.json",
      [{ text: "SF Bucket List" }], { fontSize: 30, strokeWidth: 2, textAlign: "center" })
    vara.animationEnd(() => {
      setFinishedAnimating(true)
    })
  }, [])

  useEffect(() => {
    fetch('/api').then(async (response) => {
      const blocks = await response.json()
      setTodos(blocks)
      setFetching(false)
    })
  }, [setTodos, setFetching])

  return (
    <Flex width="100dvw" height="100dvh" backgroundRepeat={"repeat"} backgroundImage="https://img.freepik.com/free-photo/paperboard-texture_95678-72.jpg" p={8}>
      <VStack alignItems={"center"} width="100%">
        <Box id="titleContainer" width="100%" height={{ base: '20%', xs: '10%' }} ref={titleRef}></Box>
        <Box width="100%" overflowY="scroll" height={{ base: '80%', xs: '90%' }}>
          <Collapse in={finishedAnimating && !fetching}>

            <VStack alignItems={"left"} >
              {fetching ? <Box>Loading..</Box> : todos.map((todo, index) => {
                return todo.type === 'todo' ? <TodoItem key={index} block={todo} /> : <HeadingItem key={index} block={todo} />
              })}
            </VStack>
          </Collapse>

        </Box>
      </VStack>
    </Flex>
  );
}
