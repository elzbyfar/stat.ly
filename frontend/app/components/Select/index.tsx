import Select from 'react-select';

export default Select({ children, ...props }: SelectProps) {
  return (
    <Select {...props}>
      {children}
    </Select>
  );
}
