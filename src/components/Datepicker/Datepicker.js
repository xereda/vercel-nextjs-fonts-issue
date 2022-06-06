import React, { useState } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { END_DATE, START_DATE } from 'react-dates/constants';

Datepicker.propTypes = {
  label: propTypes.string.isRequired,
  setRange: propTypes.func.isRequired,
  setShowDatepicker: propTypes.func.isRequired,
};

export default function Datepicker({ label, setRange, setShowDatepicker }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(START_DATE);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (startDate && endDate) {
      setRange({
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
      });
    }
  };

  const isOutsideRange = (day) => {
    if (startDate) {
      return (
        focusedInput === END_DATE &&
        day.isAfter(startDate.clone().add(1, 'month'))
      );
    }

    return false;
  };

  const handleOnClose = () => {
    setShowDatepicker(false);
    if (focusedInput === START_DATE) {
      setRange({
        startDate: '',
        endDate: '',
      });
    }
  };

  return (
    <DateRangePicker
      noBorder
      startDate={startDate}
      startDateId="start-date-id"
      endDate={endDate}
      endDateId="end-date-id"
      onDatesChange={handleDatesChange}
      focusedInput={focusedInput}
      onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      isOutsideRange={isOutsideRange}
      onClose={handleOnClose}
      withPortal={true}
      customInputIcon={label}
      hideKeyboardShortcutsPanel={true}
    />
  );
}
