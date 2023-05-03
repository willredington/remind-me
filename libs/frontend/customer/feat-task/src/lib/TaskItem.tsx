import { HStack, Text, VStack } from '@chakra-ui/react';
import { Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import { ReactNode } from 'react';
import { IoMdPin } from 'react-icons/io';
import { getTaskTimeLabel, isToday } from './utils';

export function TaskItem({
  isComplete,
  dateTime,
  task,
  addOn,
}: {
  isComplete: boolean;
  dateTime: DateTime;
  task: Task;
  addOn?: ReactNode;
}) {
  return (
    <VStack align="flex-start">
      <HStack w="full" justify={'space-between'} align={'center'}>
        <Text
          fontSize="lg"
          fontWeight="semibold"
          textDecoration={isComplete ? 'line-through' : 'none'}
        >
          {task.name}
        </Text>
        {addOn && <HStack>{addOn}</HStack>}
      </HStack>
      {task.description && <Text>{task.description}</Text>}
      <HStack>
        <Text color="GrayText">{task.location.name}</Text>
        <IoMdPin />
      </HStack>
      <HStack>
        <Text>
          {isToday(dateTime)
            ? 'Today'
            : dateTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
        </Text>
        <Text color="GrayText">{getTaskTimeLabel(task)}</Text>
      </HStack>
    </VStack>
  );
}
