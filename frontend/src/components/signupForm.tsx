import {Stack, Heading, Text, Button, Center, Input, Checkbox, Box, FormControl, FormHelperText, InputGroup, InputLeftElement, InputRightElement, Link, FormErrorMessage } from "@chakra-ui/react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { LoginAuthentication } from "../pages/api/auth/loginAuthentication";

const SignupForm = () => {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleInvalidEmail = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valueMissing) {
      setError('This field is required');
    } else if (e.currentTarget.validity.patternMismatch) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    console.log(email, password);
    e.preventDefault();
    LoginAuthentication(email, password).then(
      (response) => {
        console.log(response.success);
        if (response.success) {

          router.push('/hello')
        } else {
          setError(response.error)
        }
      }
    )
  }  
  return (
    <Stack h={'75vh'} className="loginBox" boxShadow='md' bg='whiteAlpha.900' p={'20'} rounded='md'>
      <Heading paddingBottom={'4'} as='h1' color={'blackAlpha.900'}> Nice to meet you!</Heading>
      <form onSubmit={handleSubmit}>
        <Stack>
          <FormControl>
              <InputGroup>
                  <InputLeftElement>
                      <MdEmail color="black" />
                  </InputLeftElement>
                  <Input 
                      color={'blackAlpha.900'}
                      fontSize='xs'
                      type="email" 
                      isRequired={true}
                      value={email}
                      pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'                      
                      onInvalid={handleInvalidEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Type in your email address" 
                      _placeholder={{color: "blackAlpha.900", fontSize: 'xs'}}
                      mb={'2'}
                  />
              </InputGroup>
          </FormControl>
      </Stack>
      {error && <Text size={'lg'} color='red.500'>{error}</Text>}
      <Button fontSize={'sm'} borderRadius={'md'} mt={'2'} mb={'5'} type={'submit'} h={'28px'} w={'25%'} colorScheme={"whatsapp"} alignContent="left">
        Log in
      </Button>
      <Center><Text color={'black'} mt={'5'} fontSize={'xs'}>or</Text></Center>
      <Center p={5} mb={'3'}>
        <Button borderRadius={'md'} colorScheme='blue' size='sm' maxW={'md'} leftIcon={<FcGoogle />} onClick={() => signIn('google')}>
          <Center> Continue with Google </Center>
        </Button>
      </Center>
    </form>

      <Stack pb={'-1.5'} className="loginFooter" justify={'center'} color={'blackAlpha.900'} spacing={'2'}>
        <Text as='div' fontSize={'sm'} textAlign={'center'}>
          <span >Already a member?  </span>
          <Button color={'blackAlpha.900'} variant='link'> Log in </Button>
        </Text>
      </Stack>
    </Stack>
  )
}

export default SignupForm;