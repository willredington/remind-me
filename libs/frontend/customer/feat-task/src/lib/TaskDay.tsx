import {
  Box,
  Card,
  CardBody,
  Center,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import {
  useHomeLocation,
  useSchedule,
} from '@remind-me/frontend/customer/util-hook';
import { DateTime } from 'luxon';
import { TaskBar } from './TaskBar';
import { TaskList } from './TaskList';
import { TaskMap } from './TaskMap';

export function TaskDay({ dateTime }: { dateTime: DateTime }) {
  const { isLoading: isHomeLoading, data: homeLocation } = useHomeLocation();

  const { isLoading: isScheduleLoading, data: schedule } =
    useSchedule(dateTime);

  const isLoading = isHomeLoading || isScheduleLoading;

  // FIXME
  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (homeLocation && schedule) {
    return (
      <VStack spacing={6}>
        <TaskBar dateTime={dateTime} schedule={schedule} />
        <Box alignSelf="stretch" h="300px">
          <TaskMap startingLocation={homeLocation} schedule={schedule} />
        </Box>
        <Tabs variant={'enclosed'} w="full">
          <TabList>
            <Tab>Tasks</Tab>
            <Tab>My Trip</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TaskList dateTime={dateTime} schedule={schedule} />
            </TabPanel>
            <TabPanel>
              <p>my trip goes here</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    );
  }

  return null;
}
