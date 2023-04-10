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
  useEditNonRecurringTaskForm,
} from '@remind-me/frontend/customer/feat-form';
import { NonRecurringTask } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import { useCallback, useMemo } from 'react';
import { trpc } from '@remind-me/frontend/customer/util-trpc';

export function EditEvent({
  isOpen,
  task,
  onSave,
  onClose,
}: {
  isOpen: boolean;
  task: NonRecurringTask | null;
  onSave: () => void;
  onClose: () => void;
}) {
  const {
    onSubmit,
    isLoading: isFormLoading,
    formReturn,
  } = useEditNonRecurringTaskForm({
    task,
    onSave,
  });

  const dateLabel = useMemo(() => {
    if (task) {
      return DateTime.fromJSDate(task.start).toFormat('LLL dd');
    }
  }, [task]);

  const deleteNonRecurringTaskMutation =
    trpc.task.deleteNonRecurringTask.useMutation({
      onSuccess: onClose,
    });

  const onDelete = useCallback(async () => {
    if (task) {
      await deleteNonRecurringTaskMutation.mutateAsync({
        where: {
          id: task.id,
        },
      });
    }
  }, [deleteNonRecurringTaskMutation, task]);

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
            <HStack spacing={2}>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isFormLoading}
              >
                Edit
              </Button>
              <Button
                type="submit"
                colorScheme="red"
                onClick={onDelete}
                isLoading={deleteNonRecurringTaskMutation.isLoading}
              >
                Delete
              </Button>
              <Button onClick={onClose}>Close</Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
