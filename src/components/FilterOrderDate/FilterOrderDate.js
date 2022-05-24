import React from 'react';
import propTypes from 'prop-types';
import { Select } from 'antd';
import { format, subDays, subWeeks } from 'date-fns';

const { Option } = Select;

const formatDate = (date) => format(date, 'yyyy-MM-dd');

FilterOrderDate.propTypes = {
  onClickFilter: propTypes.func.isRequired,
  status: propTypes.string.isRequired,
};

export default function FilterOrderDate({ onClickFilter, status }) {
  const today = formatDate(new Date());
  const yesterday = formatDate(subDays(new Date(), 1));
  const oneWeek = formatDate(subWeeks(new Date(), 1));

  const handleChange = async (value) => {
    onClickFilter(value);
  };

  return (
    <div>
      <span>Data de criação:</span>
      <Select
        defaultValue={status}
        style={{ width: 'auto', color: 'var(--bds-color-blue)' }}
        bordered={false}
        dropdownMatchSelectWidth={220}
        onChange={handleChange}
      >
        <Option value="">Todas</Option>
        <Option value={today}>Hoje</Option>
        <Option value={yesterday}>Ontem</Option>
        <Option value={oneWeek}>7 dias</Option>
      </Select>
    </div>
  );
}