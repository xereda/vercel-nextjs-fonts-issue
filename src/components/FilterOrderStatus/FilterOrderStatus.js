import React from 'react';
import propTypes from 'prop-types';
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';

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
        listHeight={600}
        defaultValue={status}
        style={{ width: 'auto', color: 'var(--bds-color-blue)' }}
        bordered={false}
        dropdownMatchSelectWidth={263}
        onChange={handleChange}
        suffixIcon={<DownOutlined style={{ color: 'var(--bds-color-blue)' }} />}
      >
        <Option className="antd-select-option" value="">Todos</Option>
        <Option className="antd-select-option" value="VALIDANDO_ARQUIVO">Validando arquivo</Option>
        <Option className="antd-select-option" value="PROCESSANDO">Processando</Option>
        <Option className="antd-select-option" value="AGUARDANDO_CONFIRMACAO">Aguardando confirmação</Option>
        <Option className="antd-select-option" value="CONCLUIDO">Concluído</Option>
        <Option className="antd-select-option" value="INVALIDADO">Invalidado</Option>
        <Option className="antd-select-option" value="CANCELADO">Cancelado</Option>
        <Option value="CANCELADO_PARCIAL">Cancelado parcial</Option>
      </Select>
    </div>
  );
}