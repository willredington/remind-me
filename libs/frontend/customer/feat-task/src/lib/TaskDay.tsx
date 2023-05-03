import { Box, Center, Spinner, useDisclosure, VStack } from '@chakra-ui/react';
import {
  TaskFormContext,
  TaskModal,
  useEditTaskForm,
} from '@remind-me/frontend/customer/feat-form';
import { ConfirmationModal } from '@remind-me/frontend/customer/ui-common';
import {
  useHomeLocation,
  useSchedule,
} from '@remind-me/frontend/customer/util-hook';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { TaskSuggestion } from '@remind-me/shared/util-suggest';
import { Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import { useCallback, useState } from 'react';
import { TaskBar } from './TaskBar';
import { TaskList } from './TaskList';
import { TaskMap } from './TaskMap';

export function TaskDay({ dateTime }: { dateTime: DateTime }) {
  const trpcUtils = trpc.useContext();

  const editModal = useDisclosure();
  const deleteModal = useDisclosure();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [selectedSuggestion, setSelectedSuggestion] =
    useState<TaskSuggestion | null>(null);

  const { isLoading: isHomeLoading, data: homeLocation } = useHomeLocation();

  const { isLoading: isScheduleLoading, data: schedule } =
    useSchedule(dateTime);

  const { isLoading: isSuggestionLoading, data: suggestions = [] } =
    trpc.suggest.getSuggestions.useQuery({
      date: dateTime.toJSDate(),
    });

  const onDelete = useCallback(
    (task: Task) => {
      setSelectedTask(task);
      deleteModal.onOpen();
    },
    [deleteModal]
  );

  const onEdit = useCallback(
    (task: Task) => {
      setSelectedTask(task);
      editModal.onOpen();
    },
    [editModal]
  );

  const editTaskForm = useEditTaskForm({
    dateTime,
    onSave: editModal.onClose,
  });

  const deleteTaskMutation = trpc.task.deleteTask.useMutation({
    onSuccess: () => {
      trpcUtils.task.findUniqueOrCreateSchedule.invalidate({
        date: dateTime.startOf('day').toJSDate(),
      });
    },
  });

  const onConfirmDelete = useCallback(async () => {
    if (selectedTask) {
      await deleteTaskMutation.mutateAsync({
        where: {
          id: selectedTask.id,
        },
      });
    }
  }, [deleteTaskMutation, selectedTask]);

  const isReady = homeLocation != null && schedule != null;
  const isLoading = isHomeLoading || isScheduleLoading || isSuggestionLoading;

  // // FIXME
  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isReady) {
    return (
      <>
        <VStack spacing={4}>
          <TaskBar dateTime={dateTime} schedule={schedule} />
          <Box alignSelf="stretch">
            <TaskMap
              schedule={schedule}
              suggestions={suggestions}
              startingLocation={homeLocation}
              onClickSuggestion={setSelectedSuggestion}
            />
          </Box>
          <TaskList
            dateTime={dateTime}
            schedule={schedule}
            onEdit={onEdit}
            onClick={setSelectedTask}
            onDelete={onDelete}
          />
        </VStack>
        <TaskFormContext.Provider value={editTaskForm}>
          <TaskModal
            isEditable
            title="Edit Task"
            buttonLabel="Edit"
            isOpen={editModal.isOpen}
            onClose={editModal.onClose}
          />
        </TaskFormContext.Provider>
        <ConfirmationModal
          title="Delete Task"
          message="Are you sure you want to delete?"
          isOpen={deleteModal.isOpen}
          isLoading={deleteTaskMutation.isLoading}
          onClose={deleteModal.onClose}
          handleConfirm={onConfirmDelete}
        />
      </>
    );
  }

  return null;
}
