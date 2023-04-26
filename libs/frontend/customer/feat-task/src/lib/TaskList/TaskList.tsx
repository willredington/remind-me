import {
  Card,
  CardBody,
  Divider,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Schedule, Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import { useCallback } from 'react';
import { getTaskTimeLabel, isToday } from './utils';

// TODO: eta, add icon (suggested tasks?), edit icon
export function TaskList({
  dateTime,
  schedule,
  selectedTask,
}: {
  dateTime: DateTime;
  schedule: Schedule;
  selectedTask: Task | null;
}) {
  const isTaskComplete = useCallback(
    (task: Task) => {
      return DateTime.fromJSDate(task.endDate) < dateTime;
    },
    [dateTime]
  );

  return (
    <List spacing={2} w="full">
      {schedule.tasks.map((task) => (
        <ListItem key={task.id}>
          <Card>
            <CardBody>
              <VStack align="flex-start">
                {isTaskComplete(task) ? (
                  <Text fontSize="lg" textDecoration="line-through">
                    {task.name}
                  </Text>
                ) : (
                  <Text fontSize="lg" fontWeight="semibold">
                    {task.name}
                  </Text>
                )}
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
      ))}
    </List>
  );
}
