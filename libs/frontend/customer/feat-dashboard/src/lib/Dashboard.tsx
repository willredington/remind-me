import { Container } from '@chakra-ui/react';
import { TaskMap } from '@remind-me/frontend/customer/feat-task-map';
import { useHomeLocation } from '@remind-me/frontend/customer/util-hook';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { DateRange } from '@remind-me/shared/util-date';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';

const now = new Date();

export function Dashboard() {
  const [date, setDate] = useState(now);

  const homeLocation = useHomeLocation();

  const taskDateRange: DateRange = useMemo(() => {
    return [
      DateTime.fromJSDate(date).startOf('week').toJSDate(),
      DateTime.fromJSDate(date).endOf('week').toJSDate(),
    ];
  }, [date]);

  const { data: tasks = [] } = trpc.task.findManyTasks.useQuery({
    dateRange: taskDateRange,
  });

  return (
    <Container
      mt={8}
      maxW={{
        lg: 'container.xl',
        md: 'container.lg',
      }}
    >
      {homeLocation && (
        <TaskMap startingLocation={homeLocation} tasksForDay={tasks} />
      )}
      {/* <Calendar tasks={tasks} initialDate={date} onDateSelect={setDate} /> */}
    </Container>
  );
}
