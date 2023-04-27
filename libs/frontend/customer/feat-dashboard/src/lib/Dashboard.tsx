import { Container } from '@chakra-ui/react';
import { TaskDay } from '@remind-me/frontend/customer/feat-task';
import { useAppState } from '@remind-me/frontend/customer/util-store';

export function Dashboard() {
  const { selectedDate } = useAppState();

  return (
    <Container
      mt={6}
      mb={8}
      maxW={{
        lg: 'container.xl',
        md: 'container.lg',
      }}
    >
      <TaskDay dateTime={selectedDate} />
      {/* <Calendar tasks={tasks} initialDate={date} onDateSelect={setDate} /> */}
    </Container>
  );
}
