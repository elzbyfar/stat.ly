'use client';
import { useContext } from 'react';
import { POWER_CATEGORIES } from '@/app/lib/constants';
import AppContext from '@/app/context/AppContext';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectPortal,
} from '@/app/components/ui/select';
import useStyles from '@/app/hooks/useStyles';

const ActiveDataSelector = () => {
  const { dataCategory, setDataCategory } = useContext(AppContext);

  const className = {
    trigger:
      'inline-flex items-center text-right rounded-md px-4 text-[12px] leading-6 gap-1 bg-white text-zinc-700 shadow-[0_2px_10px_#00000040] w-52',
    triggerHover: 'hover:bg-zinc-50',
    triggerFocus: 'focus:shadow-[0_0_2px_#000000]',
    content: 'overflow-hidden bg-white rounded-md',
    contentShadow:
      'shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)]',
    viewport: 'py-2 px-[2px]',
    item: 'text-[12px] leading-3 text-zinc-700 rounded-[3px] flex items-center h-6 pr-4 pl-2 relative select-none data-[highlighted=true]:bg-blue-200',
    itemDisabled:
      'data-[disabled=true]:text-violet-300 data-[disabled=true]:pointer-events-none',
  };

  const styles = useStyles(className);

  return (
    <Select
      onValueChange={(value: string) => setDataCategory(value)}
      defaultValue={dataCategory}
      value={dataCategory}
    >
      <SelectTrigger
        className={styles('trigger')}
        aria-label="Power Categories"
      >
        <SelectValue placeholder="Categories" />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent className={styles('content')}>
          <SelectViewport className={styles('viewport')}>
            {Object.entries(POWER_CATEGORIES).map(([category, { title }]) => (
              <SelectItem
                key={category}
                data-highlighted={category === dataCategory}
                className={styles('item')}
                value={category}
              >
                {title}
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default ActiveDataSelector;
