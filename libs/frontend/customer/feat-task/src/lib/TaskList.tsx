import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  IconButton,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { Schedule, Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import { useCallback } from 'react';
import { TaskItem } from './TaskItem';

const now = DateTime.now();

export function TaskList({
  dateTime,
  schedule,
  onEdit,
  onClick,
  onDelete,
}: {
  dateTime: DateTime;
  schedule: Schedule;
  onEdit: (task: Task) => void;
  onClick: (task: Task) => void;
  onDelete: (task: Task) => void;
}) {
  const isTaskComplete = useCallback((task: Task) => {
    return DateTime.fromJSDate(task.endDate) < now;
  }, []);

  return (
    <>
      <List spacing={2} w="full">
        {schedule.tasks.map((task) => (
          <ListItem key={task.id} onClick={() => onClick(task)}>
            <Card>
              <CardBody>
                <TaskItem
                  dateTime={dateTime}
                  task={task}
                  isComplete={isTaskComplete(task)}
                  addOn={
                    <>
                      <IconButton
                        aria-label="edit-task"
                        variant={'ghost'}
                        icon={<EditIcon />}
                        onClick={() => onEdit(task)}
                      />
                      <IconButton
                        aria-label="delete-task"
                        variant={'ghost'}
                        icon={<DeleteIcon />}
                        onClick={() => onDelete(task)}
                      />
                    </>
                  }
                />
              </CardBody>
            </Card>
          </ListItem>
        ))}
      </List>
      {schedule.tasks.length === 0 && (
        <Text alignSelf={'flex-start'} fontSize={'lg'}>
          Tasks will appear here...
        </Text>
      )}
    </>
  );
}
