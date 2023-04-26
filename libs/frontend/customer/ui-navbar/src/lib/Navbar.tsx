import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  HStack,
  IconButton,
  Image,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useAppState } from '@remind-me/frontend/customer/util-store';
import { DateTime } from 'luxon';
import { useCallback } from 'react';

const LOGO_URI = 'brand/base/full/base_logo_transparent_background.png';

export const Navbar = () => {
  const [date, setDate] = useAppState(
    (state) => [state.selectedDate, state.setSelectedDate] as const
  );

  const dateLabel = date.toLocaleString({
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  const prevDay = useCallback(() => {
    setDate(
      date.minus({
        days: 1,
      })
    );
  }, [date, setDate]);

  const nextDay = useCallback(() => {
    setDate(
      date.plus({
        days: 1,
      })
    );
  }, [date, setDate]);

  const setToday = useCallback(() => {
    setDate(DateTime.now());
  }, [setDate]);

  return (
    <HStack position={'relative'} w="full" spacing={4} align="center" p={4}>
      <Image h="50px" pos={'absolute'} top="3" src={LOGO_URI} alt="logo" />
      <Spacer />
      <HStack>
        <IconButton
          onClick={prevDay}
          variant={'outline'}
          aria-label="arrow-back"
          icon={<ArrowBackIcon />}
        />
        <Text fontWeight={'semibold'}>{dateLabel}</Text>
        <IconButton
          onClick={nextDay}
          variant={'outline'}
          aria-label="arrow-forward"
          icon={<ArrowForwardIcon />}
        />
      </HStack>
      <Button variant={'outline'} onClick={setToday}>
        Today
      </Button>
    </HStack>
  );
};
