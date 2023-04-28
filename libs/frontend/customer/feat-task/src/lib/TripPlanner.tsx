import {
  Button,
  HStack,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Schedule } from '@remind-me/shared/util-task';
import { IoMdPin } from 'react-icons/io';

export function TripPlanner({
  isOpen,
  onClose,
  schedule,
}: {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule;
}) {
  return (
    <List>
      {schedule.tasks.map((task) => (
        <ListItem key={task.id}>
          <VStack align={'flex-start'} w="full">
            <Text fontSize={'lg'} fontWeight={'semibold'}>
              {task.name}
            </Text>
            <HStack>
              <Text color={'GrayText'}>{task.location.name}</Text>
              <IoMdPin />
            </HStack>
          </VStack>
        </ListItem>
      ))}
    </List>
  );
}
