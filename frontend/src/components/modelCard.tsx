import { CardBody, Stack, Heading, Divider, CardFooter, Button, Card, Text, Image, Flex, Center, Input } from '@chakra-ui/react'
import Link from 'next/link';
import React, { useState } from 'react'

export default function ModelCard() {
  const [userName, setuserName] = useState("");
  const room = "55";

  return (
    <Flex>
    <Card maxW='sm'>
        <CardBody>
        <Image
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Green double couch with wooden legs'
            borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
            <Heading size='md'>Jenny</Heading>
            <Text>
            Latina baddie
            </Text>
        </Stack>
        </CardBody>
        <Divider />
        <CardFooter justify={'center'}>
            <Link 
              href={{
                pathname: "/chat",
                query: { roomId: room, userName: userName },
              }}
              passHref
            >
              <Button>Chat Now</Button>
            </Link> 
        </CardFooter>
    </Card>

    <Center><Text mb='8px'>Name: {userName}</Text></Center>
    <Center>
        <Input
            value={userName}
            w={'15%'}
            onChange={(event) => setuserName(event.target.value)}
            placeholder='Type in your name'
            _placeholder={{ color: 'black' }}
            size='sm' />
    </Center>
    </Flex>
  )
}
