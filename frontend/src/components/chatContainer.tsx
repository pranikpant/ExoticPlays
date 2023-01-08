import { Avatar, Button, Container, Flex, Heading, Input, Stack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client';
import { MessageData } from '../lib/types/MessageData';
import ChatBox from './chatBox'


interface ChatContainerProps {
  socket: Socket,
  room: string,
  userName: string
};

export default function ChatContainer({socket, room, userName}: ChatContainerProps) {

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<MessageData[]>([]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData: MessageData = {
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        room: room,
        author: userName
      };
      console.log(messageData);
      await socket.emit("send_message", messageData);
      setMessageList([...messageList, messageData]);
      setMessage("");
    };
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList([...messageList, data]);
    });
  }, [socket]);
  
  return (
    <Container maxW="md" h={'85%'} w={'100%'}>
      <Flex direction={"column"} w={'100%'} h={'100%'}>
         <Flex 
            bg = 'gray.200'
            h={'6%'}
            w={'100%'}
            align={'center'}
            justify="center"
            color={'black'}
        >
            <Heading size={"sm"} >Chat</Heading> 
            <Avatar src="" size="xs" marginStart={2} p={1}/>
        </Flex>

        <Flex bg="whiteAlpha.100" flex={1} direction={'column'} overflowY={'scroll'} sx={{scrollbarWidth: 'none'}}>
          {messageList.map((content) => {
            var sender = content.author == userName ? 'self' : 'other'
            var key = content.author+new Date(Date.now())+content.message;
            return (
              <ChatBox 
                message={content.message} 
                time={content.time} 
                author={content.author} 
                sender={sender}
                key={key}
              />
            );
          })}
          
        </Flex>

        <Stack direction={'row'} h={'10%'} p={3}>
          <Input 
            autoComplete='off' 
            borderRadius={'md'} 
            variant={'outline'} 
            size={"sm"} 
            placeholder="Send a message..."
            onChange={(e) => {setMessage(e.target.value)}}
          />
          <Button 
            marginStart={2} 
            borderRadius={'md'} 
            size={'sm'} 
            bg={'green.400'} 
            color={'green.100'}
            onClick={sendMessage}
          > 
            &#9658;
          </Button>  
        </Stack>
      
      </Flex>
    </Container>
  )
};

