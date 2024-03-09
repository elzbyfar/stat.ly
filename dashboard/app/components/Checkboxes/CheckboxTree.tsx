import React, { Fragment } from 'react';
import { CheckboxTreeProps } from '@/app/lib/types';
import CheckboxBranch from './CheckboxBranch';

export default function CheckboxTree({ data }: { data: CheckboxTreeProps[] }) {
  return data.map((item) => {
    const { children } = item;
    return (
      <Fragment key={item.label}>
        <CheckboxBranch
          nested={item.nested}
          nestHeight={item.nestedHeight}
          label={item.label}
          annotationKey={item.annotationKey}
          onCheck={item.onCheck}
          checked={item.checked}
        />
        {children && children.length ? <CheckboxTree data={children} /> : null}
      </Fragment>
    );
  });
}
