import React, { useState } from 'react';
import propTypes from 'prop-types';
import ptBR from 'date-fns/locale/pt-BR';
import { Select } from 'antd';
import { format, parseISO, subDays, subWeeks } from 'date-fns';
import { DownOutlined } from '@ant-design/icons';
import Datepicker from '../Datepicker/Datepicker';

const { Option } = Select;

const formatDate = (date) => format(date, 'yyyy-MM-dd');

FilterOrderDate.propTypes = {
  startDate: propTypes.string.isRequired,
  endDate: propTypes.string.isRequired,
  selectedOption: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  onChangeDates: propTypes.func.isRequired,
};

export default function FilterOrderDate({
  startDate,
  endDate,
  selectedOption,
  onChangeDates,
  onChange,
}) {
  const [showDatepicker, setShowDatepicker] = useState(false);

  const dates = {
    today: formatDate(new Date()),
    yesterday: formatDate(subDays(new Date(), 1)),
    oneWeek: formatDate(subWeeks(new Date(), 1)),
  };

  const handleChange = async (value) => {
    onChange(value);
    if (value !== 'period') {
      onChangeDates({
        startDate: dates[value] || '',
        endDate: format(new Date(), 'yyyy-MM-dd'),
      });
    }
  };

  const formatDateString = () => {
    if (startDate && endDate) {
      const defaultStartDate = parseISO(startDate);
      const defaultEndDate = parseISO(endDate);
      const formattedStartDate = format(defaultStartDate, 'dd MMM yy', {
        locale: ptBR,
      });
      const formattedEndDate = format(defaultEndDate, 'dd MMM yy', {
        locale: ptBR,
      });

      return `${formattedStartDate} - ${formattedEndDate}`;
    }

    return '';
  };

  return (
    <div>
      <span>Data de criação:</span>
      <Select
        placement="bottomLeft"
        value={
          selectedOption === 'period' ? formatDateString() : selectedOption
        }
        style={{ width: 'auto', color: 'var(--bds-color-blue)' }}
        bordered={false}
        dropdownMatchSelectWidth={220}
        listHeight={320}
        onChange={handleChange}
        suffixIcon={<DownOutlined style={{ color: 'var(--bds-color-blue)' }} />}
      >
        <Option className="antd-select-option" value="">
          Todas
        </Option>
        <Option className="antd-select-option" value="today">
          Hoje
        </Option>
        <Option className="antd-select-option" value="yesterday">
          Ontem
        </Option>
        <Option className="antd-select-option" value="oneWeek">
          7 dias
        </Option>
        <Option
          className="antd-select-option-highlight"
          value="period"
          onMouseDown={() => setShowDatepicker(true)}
        >
          Selecionar período
        </Option>
      </Select>

      {showDatepicker && (
        <div className="datepicker">
          <Datepicker
            label=""
            setRange={onChangeDates}
            setShowDatepicker={setShowDatepicker}
          />
        </div>
      )}

      <style jsx="true">{`
        .datepicker {
          display: none;
        }
      `}</style>
    </div>
  );
}
