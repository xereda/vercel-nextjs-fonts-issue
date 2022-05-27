import propTypes from 'prop-types';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
const { Option } = Select;

const getDefaultOption = (options) =>
  options.find((option) => option.default)?.value || options[0].value;

const SelectOptions = ({ options, onChange }) => (
  <Select
    placement='bottomRight'
    defaultValue={getDefaultOption(options)}
    size="large"
    dropdownMatchSelectWidth={180}
    showArrow={options.length > 1}
    onChange={(_, selectedOption) =>
      onChange({
        value: selectedOption.value,
        label: selectedOption.children,
      })
    }
  >
    {options.map((option, index) => (
      <Option key={index} value={option.value}>
        {option.label}
      </Option>
    ))}
  </Select>
);

SelectOptions.propTypes = {
  options: propTypes.array.isRequired,
  onChange: propTypes.func.isRequired,
};

InputOptions.propTypes = {
  options: propTypes.array.isRequired,
  onType: propTypes.func.isRequired,
  onChangeOption: propTypes.func,
  value: propTypes.string,
  placeholder: propTypes.string,
  width: propTypes.string,
};

InputOptions.defaultProps = {
  placeholder: '',
  value: '',
  width: '320px',
  onChangeOption: () => null,
};

export default function InputOptions({
  value,
  options,
  placeholder,
  width,
  onChangeOption,
  onType,
}) {
  return (
    <Input
      size="large"
      style={{ width }}
      defaultValue={value}
      placeholder={placeholder}
      onChange={debounce((event) => onType(event?.target?.value || ''), 500)}
      prefix={<SearchOutlined />}
      addonAfter={<SelectOptions options={options} onChange={onChangeOption} />}
    />
  );
}
