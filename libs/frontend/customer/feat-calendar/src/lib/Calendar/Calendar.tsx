import { Box, useDisclosure } from '@chakra-ui/react';
import { DateRange } from '@remind-me/shared/util-date';
import { Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import { useCallback, useMemo, useState } from 'react';
import {
  Calendar as RCalendar,
  luxonLocalizer,
  SlotInfo,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './types';
import { formatDateStripTime, plusOneHour } from './utils';
import { useAppState } from '@remind-me/frontend/customer/util-store';

const localizer = luxonLocalizer(DateTime);

export function Calendar({ tasks }: { tasks: Task[] }) {
  const [selectedDate, setSelectedDate, selectedTask, setSelectedTask] =
    useAppState(
      (state) =>
        [
          state.selectedDate,
          state.setSelectedDate,
          state.selectedTask,
          state.setSelectedTask,
        ] as const
    );

  const [slotEnd, setSlotEnd] = useState(
    selectedDate
      .plus({
        hours: 1,
      })
      .toJSDate()
  );

  // const events: CalendarEvent[] = useMemo(
  //   () =>
  //     tasks.map((task) => ({
  //       task,
  //       title: task.name,
  //       description: task.description,
  //       start: task.startDate,
  //       end: task.endDate,
  //     })),
  //   [tasks]
  // );

  // console.log('events', events);

  const onNavigate = useCallback(
    (newDate: Date) => {
      const newDateTime = DateTime.fromJSDate(newDate);
      setSelectedDate(newDateTime);
      setSlotEnd(
        newDateTime
          .plus({
            hours: 1,
          })
          .toJSDate()
      );
    },
    [setSlotEnd, setSelectedDate]
  );

  const onSelectEvent = useCallback(
    (event: CalendarEvent) => {
      console.log('event', event);
      setSelectedTask(event.task);
      setSelectedDate(DateTime.fromJSDate(event.start));
      setSlotEnd(event.end);
    },
    [setSelectedTask, setSelectedDate, setSlotEnd]
  );

  // const onSelectSlot = useCallback(
  //   ({ slots }: SlotInfo) => {
  //     if (slots.length >= 1) {
  //       const slotStart = slots[0];
  //       let slotEnd = plusOneHour(slotStart);

  //       if (slots.length > 1) {
  //         const lastDate = slots[slots.length - 1];
  //         // make sure this occurs within the same day
  //         if (
  //           formatDateStripTime(slotStart) === formatDateStripTime(lastDate)
  //         ) {
  //           slotEnd = lastDate;
  //         }
  //       }

  //       setSlotEnd(slotEnd);
  //       onDateSelect(slotStart);
  //     }
  //   },
  //   [setSlotDateRange, onDateSelect]
  // );

  return (
    <RCalendar
      selectable
      // events={events}
      date={selectedDate.toJSDate()}
      // onSelectEvent={onSelectEvent}
      // onSelectSlot={onSelectSlot}
      onNavigate={onNavigate}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      defaultView="week"
      views={{
        week: true,
      }}
    />
  );
}
