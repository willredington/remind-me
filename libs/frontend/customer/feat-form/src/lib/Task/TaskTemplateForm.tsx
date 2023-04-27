import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  ALL_FREQUENCY_DAYS,
  FrequencyUnit,
  FrequencyUnitDescMap,
} from '@remind-me/shared/util-frequency';
import { Controller, useFormContext } from 'react-hook-form';
import { TaskTemplateFormData } from './types';

const frequencyOptions = Object.values(FrequencyUnit);

export function TaskTemplateForm() {
  const {
    control,
    watch,
    register,
    formState: { errors },
  } = useFormContext<TaskTemplateFormData>();

  const frequencyUnit = watch('frequencyUnit');

  const isWeekly = frequencyUnit === FrequencyUnit.Week;

  return (
    <>
      <GridItem colSpan={isWeekly ? 1 : 2}>
        <Controller
          control={control}
          name="frequencyUnit"
          rules={{ required: 'This is a required field.' }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <FormControl py={4} isInvalid={!!error}>
              <FormLabel>Frequency</FormLabel>
              <Select
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Select a frequency"
              >
                {frequencyOptions.map((frequency) => (
                  <option key={frequency} value={frequency}>
                    {FrequencyUnitDescMap[frequency]}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{error && error.message}</FormErrorMessage>
            </FormControl>
          )}
        />
      </GridItem>
      {isWeekly && (
        <>
          <FormControl isInvalid={!!errors.frequencyValue}>
            <FormLabel htmlFor="frequencyValue">Count</FormLabel>
            <NumberInput>
              <NumberInputField
                id="frequencyValue"
                placeholder="Every two weeks"
                {...register('frequencyValue', {
                  required: 'This is required',
                })}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>
              {errors.frequencyValue && errors.frequencyValue.message}
            </FormErrorMessage>
          </FormControl>
          <GridItem colSpan={2}>
            <SimpleGrid
              alignItems="center"
              gap={2}
              columns={{
                md: 2,
                sm: 1,
              }}
            >
              <Controller
                control={control}
                name="frequencyDays"
                render={({ field }) => (
                  <CheckboxGroup value={field.value} onChange={field.onChange}>
                    {ALL_FREQUENCY_DAYS.map((day) => (
                      <Checkbox key={day} value={day}>
                        {day}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                )}
              />
            </SimpleGrid>
          </GridItem>
        </>
      )}
    </>
  );
}
