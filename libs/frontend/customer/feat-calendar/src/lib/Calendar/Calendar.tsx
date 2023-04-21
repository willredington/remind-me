import { Box, useDisclosure } from '@chakra-ui/react';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
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

const now = new Date();

const localizer = luxonLocalizer(DateTime);

export function Calendar() {
  const addModalDisclosure = useDisclosure();

  const editModalDisclosure = useDisclosure();

  const [selectedDateRange, setSelectedDateRange] = useState([
    now,
    plusOneHour(now),
  ]);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const monthlyDateRange: [start: Date, end: Date] = useMemo(() => {
    const point = DateTime.fromJSDate(selectedDateRange[0]);

    const oneWeekPrevious = point.minus({
      weeks: 1,
    });

    const fourWeeksLater = point.plus({
      weeks: 4,
    });

    return [oneWeekPrevious.toJSDate(), fourWeeksLater.toJSDate()];
  }, [selectedDateRange]);

  const { refetch, data: tasks = [] } = trpc.task.findManyTasks.useQuery({
    dateRange: monthlyDateRange,
  });

  const events: CalendarEvent[] = useMemo(
    () =>
      tasks.map((task) => ({
        task,
        title: task.name,
        description: task.description,
        start: task.startDate,
        end: task.endDate,
      })),
    [tasks]
  );

  const onNavigate = useCallback((newDate: Date) => {
    setSelectedDateRange([newDate, plusOneHour(newDate)]);
  }, []);

  const onSelectEvent = useCallback(
    (event: CalendarEvent) => {
      console.log('event', event);
      setSelectedEvent(event);
      setSelectedDateRange([event.start, event.end]);
      editModalDisclosure.onOpen();
    },
    [editModalDisclosure]
  );

  const onSelectSlot = useCallback(
    ({ slots }: SlotInfo) => {
      if (slots.length >= 1) {
        const start = slots[0];
        let end = plusOneHour(start);

        if (slots.length > 1) {
          const lastDate = slots[slots.length - 1];
          // make sure this occurs within the same day
          if (formatDateStripTime(start) === formatDateStripTime(lastDate)) {
            end = lastDate;
          }
        }

        setSelectedDateRange([start, end]);
        addModalDisclosure.onOpen();
      }
    },
    [addModalDisclosure]
  );

  const onAdd = useCallback(async () => {
    addModalDisclosure.onClose();
    await refetch();
  }, [addModalDisclosure, refetch]);

  const onEdit = useCallback(async () => {
    editModalDisclosure.onClose();
    await refetch();
  }, [editModalDisclosure, refetch]);

  return (
    <>
      <Box h="700px">
        <RCalendar
          selectable
          events={events}
          date={selectedDateRange[0]}
          onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
          onNavigate={onNavigate}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          views={{
            week: true,
            month: true,
          }}
        />
      </Box>
      <AddEvent
        start={selectedDateRange[0]}
        end={selectedDateRange[1]}
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
