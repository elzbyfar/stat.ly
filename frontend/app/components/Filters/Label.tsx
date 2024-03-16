import { Text } from '@radix-ui/themes';

export default function Label({ text }: { text: string }) {
  return (
    <Text htmlFor={text} className="text-[0.7rem] pl-2">
      {text}
    </Text>
  );
}
