import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Flex,
} from "@chakra-ui/react";

interface Props {
  data?: any;
  isOpen: boolean;
  handleClose: () => void;
  onSuccess?: (data?: any) => void;
  isError?: boolean;
  isSuccess?: boolean;
  isInfo?: boolean;
  heading?: string;
  hasAction?: boolean;
  hasCancel?: boolean;
  actionText?: string;
  children: any;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean
  customOverlay?: any;
}

const CustomModal: React.FC<Props> = ({
  isOpen,
  handleClose,
  heading,
  onSuccess,
  actionText,
  hasAction,
  hasCancel,
  closeOnOverlay,
  closeOnEsc,
  customOverlay,
  children,
}) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered
        closeOnOverlayClick={closeOnOverlay ?? true}
        closeOnEsc={closeOnEsc ?? true}
      >
        {customOverlay ?? <ModalOverlay />}

        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>

          <ModalBody>
            {children}
            <Flex direction="column" gap="mainPageGapXsm" my="mainPageGapXsm" >
              {hasAction && <Button onClick={onSuccess}>{actionText}</Button>}
              {hasCancel && (
                <Button variant="ghost" onClick={handleClose}>
                  Close
                </Button>
              )}
            </Flex>
          </ModalBody>

        </ModalContent>
      </Modal>
    </div>
  );
};

export default CustomModal;
