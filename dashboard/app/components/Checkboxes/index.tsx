'use client';

import { useState, useEffect, useContext } from 'react';
import { POWER_CATEGORIES, STATES } from '@/app/lib/constants';
import { capitalize } from '@/app/lib/utils';

import AppContext from '@/app/context/AppContext';
import Dropdown from './Dropdown';
import { getChecked, getNestedHeight } from './checkboxUtils';
import { Checked } from '@/app/lib/types';
import useStyles from '@/app/hooks/useStyles';

export default function Checkboxes() {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    states: true,
    metrics: false,
  });
  const { dataCategory, showAnnotations, setShowAnnotations } =
    useContext(AppContext);

  const onStates = Object.keys(STATES).filter((state) => state.includes('On'));
  const { keyMetrics } = POWER_CATEGORIES[dataCategory];

  useEffect(() => {
    const updatedShowAnnotations: { [key: string]: boolean } = {};

    if (dataCategory === '') return;

    POWER_CATEGORIES[dataCategory].keyMetrics.forEach((metric: string) => {
      updatedShowAnnotations[metric] = showAnnotations[metric] || false;
    });

    setShowAnnotations(updatedShowAnnotations);
  }, [dataCategory]);

  useEffect(() => {
    if (keyMetrics.length === 0) {
      setExpanded({ ...expanded, metrics: false });
    }
  }, [keyMetrics]);

  const handleShowChange = (label: string) => {
    if (label === 'On') {
      let count = 0;
      for (const key in showAnnotations) {
        if (key.includes('On') && showAnnotations[key]) {
          count++;
        }
      }
      const off = count % 2 === 0;
      setShowAnnotations({
        ...showAnnotations,
        'On - loaded': off,
        'On - idle': off,
        'On - unloaded': off,
      });
    } else if (label === 'All Metrics') {
      const countToStatus: { [key: string]: boolean } = {
        0: true,
        1: false,
        2: false,
        3: true,
        4: false,
      };
      let count = 0;
      for (const metric of keyMetrics) {
        if (showAnnotations[metric]) {
          count++;
        }
      }

      const updatedShowAnnotations: { [key: string]: boolean } = {
        ...showAnnotations,
      };
      POWER_CATEGORIES[dataCategory].keyMetrics.forEach((metric: string) => {
        updatedShowAnnotations[metric] = countToStatus[String(count)];
      });
      setShowAnnotations(updatedShowAnnotations);
    } else {
      setShowAnnotations({
        ...showAnnotations,
        [label]: !showAnnotations[label],
      });
    }
  };

  let onIsChecked: Checked = getChecked(onStates, showAnnotations);

  let allMetricsChecked: Checked = getChecked(keyMetrics, showAnnotations);

  const checkboxData = [
    {
      label: 'Machine States',
      toggled: expanded.states,
      onToggle: () => setExpanded({ ...expanded, states: !expanded.states }),
      checkboxes: [
        {
          label: 'On',
          annotationKey: 'On',
          onCheck: handleShowChange,
          checked: onIsChecked,
          nestedHeight: getNestedHeight(onStates),
          children: onStates.map((state) => ({
            label: capitalize(state.split(' - ')[1]),
            nested: true,
            annotationKey: state,
            onCheck: handleShowChange,
            checked: Boolean(showAnnotations[state]),
          })),
        },
        {
          label: 'Off',
          annotationKey: 'Off',
          onCheck: handleShowChange,
          checked: Boolean(showAnnotations['Off']),
        },
      ],
    },
    {
      label: 'Key Metrics',
      toggled: expanded.metrics,
      onToggle: () => setExpanded({ ...expanded, metrics: !expanded.metrics }),
      checkboxes: [
        {
          label: 'All Metrics',
          annotationKey: 'All Metrics',
          onCheck: handleShowChange,
          checked: allMetricsChecked,
          nestedHeight: getNestedHeight(keyMetrics),
          children: keyMetrics.map((metric: string) => ({
            label: metric,
            nested: true,
            annotationKey: metric,
            onCheck: handleShowChange,
            checked: Boolean(showAnnotations[metric]),
          })),
        },
      ],
    },
  ];

  keyMetrics.length === 0 && checkboxData[1].checkboxes.pop();

  const className = {
    wrapper: 'flex text-left w-[400px] pl-12 gap-x-6 h-max pt-6',
  };

  const styles = useStyles(className);

  return (
    <div className={styles('wrapper')}>
      {checkboxData.map(({ label, toggled, onToggle, checkboxes }) => (
        <Dropdown
          key={label}
          label={label}
          toggled={toggled}
          onToggle={onToggle}
          checkboxes={checkboxes}
        />
      ))}
    </div>
  );
}
