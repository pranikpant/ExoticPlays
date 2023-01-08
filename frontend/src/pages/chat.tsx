import { Flex, Heading } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import ChatContainer from '../components/chatContainer';
import VideoContainer from '../components/videoContainer';

const Topbar = () => {
    return (
        <Flex 
            bg = 'crimson'
            h={'12vh'}
            w={'100%'}
            align={'center'}
            p={5}
            color={'white'}
        >
            <Heading>Sample Top Bar</Heading> 
        </Flex>
    )
};

interface ChatProps {
    roomId: string,
    user: string
};

const socket = io('http://localhost:8080');
export default function Chat({roomId, user}: ChatProps) {
    
    
    useEffect(() => {
        socket.on('connect', () => {
          console.log("successfully connected to the exotic playz server");
          socket.emit("join_room", roomId);
        });
        return () => {
          socket.close();
        };
      }, []);
    
    const { data } = useSession();
    console.log("Data:", data);
    
    return (

        <Flex h={'100vh'} direction={'column'}>

            <Topbar />

            <Flex h={'100%'} direction={'row'}>

                <Flex h={'100%'} w={'15%'} bg='red.200'> {/* sidebar */}
                </Flex> 

                <Flex flex={1} align={'center'} justify={'center'} outline="double" outlineColor={"red"}> 
                    <VideoContainer />
                </Flex> 

                <Flex h={'100%'} w={'25%'} bg='whiteAlpha.900' align={'center'} justify={'center'}> 
                    <ChatContainer socket={socket} room={roomId} userName={user}/>
                </Flex>

            </Flex>
        </Flex>
    );       
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    var roomId = context.query["roomId"];
    var user = context.query["userName"];
    return {
        props: {
            roomId,
            user
        }
    };
};