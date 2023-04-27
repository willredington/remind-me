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
import { FormProvider } from 'react-hook-form';
import { useTaskFormContext } from './context';
import { TaskForm } from './TaskForm';

export function TaskModal({
  title,
  buttonLabel,
  isOpen,
  isEditable,
  onClose,
}: {
  title: string;
  buttonLabel: string;
  isOpen: boolean;
  isEditable?: boolean;
  onClose: () => void;
}) {
  const { isLoading, formReturn, onSubmit } = useTaskFormContext();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...formReturn}>
          <form onSubmit={onSubmit}>
            <ModalHeader>
              <Text>{title}</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TaskForm isEditable={isEditable} />
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
        </FormProvider>
      </ModalContent>
    </Modal>
  );
}
