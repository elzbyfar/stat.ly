import { CheckboxBranchProps } from '@/app/lib/types';
import { Checkbox } from '../ui/checkbox';
import useStyles from '@/app/hooks/useStyles';

export default function CheckboxBranch({
  nested = false,
  nestHeight = 'h-0',
  label,
  annotationKey,
  onCheck,
  checked,
}: CheckboxBranchProps) {
  const className = {
    wrapper: 'relative data-[nested=true]:pl-10',
    horizontalLine:
      'absolute h-[1px] w-4 bg-zinc-400 translate-y-2 data-[nested=true]:left-6',
    checkbox: 'data-[nested=false]:ml-4 data-[nested=false]:mr-2',
    label: 'data-[nested=true]:pl-2 cursor-pointer',
    verticalLine: `left-6 w-[1px] absolute top-4 bg-zinc-400 ${nestHeight}`,
  };

  const styles = useStyles(className);

  return (
    <div data-nested={nested} className={styles('wrapper')}>
      {/* horizontal line */}
      <div data-nested={nested} className={styles('horizontalLine')} />
      <Checkbox
        id={label}
        data-nested={nested}
        onCheckedChange={() => onCheck(annotationKey)}
        checked={checked}
        className={styles('checkbox')}
        data-state={checked}
      />
      <label data-nested={nested} className={styles('label')} htmlFor={label}>
        {label}
      </label>
      {/* vertical line for level 1 items with nested values */}
      <div className={styles('verticalLine')} />
    </div>
  );
}
