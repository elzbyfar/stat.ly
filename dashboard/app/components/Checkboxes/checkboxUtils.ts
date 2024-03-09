export function getChecked(collection: string[], showAnnotations: { [key: string]: boolean }) {
  if (collection.every((item) => showAnnotations[item])) {
    return true;
  } else if (collection.some((item) => showAnnotations[item])) {
    return 'indeterminate';
  }
  return false;
}

export function getNestedHeight({ length }: string[]) {
  if (length === 4) {
    return 'h-[90px]';
  } else if (length === 3) {
    return 'h-[66px]';
  } else if (length === 2) {
    return 'h-[42px]';
  } else if (length === 1) {
    return 'h-[18px]';
  }
  return 'h-0';
};