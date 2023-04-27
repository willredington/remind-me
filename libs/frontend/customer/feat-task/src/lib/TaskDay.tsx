import { Box, Center, Spinner, VStack } from '@chakra-ui/react';
import {
  useHomeLocation,
  useSchedule,
} from '@remind-me/frontend/customer/util-hook';
import { DateTime } from 'luxon';
import { TaskBar } from './TaskBar';
import { TaskList } from './TaskList';
import { TaskMap } from './TaskMap';

export function TaskDay({ dateTime }: { dateTime: DateTime }) {
  const { isLoading: isHomeLoading, data: homeLocation } = useHomeLocation();

  const { isLoading: isScheduleLoading, data: schedule } =
    useSchedule(dateTime);

  const isLoading = isHomeLoading || isScheduleLoading;

  // FIXME
  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (homeLocation && schedule) {
    return (
      <VStack spacing={4}>
        <TaskBar dateTime={dateTime} tasks={schedule.tasks} />
        <Box alignSelf="stretch" h="300px">
          <TaskMap startingLocation={homeLocation} schedule={schedule} />
        </Box>
        <TaskList dateTime={dateTime} schedule={schedule} />
      </VStack>
    );
  }

  return null;
}
