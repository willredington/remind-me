import { Box, Center, Spinner, VStack } from '@chakra-ui/react';
import {
  useHomeLocation,
  useSchedule,
} from '@remind-me/frontend/customer/util-hook';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { DateTime } from 'luxon';
import { TaskBar } from './TaskBar';
import { TaskList } from './TaskList';
import { TaskMap } from './TaskMap';

export function TaskDay({ dateTime }: { dateTime: DateTime }) {
  const { isLoading: isHomeLoading, data: homeLocation } = useHomeLocation();

  const { isLoading: isScheduleLoading, data: schedule } =
    useSchedule(dateTime);

  const { isLoading: isSuggestionLoading, data: suggestions = [] } =
    trpc.suggest.getSuggestions.useQuery({
      date: dateTime.toJSDate(),
    });

  const isReady = homeLocation != null && schedule != null;
  const isLoading = isHomeLoading || isScheduleLoading || isSuggestionLoading;

  // // FIXME
  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isReady) {
    return (
      <VStack spacing={4}>
        <TaskBar dateTime={dateTime} schedule={schedule} />
        <Box alignSelf="stretch">
          <TaskMap
            schedule={schedule}
            suggestions={suggestions}
            startingLocation={homeLocation}
          />
        </Box>
        <TaskList dateTime={dateTime} schedule={schedule} />
      </VStack>
    );
  }

  return null;
}
