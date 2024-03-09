import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { CheckboxDropdownProps, TriggerProps } from '@/app/lib/types';
import { Button } from '../ui/button';
import CheckboxTree from './CheckboxTree';
import useStyles from '@/app/hooks/useStyles';

export default function Dropdown({
  label,
  toggled,
  onToggle,
  checkboxes,
}: CheckboxDropdownProps) {
  let rootBranchHeight;
  if (label === 'Machine States') {
    rootBranchHeight = 'data-[expanded=true]:h-[114px]';
  } else if (label === 'Key Metrics') {
    rootBranchHeight = 'data-[expanded=true]:h-4';
  }

  const className = {
    wrapper: 'relative',
    horizontalLine: `w-[1px] absolute top-8 left-4 bg-zinc-400 transition-all ease-in-out duration-100 ${rootBranchHeight} h-0`,
    treeWrapper:
      'flex flex-col gap-y-1 ml-4 transition-all ease-in-out duration-100 overflow-hidden data-[expanded=true]:h-[120px] h-0 w-max',
  };

  const styles = useStyles(className);

  return (
    <div className={styles('wrapper')}>
      <Trigger
        toggled={toggled}
        onToggle={onToggle}
        label={label}
        disabled={checkboxes.length === 0}
      />
      <div data-expanded={toggled} className={styles('horizontalLine')} />
      <div data-expanded={toggled} className={styles('treeWrapper')}>
        <CheckboxTree data={checkboxes} />
      </div>
    </div>
  );
}

function Trigger({ toggled, onToggle, label, disabled }: TriggerProps) {
  const className = {
    button:
      'inline-flex justify-between items-center text-right rounded-md pl-4 pr-3 text-[12px] gap-1 bg-white text-zinc-700 shadow-[0_2px_10px_#00000040] w-36 mb-2 py-1 h-8',
    buttonToggled: 'data-[toggled=true]:shadow-[0_0_2px_#000000]',
    buttonHover: 'hover:bg-zinc-50',
    chevron: 'w-3 h-3',
  };

  const styles = useStyles(className);
  return (
    <Button
      data-toggled={toggled}
      disabled={disabled}
      className={styles('button')}
      onClick={() => onToggle(!toggled)}
    >
      {label}
      {toggled ? (
        <ChevronDownIcon className={styles('chevron')} />
      ) : (
        <ChevronUpIcon className={styles('chevron')} />
      )}
    </Button>
  );
}
