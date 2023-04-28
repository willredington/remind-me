import { List, Text, useDisclosure } from '@chakra-ui/react';
import {
  TaskFormContext,
  TaskModal,
  useEditTaskForm,
} from '@remind-me/frontend/customer/feat-form';
import { useAppState } from '@remind-me/frontend/customer/util-store';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { Schedule, Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import { useCallback } from 'react';
import { TaskListItem } from './TaskListItem';

const now = DateTime.now();

export function TaskList({
  dateTime,
  schedule,
}: {
  dateTime: DateTime;
  schedule: Schedule;
}) {
  const trpcUtils = trpc.useContext();

  const editModal = useDisclosure();

  const [selectedTask, setSelectedTask] = useAppState(
    (state) => [state.selectedTask, state.setSelectedTask] as const
  );

  const editTaskForm = useEditTaskForm({
    dateTime,
    onSave: editModal.onClose,
  });

  const isTaskActive = useCallback(
    (task: Task) => {
      return task.id === selectedTask?.id;
    },
    [selectedTask]
  );

  const isTaskComplete = useCallback((task: Task) => {
    return DateTime.fromJSDate(task.endDate) < now;
  }, []);

  const deleteTaskMutation = trpc.task.deleteTask.useMutation({
    onSuccess: () => {
      trpcUtils.task.findUniqueOrCreateSchedule.invalidate({
        date: dateTime.startOf('day').toJSDate(),
      });
    },
  });

  const onDeleteTask = useCallback(
    async (task: Task) => {
      await deleteTaskMutation.mutateAsync({
        where: {
          id: task.id,
        },
      });
    },
    [deleteTaskMutation]
  );

  const onEditTask = useCallback(
    (task: Task) => {
      setSelectedTask(task);
      editModal.onOpen();
    },
    [setSelectedTask, editModal]
  );

  return (
    <>
      <List spacing={2} w="full">
        {schedule.tasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            dateTime={dateTime}
            isActive={isTaskActive(task)}
            isComplete={isTaskComplete(task)}
            onClick={() => setSelectedTask(task)}
            onDelete={() => onDeleteTask(task)}
            onEdit={() => onEditTask(task)}
          />
        ))}
      </List>
      {schedule.tasks.length === 0 && (
        <Text alignSelf={'flex-start'} fontSize={'lg'}>
          Tasks will appear here...
        </Text>
      )}
      <TaskFormContext.Provider value={editTaskForm}>
        <TaskModal
          isEditable
          title="Edit Task"
          buttonLabel="Edit"
          isOpen={editModal.isOpen}
          onClose={editModal.onClose}
        />
      </TaskFormContext.Provider>
    </>
  );
}
