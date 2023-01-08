import { ModalOverlay, useDisclosure, Button, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Center } from "@chakra-ui/react"
import React from "react"
import LoginForm from "./loginForm"

const EnterButton = () => {

    const OverlayOne = () => (
        <ModalOverlay
          backdropFilter='blur(10px) hue-rotate(-20deg)'
        />
      );
    
      const { isOpen, onOpen, onClose } = useDisclosure();
      const [overlay, setOverlay] = React.useState(<OverlayOne />);
    
      return (
        <>
          <Button
            //isLoading
            p={6}
            width={"125px"}
            color='black'
            fontWeight='bold'
            borderRadius='0'
            bg="yellow"
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
      );
}

export default EnterButton;