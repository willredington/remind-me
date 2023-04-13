import { Calendar } from '@remind-me/frontend/customer/feat-calendar';
import { Container } from '@chakra-ui/react';

export function Dashboard() {
  return (
    <Container
      mt={8}
      maxW={{
        lg: 'container.xl',
        md: 'container.lg',
      }}
    >
      <Calendar />
    </Container>
  );
}
