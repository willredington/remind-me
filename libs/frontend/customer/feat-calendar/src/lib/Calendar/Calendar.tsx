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
import { AddEvent } from './AddEvent';
import { EditEvent } from './EditEvent';
import { CalendarEvent } from './types';
import { formatDateStripTime, plusOneHour } from './utils';

const localizer = luxonLocalizer(DateTime);

export function Calendar({
  tasks,
  initialDate,
  onDateSelect,
}: {
  tasks: Task[];
  initialDate: Date;
  onDateSelect: (date: Date) => void;
}) {
  const addModalDisclosure = useDisclosure();

  const editModalDisclosure = useDisclosure();

  const [slotDateRange, setSlotDateRange] = useState<DateRange>([
    initialDate,
    DateTime.fromJSDate(initialDate)
      .plus({
        hours: 1,
      })
      .toJSDate(),
  ]);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
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
      setSlotDateRange([newDate, plusOneHour(newDate)]);
      onDateSelect(newDate);
    },
    [setSlotDateRange, onDateSelect]
  );

  const onSelectEvent = useCallback(
    (event: CalendarEvent) => {
      console.log('event', event);
      setSelectedEvent(event);
      setSlotDateRange([event.start, event.end]);
      editModalDisclosure.onOpen();
    },
    [editModalDisclosure, setSlotDateRange]
  );

  const onSelectSlot = useCallback(
    ({ slots }: SlotInfo) => {
      if (slots.length >= 1) {
        const slotStart = slots[0];
        let slotEnd = plusOneHour(slotStart);

        if (slots.length > 1) {
          const lastDate = slots[slots.length - 1];
          // make sure this occurs within the same day
          if (
            formatDateStripTime(slotStart) === formatDateStripTime(lastDate)
          ) {
            slotEnd = lastDate;
          }
        }

        setSlotDateRange([slotStart, slotEnd]);
        onDateSelect(slotStart);
        addModalDisclosure.onOpen();
      }
    },
    [addModalDisclosure, setSlotDateRange, onDateSelect]
  );

  const onAdd = useCallback(async () => {
    addModalDisclosure.onClose();
  }, [addModalDisclosure]);

  const onEdit = useCallback(async () => {
    editModalDisclosure.onClose();
  }, [editModalDisclosure]);

  return (
    <>
      <Box h="400px">
        <RCalendar
          selectable
          // events={events}
          date={slotDateRange[0]}
          // onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
          onNavigate={onNavigate}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={{
            week: true,
          }}
        />
      </Box>
      <AddEvent
        start={slotDateRange[0]}
        end={slotDateRange[1]}
        isOpen={addModalDisclosure.isOpen}
        onClose={addModalDisclosure.onClose}
        onSave={onAdd}
      />
      <EditEvent
        task={selectedEvent?.task ?? null}
        isOpen={editModalDisclosure.isOpen}
        onClose={editModalDisclosure.onClose}
        onSave={onEdit}
      />
    </>
  );
}
