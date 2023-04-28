import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useCallback } from 'react';

export const ConfirmationModal = ({
  title,
  message,
  isOpen,
  isLoading,
  onClose,
  handleConfirm,
}: {
  title: string;
  message: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  handleConfirm: () => Promise<void>;
}) => {
  const onConfirm = useCallback(async () => {
    await handleConfirm();
    onClose();
  }, [handleConfirm, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={onConfirm} isLoading={isLoading}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
