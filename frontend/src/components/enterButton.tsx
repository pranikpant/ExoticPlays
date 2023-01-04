import { ModalOverlay, useDisclosure, Button, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Center } from "@chakra-ui/react"
import React from "react"
import LoginForm from "./loginForm"

const EnterButton = () => {

    const OverlayOne = () => (
        <ModalOverlay
          bg='red.400'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
      )
    
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [overlay, setOverlay] = React.useState(<OverlayOne />)
    
      return (
        <>
          <Button
            p={6}
            color='white'
            fontWeight='bold'
            borderRadius='md'
            bgGradient='linear(to-r, teal.500, green.500)'
            _hover={{
                bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}
            onClick={() => {
              setOverlay(<OverlayOne />)
              onOpen()
            }}
          >
            Enter
          </Button>

          <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
              <LoginForm />
            </ModalContent>
          </Modal>
        </>
      )
}

export default EnterButton;