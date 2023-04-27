import { Box, Center, Spinner, VStack } from '@chakra-ui/react';
import { useHomeLocation } from '@remind-me/frontend/customer/util-hook';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { TaskBar } from './TaskBar';
import { TaskList } from './TaskList/TaskList';
import { TaskMap } from './TaskMap';

export function TaskDay({ dateTime }: { dateTime: DateTime }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { isLoading: isHomeLoading, data: homeLocation } = useHomeLocation();

  const { isLoading: isScheduleLoading, data: schedule } =
    trpc.task.findUniqueOrCreateSchedule.useQuery({
      date: dateTime.startOf('day').toJSDate(),
    });

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
          <TaskMap
            startingLocation={homeLocation}
            schedule={schedule}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        </Box>
        <TaskList
          dateTime={dateTime}
          schedule={schedule}
          selectedTask={selectedTask}
        />
      </VStack>
    );
  }

  return null;
}
