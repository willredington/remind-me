import { Calendar } from '@remind-me/frontend/customer/feat-calendar';
import { Container } from '@chakra-ui/react';

export function Dashboard() {
  return (
    <Container
      mt={8}
      maxW={{
        md: 'container.lg',
        sm: 'container.sm',
      }}
    >
      <Calendar />
    </Container>
  );
}
