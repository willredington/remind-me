import {
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Schedule } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import { TaskList } from './TaskList';

export function TaskContent({
  dateTime,
  schedule,
}: {
  dateTime: DateTime;
  schedule: Schedule;
}) {
  return (
    <VStack w="full" align={'flex-start'}>
      <HStack>
        <Text>Tasks</Text>
        <Tag>{schedule.tasks.length}</Tag>
      </HStack>
      <TaskList dateTime={dateTime} schedule={schedule} />
    </VStack>
  );
}
