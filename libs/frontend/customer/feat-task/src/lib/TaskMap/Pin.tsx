import { Box, Text, VStack } from '@chakra-ui/react';
import { FaHome, FaMapPin } from 'react-icons/fa';
import { HiPlusCircle } from 'react-icons/hi';

export function HomeMapPin({ name }: { name: string }) {
  return (
    <VStack align="center" cursor="pointer">
      <Text fontSize="2xl" fontWeight="semibold">
        {name}
      </Text>
      <FaHome size="3em" />
    </VStack>
  );
}

export function TaskMapPin({ name }: { name: string }) {
  return (
    <VStack align="center" cursor="pointer">
      <Text fontSize="2xl" fontWeight="semibold">
        {name}
      </Text>
      <FaMapPin size="3em" />
    </VStack>
  );
}

export function SuggestMapPin({ name }: { name: string }) {
  return (
    <VStack align="center" cursor="pointer">
      <Text fontSize="2xl" fontWeight="semibold">
        {name}
      </Text>
      <HiPlusCircle size="3em" />
    </VStack>
  );
}
