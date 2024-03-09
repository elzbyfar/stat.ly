'use client';

import React, { LegacyRef } from 'react';
import { useContext } from 'react';
import DatePicker from 'react-datepicker';
import AppContext from '@/app/context/AppContext';
import useStyles from '@/app/hooks/useStyles';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateSelector() {
  const { selectedDate, setSelectedDate } = useContext(AppContext);

  const handleDateChange = (date: Date) => {
    const trimmed = date.toISOString().split('T')[0];
    setSelectedDate(trimmed);
  };

  const className = {
    input:
      'text-left rounded-md text-zinc-700 shadow-[0_2px_10px_#00000040] hover:bg-zinc-50 focus:shadow-[0_0_2px_#000000]',
  };

  const styles = useStyles(className);

  return (
    <label>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => handleDateChange(date)}
        customInput={
          <CustomInputWithIcon value={selectedDate} onClick={() => {}} />
        }
        className={styles('input')}
      />
    </label>
  );
}

const CustomInputWithIcon = React.forwardRef(
  ({ value, onClick }: { value: string; onClick: () => void }, ref) => {
    const className = {
      wrapper:
        'input-group flex px-4 py-[6px] text-[14px] text-left items-center rounded-md text-zinc-700 shadow-[0_2px_10px_#00000040] focus:shadow-[0_0_2px_#000000] bg-white w-52',
      wrapperHover: 'hover:bg-zinc-50',
    };
    const styles = useStyles(className);
    return (
      <div className={styles('wrapper')}>
        <input
          type="text"
          className="form-control w-40"
          value={value}
          onClick={onClick}
          readOnly
          ref={ref as LegacyRef<HTMLInputElement>}
        />
        <div className="input-group-append w-5">
          <span className="input-group-text">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="1"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                  d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                  stroke="#3f3f46"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{' '}
              </g>
            </svg>
          </span>
        </div>
      </div>
    );
  },
);
