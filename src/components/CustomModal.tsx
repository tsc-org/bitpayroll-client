import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button
  } from '@chakra-ui/react'

  interface Props {
    isOpen: boolean
    handleClose: () => any;
    onSuccess?: () => any
    isError?: boolean
    isSuccess?: boolean
    isInfo?:boolean
    heading?: "string"
    description: "string"
    actionText?: "string"
    children: any
  }

const CustomModal: React.FC<Props> = ({ isOpen, handleClose,  heading,  actionText, children }) =>{
  return (
    <div>
       <Modal isOpen={isOpen} onClose={handleClose}>
        
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>

          <ModalBody>
           {children}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant='ghost'>{actionText}</Button>
          </ModalFooter>


        </ModalContent>
      </Modal>
    </div>
  )
}

export default CustomModal