import {
  HStack,
  List,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
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

// TODO: eta, add icon (suggested tasks?), edit icon
export function TaskList({
  dateTime,
  schedule,
}: {
  dateTime: DateTime;
  schedule: Schedule;
}) {
  const trpcUtils = trpc.useContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedTask, setSelectedTask] = useAppState(
    (state) => [state.selectedTask, state.setSelectedTask] as const
  );

  const editTaskForm = useEditTaskForm({
    dateTime,
    onSave: onClose,
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
    (taskId: string) => {
      deleteTaskMutation.mutateAsync({
        where: {
          id: taskId,
        },
      });
    },
    [deleteTaskMutation]
  );

  const onEditTask = useCallback(
    (task: Task) => {
      setSelectedTask(task);
      onOpen();
    },
    [setSelectedTask, onOpen]
  );

  return (
    <>
      <Tabs w="full" variant={'enclosed'}>
        <TabList>
          <Tab>
            <HStack>
              <Text>Scheduled</Text>
              <Tag>{schedule.tasks.length}</Tag>
            </HStack>
          </Tab>
          <Tab>
            <HStack>
              <Text>Unscheduled</Text>
              <Tag>{schedule.tasks.length}</Tag>
            </HStack>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <List spacing={2} w="full">
              {schedule.tasks.map((task) => (
                <TaskListItem
                  key={task.id}
                  task={task}
                  dateTime={dateTime}
                  isActive={isTaskActive(task)}
                  isComplete={isTaskComplete(task)}
                  onClick={() => setSelectedTask(task)}
                  onDelete={() => onDeleteTask(task.id)}
                  onEdit={() => onEditTask(task)}
                />
              ))}
            </List>
          </TabPanel>
          <TabPanel px={0}>stuff goes here</TabPanel>
        </TabPanels>
      </Tabs>
      <TaskFormContext.Provider value={editTaskForm}>
        <TaskModal
          isOpen={isOpen}
          title="Edit Task"
          buttonLabel="Edit"
          onClose={onClose}
        />
      </TaskFormContext.Provider>
    </>
  );
}
