import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  Divider,
  HStack,
  IconButton,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import { IoMdPin } from 'react-icons/io';
import { getTaskTimeLabel, isToday } from './utils';

export function TaskListItem({
  task,
  dateTime,
  isComplete,
  isActive,
  onClick,
  onEdit,
  onDelete,
}: {
  task: Task;
  dateTime: DateTime;
  isComplete: boolean;
  isActive: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <ListItem onClick={onClick}>
      <Card>
        <CardBody>
          <VStack align="flex-start">
            <HStack w="full" justify={'space-between'} align={'center'}>
              <Text
                fontSize="lg"
                fontWeight="semibold"
                textDecoration={isComplete ? 'line-through' : 'none'}
              >
                {task.name}
              </Text>
              <HStack>
                <IconButton
                  aria-label="edit-task"
                  variant={'ghost'}
                  icon={<EditIcon />}
                  onClick={onEdit}
                />
                <IconButton
                  aria-label="delete-task"
                  variant={'ghost'}
                  icon={<DeleteIcon />}
                  onClick={onDelete}
                />
              </HStack>
            </HStack>
            <HStack>
              <Text color="GrayText">{task.location.name}</Text>
              <IoMdPin />
            </HStack>
            <Text color="GrayText">{task.description}</Text>
            <Divider />
            <HStack spacing={4}>
              <Text>
                {isToday(dateTime)
                  ? 'Today'
                  : dateTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
              </Text>
              <Text color="GrayText">{getTaskTimeLabel(task)}</Text>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </ListItem>
  );
}
