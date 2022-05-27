import React from 'react';
import propTypes from 'prop-types';
import { Select } from 'antd';
import { format, subDays, subWeeks } from 'date-fns';
import { DownOutlined } from '@ant-design/icons';

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
        placement='bottomLeft'
        defaultValue={status}
        style={{ width: 'auto', color: 'var(--bds-color-blue)' }}
        bordered={false}
        dropdownMatchSelectWidth={220}
        onChange={handleChange}
        suffixIcon={<DownOutlined style={{ color: 'var(--bds-color-blue)' }} />}
      >
        <Option className="antd-select-option" value="">Todas</Option>
        <Option className="antd-select-option" value={today}>Hoje</Option>
        <Option className="antd-select-option" value={yesterday}>Ontem</Option>
        <Option value={oneWeek}>7 dias</Option>
      </Select>
    </div>
  );
}