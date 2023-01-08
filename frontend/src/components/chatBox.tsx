import { Flex, Text, Stack } from '@chakra-ui/react'
import React from 'react'
import { ChatInfo } from '../lib/types/ChatInfo';

const ChatBox: React.FC<ChatInfo> = (data: ChatInfo) => {
  console.log(data.sender);

  return (
    
    <Stack m={1} align={data.sender == 'self' ? 'end' : 'start'} marginStart={1} marginEnd={2}>
        <Text marginStart={1} marginEnd={2} fontSize={'xs'} mb={'-1.5'}>{data.author}</Text>
        <Flex 
          w={"fit-content"} 
          fontSize={'sm'} 
          bg={data.sender=='self' ? 'gray.200' : 'blue.100'} 
          borderRadius={"lg"} 
          p={2} 
          mb={'-1.5'}
          minWidth={"75px"} 
          maxWidth={'45%'}
          overflowWrap={'break-word'}
          wordBreak={'break-word'}
        >
          <Text overflowWrap={'break-word'} wordBreak={'break-word'}>{data.message}</Text>
        </Flex>
        <Text fontSize={'xs'} mt={'-1.5'} marginEnd={4} marginStart={1}>Sent at {data.time}</Text>
    </Stack>
  )
};

export default ChatBox;