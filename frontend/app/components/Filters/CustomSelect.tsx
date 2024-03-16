'use client';
import { SelectOption } from '@/app/lib/types';
import { Box, Text } from '@radix-ui/themes';
import Select, { CSSObjectWithLabel } from 'react-select';
import Label from './Label';

type CustomSelectProps = {
  defaultValue: SelectOption;
  options: SelectOption[];
  label: string;
  value: SelectOption;
  onChange: (value: SelectOption) => void;
};

export default function CustomSelect({
  defaultValue,
  options,
  label,
  value,
  onChange,
}: CustomSelectProps) {
  return (
    <Box>
      <Label text={label} />
      <Select
        defaultValue={defaultValue}
        options={options}
        value={value}
        onChange={(selection) => onChange(selection as SelectOption)}
        isSearchable
        styles={{
          control: (base: CSSObjectWithLabel) => ({
            ...base,
            borderRadius: 8,
            padding: '0 0.25rem',
            fontSize: 14,
            height: 10,
          }),
          option: (base: CSSObjectWithLabel) => ({
            ...base,
            fontSize: 14,
          }),
          menu: (base: CSSObjectWithLabel) => ({
            ...base,
            width: '96%',
            margin: '0.25rem 2%',
          }),
        }}
      />
    </Box>
  );
}
