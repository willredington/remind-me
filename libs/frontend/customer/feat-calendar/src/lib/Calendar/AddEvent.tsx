import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import {
  NonRecurringTaskForm,
  useCreateNonRecurringTaskForm,
} from '@remind-me/frontend/customer/feat-form';
import { DateTime } from 'luxon';
import { useMemo } from 'react';

export function AddEvent({
  isOpen,
  start,
  end,
  onSave,
  onClose,
}: {
  isOpen: boolean;
  start: Date;
  end: Date;
  onSave: () => void;
  onClose: () => void;
}) {
  const { onSubmit, isLoading, formReturn } = useCreateNonRecurringTaskForm({
    start,
    end,
    onSave,
  });

  const dateLabel = useMemo(
    () => DateTime.fromJSDate(start).toFormat('LLL dd'),
    [start]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>
            <Text>{dateLabel}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NonRecurringTaskForm formReturn={formReturn} />
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button onClick={onClose}>Close</Button>
              <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                Create
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
