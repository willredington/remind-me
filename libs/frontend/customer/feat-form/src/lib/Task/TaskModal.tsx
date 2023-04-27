import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  Button,
  Text,
} from '@chakra-ui/react';
import { useTaskFormContext } from './context';
import { TaskForm } from './TaskForm';

export function TaskModal({
  title,
  buttonLabel,
  isOpen,
  onClose,
}: {
  title: string;
  buttonLabel: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isLoading, formReturn, onSubmit } = useTaskFormContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>
            <Text>{title}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm formReturn={formReturn} />
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button onClick={onClose}>Close</Button>
              <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                {buttonLabel}
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
