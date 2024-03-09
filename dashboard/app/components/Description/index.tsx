'use client';

import { useContext } from 'react';
import { POWER_CATEGORIES } from '@/app/lib/constants';
import AppContext from '@/app/context/AppContext';
import useStyles from '@/app/hooks/useStyles';

export default function Description() {
  const { dataCategory } = useContext(AppContext);

  const className = {
    wrapper: 'flex flex-col gap-y-4 mt-8 text-left',
    title: 'text-[1.75rem] leading-6 font-bold',
    description: 'text-md w-[35rem]',
  };

  const styles = useStyles(className);

  return (
    <div className={styles('wrapper')}>
      <h1 className={styles('title')}>
        {POWER_CATEGORIES[dataCategory].title}
      </h1>
      <p className={styles('description')}>
        {POWER_CATEGORIES[dataCategory].description}
      </p>
    </div>
  );
}
