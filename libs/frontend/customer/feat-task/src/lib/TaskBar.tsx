import { AddIcon } from '@chakra-ui/icons';
import { Button, HStack, Tag, Text, useDisclosure } from '@chakra-ui/react';
import {
  TaskFormContext,
  TaskModal,
  useCreateTaskForm,
} from '@remind-me/frontend/customer/feat-form';
import { Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';

export function TaskBar({
  tasks,
  dateTime,
}: {
  tasks: Task[];
  dateTime: DateTime;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const createTaskForm = useCreateTaskForm({
    dateTime,
  });

  const dateLabel = dateTime.toLocaleString({
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });

  return (
    <>
      <HStack w="full" justify={'space-between'} align="center">
        <HStack align={'baseline'} spacing={4}>
          <HStack>
            <Text fontSize={'xl'}>Tasks</Text>
            <Tag>{tasks.length}</Tag>
          </HStack>
          <Text color="GrayText">{dateLabel}</Text>
        </HStack>
        <Button
          variant={'outline'}
          size="sm"
          leftIcon={<AddIcon />}
          onClick={onOpen}
        >
          New Task
        </Button>
      </HStack>
      <TaskFormContext.Provider value={createTaskForm}>
        <TaskModal
          title="Create Task"
          buttonLabel="Create"
          isOpen={isOpen}
          onClose={onClose}
        />
      </TaskFormContext.Provider>
    </>
  );
}
