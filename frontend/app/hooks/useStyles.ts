function useStyles(styleObject: { [key: string]: string }) {
  // this hook takes a style object and returns a function that
  // trades a base string for a string containing tailwind classes for all breakpoints

  return (input: string | string[]) => {
    let classes: string = '';

    const bases: string[] = Array.isArray(input) ? input : [input];
    for (const base of bases) {
      for (const [key, styles] of Object.entries(styleObject)) {
        if (key.startsWith(base)) {
          classes += styles + ' ';
        }
      }
    }
    return classes;
  };
}
export default useStyles;
