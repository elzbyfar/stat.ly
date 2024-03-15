'use client';
import { useState } from 'react';
import { SelectOption } from '../lib/types';

export default function useSelectOptions(
  arr: readonly string[],
  labelFn?: (label: string) => string,
  valueFn?: (value: string) => string,
): {
  options: SelectOption[];
  defaultValue: SelectOption;
  state: [
    selected: SelectOption,
    setSelected: (selected: SelectOption) => void,
  ];
} {
  const options = arr.map((item) => ({
    label: labelFn ? labelFn(item.toString()) : item.toString(),
    value: valueFn ? valueFn(item.toString()) : item.toString(),
  }));
  const defaultValue = options[0];
  const [selected, setSelected] = useState<SelectOption>(defaultValue);

  return { options, defaultValue, state: [selected, setSelected] };
}
