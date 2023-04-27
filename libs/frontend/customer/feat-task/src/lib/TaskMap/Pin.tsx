import { Text, VStack } from '@chakra-ui/react';
import { FaMapPin } from 'react-icons/fa';

export function MapPin({ name }: { name: string }) {
  return (
    <VStack align="center" cursor="pointer">
      <Text fontSize="2xl" fontWeight="semibold">
        {name}
      </Text>
      <FaMapPin size="3em" />
    </VStack>
  );
}
