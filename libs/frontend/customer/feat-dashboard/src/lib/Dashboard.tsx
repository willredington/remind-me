import { Container } from '@chakra-ui/react';
import { TaskMap } from '@remind-me/frontend/customer/feat-task-map';
import {
  useHomeLocation,
  useTasks,
} from '@remind-me/frontend/customer/util-hook';
import { useAppState } from '@remind-me/frontend/customer/util-store';

const now = new Date();

export function Dashboard() {
  const { selectedDate, dateSelectionMode } = useAppState();

  const homeLocation = useHomeLocation();

  const { isLoading, tasksForDay } = useTasks();

  return (
    <Container
      mt={8}
      maxW={{
        lg: 'container.xl',
        md: 'container.lg',
      }}
    >
      {homeLocation && (
        <TaskMap
          dateTime={selectedDate}
          startingLocation={homeLocation}
          tasksForDay={tasksForDay}
        />
      )}
      <div>
        <p>asdfasdfasdfasdfasdfasd</p>
      </div>
      {/* <Calendar tasks={tasks} initialDate={date} onDateSelect={setDate} /> */}
    </Container>
  );
}
