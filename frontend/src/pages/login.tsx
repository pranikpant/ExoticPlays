import { Flex, Box, Input, Button, Center } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { LoginAuthentication } from './api/auth/loginAuthentication'

const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | undefined | null>(null)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    console.log(email, password);
    e.preventDefault();
    // Make a request to the server to authenticate the user
    LoginAuthentication(email, password).then(
      (response) => {
        console.log(response.success);
        if (response.success) {
          // Redirect the user to the dashboard
          router.push('/hello')
        } else {
          setError(response.error)
        }
      }
    )
  }

  return (
    <Flex align='center' justify='center' height='100vh'>
      <Box p={5} shadow='md' borderWidth='1px'>
        <form onSubmit={handleSubmit}>
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            mb={3}
          />
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            mb={3}
          />
          <Center p={8}>
                <Button colorScheme='blue' size='sm' maxW={'md'} variant={'outline'} leftIcon={<FcGoogle />} onClick={() => signIn('google')}>
                  <Center>Continue with Google </Center>
                </Button>
            </Center>
          {error && <p>{error}</p>}
          <Button type='submit' colorScheme={'teal'}>
            Log in
          </Button>
        </form>
      </Box>
    </Flex>
  )
}

export default LoginPage;
