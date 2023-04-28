import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  HStack,
  Spacer,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  TaskFormContext,
  TaskModal,
  useCreateTaskForm,
} from '@remind-me/frontend/customer/feat-form';
import { Schedule } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';

export function TaskBar({
  schedule,
  dateTime,
}: {
  schedule: Schedule;
  dateTime: DateTime;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const createTaskForm = useCreateTaskForm({
    dateTime,
    onSave: onClose,
  });

  const dateLabel = dateTime.toLocaleString({
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });

  return (
    <>
      <HStack w="full" align="center">
        <HStack align={'baseline'} spacing={4}>
          <Text fontSize={'3xl'} fontWeight={'semibold'}>
            Tasks
          </Text>
          <Tag>{schedule.tasks.length}</Tag>
          <Text fontSize={'xl'} color="GrayText">
            {dateLabel}
          </Text>
        </HStack>
        <Spacer />
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
