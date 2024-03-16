import { RadioGroup, Text, Flex } from '@radix-ui/themes';

type CustomRadioGroupProps = {
  label: string;
  options: string[];
  defaultValue: string;
  value: string;
  onChange: (value: string) => void;
};
export default function CustomRadioGroup({
  label,
  options,
  defaultValue,
  value,
  onChange,
}: CustomRadioGroupProps) {
  return (
    <RadioGroup.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={(selection) => onChange(selection)}
    >
      <Text as="label" size="2">
        {label}
      </Text>
      <Flex gap="2" direction="column">
        {options.map((option) => (
          <Text key={option} as="label" size="2" className="cursor-pointer">
            <Flex gap="2">
              <RadioGroup.Item value={option} />
              {option}
            </Flex>
          </Text>
        ))}
      </Flex>
    </RadioGroup.Root>
  );
}
