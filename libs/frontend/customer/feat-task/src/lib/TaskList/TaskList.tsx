import {
  Card,
  CardBody,
  Divider,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tag,
} from '@chakra-ui/react';
import { Schedule, Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import { useCallback } from 'react';
import { getTaskTimeLabel, isToday } from './utils';

const now = DateTime.now();

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
  const isTaskComplete = useCallback((task: Task) => {
    return DateTime.fromJSDate(task.endDate) < now;
  }, []);

  return (
    <Tabs w="full" variant={'enclosed'}>
      <TabList>
        <Tab>
          <HStack>
            <Text>Scheduled</Text>
            <Tag>{schedule.tasks.length}</Tag>
          </HStack>
        </Tab>
        <Tab>
          <HStack>
            <Text>Unscheduled</Text>
            <Tag>{schedule.tasks.length}</Tag>
          </HStack>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel px={0}>
          <List spacing={2} w="full">
            {schedule.tasks.map((task) => (
              <ListItem key={task.id}>
                <Card>
                  <CardBody>
                    <VStack align="flex-start">
                      <Text fontSize="lg" fontWeight="semibold">
                        {task.name}
                      </Text>
                      <Text color="GrayText">{task.description}</Text>
                      <Divider />
                      <HStack spacing={4}>
                        <Text>
                          {isToday(dateTime)
                            ? 'Today'
                            : dateTime.toLocaleString(
                                DateTime.DATE_MED_WITH_WEEKDAY
                              )}
                        </Text>
                        <Text color="GrayText">{getTaskTimeLabel(task)}</Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              </ListItem>
            ))}
          </List>
        </TabPanel>
        <TabPanel px={0}>
          <List spacing={2} w="full">
            {schedule.tasks.map((task) => (
              <ListItem key={task.id}>
                <Card>
                  <CardBody>
                    <VStack align="flex-start">
                      <Text fontSize="lg" fontWeight="semibold">
                        {task.name}
                      </Text>
                      <Text color="GrayText">{task.description}</Text>
                      <Divider />
                      <HStack spacing={4}>
                        <Text>
                          {isToday(dateTime)
                            ? 'Today'
                            : dateTime.toLocaleString(
                                DateTime.DATE_MED_WITH_WEEKDAY
                              )}
                        </Text>
                        <Text color="GrayText">{getTaskTimeLabel(task)}</Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
