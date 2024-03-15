'use client';
import { SelectOption } from '@/app/lib/types';
import { Box } from '@radix-ui/themes';
import Select, { CSSObjectWithLabel } from 'react-select';

export default function CustomSelect({
  defaultValue,
  options,
  label,
  value,
  onChange,
}: {
  defaultValue: SelectOption;
  options: SelectOption[];
  label: string;
  value: SelectOption;
  onChange: (value: SelectOption) => void;
}) {
  return (
    <Box>
      <label htmlFor={label} className="text-xs pl-2">
        {label}
      </label>
      <Select
        defaultValue={defaultValue}
        options={options}
        value={value}
        onChange={(selection) => onChange(selection as SelectOption)}
        isSearchable
        styles={{
          control: (base: CSSObjectWithLabel) => ({
            ...base,
            borderRadius: 35,
            padding: '0 0.5rem',
            fontSize: 14,
            height: 10,
          }),
          option: (base: CSSObjectWithLabel) => ({
            ...base,
            fontSize: 14,
          }),
        }}
      />
    </Box>
  );
}
