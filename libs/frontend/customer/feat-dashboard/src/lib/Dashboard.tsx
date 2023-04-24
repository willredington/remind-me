import { Container } from '@chakra-ui/react';
import { TaskMap } from '@remind-me/frontend/customer/feat-task';
import { useHomeLocation } from '@remind-me/frontend/customer/util-hook';
import { useAppState } from '@remind-me/frontend/customer/util-store';

const now = new Date();

export function Dashboard() {
  const { selectedDate } = useAppState();

  const homeLocation = useHomeLocation();

  return (
    <Container
      mt={8}
      maxW={{
        lg: 'container.xl',
        md: 'container.lg',
      }}
    >
      {homeLocation && (
        <TaskMap dateTime={selectedDate} startingLocation={homeLocation} />
      )}
      <div>
        <p>asdfasdfasdfasdfasdfasd</p>
      </div>
      {/* <Calendar tasks={tasks} initialDate={date} onDateSelect={setDate} /> */}
    </Container>
  );
}
