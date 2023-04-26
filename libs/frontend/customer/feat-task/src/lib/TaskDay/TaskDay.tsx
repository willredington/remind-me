import { Skeleton, VStack } from '@chakra-ui/react';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { DateTime } from 'luxon';
import { TaskMap } from './TaskMap/TaskMap';
import { useHomeLocation } from '@remind-me/frontend/customer/util-hook';
import { useState } from 'react';
import { Task } from '@remind-me/shared/util-task';

export function TaskDay({ dateTime }: { dateTime: DateTime }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { isLoading: isHomeLoading, data: homeLocation } = useHomeLocation();

  const { isLoading: isScheduleLoading, data: schedule } =
    trpc.task.findUniqueOrCreateSchedule.useQuery({
      date: dateTime.startOf('day').toJSDate(),
    });

  const isLoading = isHomeLoading || isScheduleLoading;

  return (
    <VStack>
      <Skeleton isLoaded={!isLoading} alignSelf="stretch" height="500px">
        {homeLocation && schedule && (
          <TaskMap
            startingLocation={homeLocation}
            schedule={schedule}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        )}
      </Skeleton>
    </VStack>
  );
}
