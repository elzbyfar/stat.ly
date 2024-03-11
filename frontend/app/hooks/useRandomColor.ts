import { useState } from 'react';

export default function useRandomColor() {
  const [color, setColor] = useState<string>('#000000');

  const generateColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setColor(randomColor);
  };

  return { color, generateColor };
}