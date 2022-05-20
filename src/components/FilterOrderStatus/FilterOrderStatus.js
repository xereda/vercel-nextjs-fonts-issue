import React from 'react';
import propTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

FilterOrderStatus.propTypes = {
  onClickFilter: propTypes.func.isRequired,
  status: propTypes.string.isRequired,
};

export default function FilterOrderStatus({ onClickFilter, status }) {

  const handleChange = async (value) => {
    onClickFilter(value);
  };

  return (
    <div>
      <span>Status:</span>
      <Select
        defaultValue={status}
        style={{ width: 'auto', color: 'var(--bds-color-blue)' }}
        bordered={false}
        dropdownMatchSelectWidth={220}
        onChange={handleChange}
      >
        <Option value="">Todos</Option>
        <Option value="VALIDANDO_ARQUIVO">Validando arquivo</Option>
        <Option value="PROCESSANDO">Processando</Option>
        <Option value="AGUARDANDO_CONFIRMACAO">Aguardando confirmação</Option>
        <Option value="CONCLUIDO">Concluído</Option>
        <Option value="INVALIDADO">Invalidado</Option>
        <Option value="CANCELADO">Cancelado</Option>
        <Option value="CANCELADO_PARCIAL">Cancelado parcial</Option>
      </Select>
    </div>
  );
}