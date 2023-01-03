import Head from 'next/head'
import type { NextPage, NextPageContext } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { Inter } from '@next/font/google'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { Button, Center, Text } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  
  useEffect(() => {
    const socket = io('http://localhost:8080');
    socket.on('connect', () => {
      console.log("successfully connected to the exotic playz server");
    });
    return () => {
      socket.close();
    };
  }, []);

  const { data } = useSession();
  console.log("Data:", data);
  
  return (
    <>
      <Head>
        <title>Exotic Plays</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Exotic Playsssssssss</h1>
      <p>Come play w some baddies</p>
      <center>
        <h3>{ data?.user?.name }</h3> 
        <div>
          {
            data?.user ? 
              (<Button onClick={() => signOut()}>Sign Out</Button>) :
              (
              <Center p={8}>
                <Button colorScheme='blue' size='sm' maxW={'md'} variant={'outline'} leftIcon={<FcGoogle />} onClick={() => signIn('google')}>
                  <Center> <Text>Continue with Google</Text> </Center>
                </Button>
              </Center>
              )
          }
        </div>
      </center>
      
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  };
};

export default Home;
