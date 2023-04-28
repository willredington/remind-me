import { HStack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaHome, FaMapPin } from 'react-icons/fa';
import { HiPlusCircle } from 'react-icons/hi';

function LegendItem({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <HStack>
      {icon}
      <Text>{label}</Text>
    </HStack>
  );
}

export function Legend() {
  return (
    <HStack spacing={4}>
      <LegendItem label="Home" icon={<FaHome />} />
      <LegendItem label="Tasks" icon={<FaMapPin />} />
      <LegendItem label="Suggestions" icon={<HiPlusCircle />} />
    </HStack>
  );
}
