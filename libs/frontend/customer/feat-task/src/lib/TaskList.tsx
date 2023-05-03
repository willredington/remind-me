import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  IconButton,
  List,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  TaskFormContext,
  TaskModal,
  useEditTaskForm,
} from '@remind-me/frontend/customer/feat-form';
import { ConfirmationModal } from '@remind-me/frontend/customer/ui-common';
import { useAppState } from '@remind-me/frontend/customer/util-store';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { Schedule, Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import { useCallback } from 'react';
import { TaskItem } from './TaskItem';

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
  const deleteModal = useDisclosure();

  const [selectedTask, setSelectedTask] = useAppState(
    (state) => [state.selectedTask, state.setSelectedTask] as const
  );

  const onDelete = useCallback(
    (task: Task) => {
      setSelectedTask(task);
      deleteModal.onOpen();
    },
    [deleteModal, setSelectedTask]
  );

  const onEdit = useCallback(
    (task: Task) => {
      setSelectedTask(task);
      editModal.onOpen();
    },
    [editModal, setSelectedTask]
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

  const isTaskComplete = useCallback((task: Task) => {
    return DateTime.fromJSDate(task.endDate) < now;
  }, []);

  return (
    <>
      <List spacing={2} w="full">
        {schedule.tasks.map((task) => (
          <ListItem key={task.id} onClick={() => setSelectedTask(task)}>
            <Card>
              <CardBody>
                <TaskItem
                  dateTime={dateTime}
                  task={task}
                  isComplete={isTaskComplete(task)}
                  addOn={
                    <>
                      <IconButton
                        aria-label="edit-task"
                        variant={'ghost'}
                        icon={<EditIcon />}
                        onClick={() => onEdit(task)}
                      />
                      <IconButton
                        aria-label="delete-task"
                        variant={'ghost'}
                        icon={<DeleteIcon />}
                        onClick={() => onDelete(task)}
                      />
                    </>
                  }
                />
              </CardBody>
            </Card>
          </ListItem>
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
