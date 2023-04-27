import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import 'react-clock/dist/Clock.css';
import { Controller, useFormContext } from 'react-hook-form';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { TaskTemplateForm } from './TaskTemplateForm';
import { TaskFormData } from './types';

export function TaskForm({ isEditable }: { isEditable?: boolean }) {
  const {
    control,
    watch,
    register,
    formState: { errors },
  } = useFormContext<TaskFormData>();

  const isRecurring = watch('isRecurring');

  const { data: locations = [] } = trpc.location.findManyLocations.useQuery();

  return (
    <SimpleGrid
      spacing={6}
      mb={4}
      alignItems="center"
      columns={{
        md: 2,
        sm: 1,
      }}
    >
      {!isEditable && (
        <Controller
          control={control}
          name="isRecurring"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Checkbox onChange={onChange} isChecked={value}>
              Is Recurring?
            </Checkbox>
          )}
        />
      )}
      <GridItem colSpan={2}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Task Name</FormLabel>
          <Input
            id="name"
            placeholder="New task name"
            {...register('name', {
              required: 'This is required',
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <Controller
          control={control}
          name="locationId"
          rules={{ required: 'This is a required field.' }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <FormControl py={4} isInvalid={!!error}>
              <FormLabel>Location</FormLabel>
              <Select
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Select a location"
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {`${location.name} - ${location.address}`}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{error && error.message}</FormErrorMessage>
            </FormControl>
          )}
        />
      </GridItem>
      <HStack spacing={4}>
        <Text>Start Time</Text>
        <Controller
          control={control}
          name="startTime"
          render={({ field }) => (
            <TimePicker onChange={field.onChange} value={field.value} />
          )}
        />
      </HStack>
      <HStack spacing={4}>
        <Text>End Time</Text>
        <Controller
          control={control}
          name="endTime"
          render={({ field }) => (
            <TimePicker onChange={field.onChange} value={field.value} />
          )}
        />
      </HStack>
      {isRecurring && <TaskTemplateForm />}
    </SimpleGrid>
  );
}
