import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { io } from 'socket.io-client';
import ModelCard from '../components/modelCard';

const socket = io('http://localhost:5000');

export default function Hello() {
  
  useEffect(() => {
    socket.on('connect', () => {
      console.log("successfully connected to the exotic playz server");
      //socket.emit("join_room", roomId);
    });
    return () => {
      socket.close();
    };
  }, []);
  
  return (
    <Stack direction='row' spacing={4} align='center'>

      <ModelCard />

    </Stack>
  )
}
