import propTypes from 'prop-types';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

DropdownButton.propTypes = {
  label: propTypes.string.isRequired,
  hasAction: propTypes.bool,
  color: propTypes.string,
  handleAction: propTypes.func,
  labelAction: propTypes.string,
};

DropdownButton.defaultProps = {
  handleAction: () => null,
  color: '--bds-color-black-lighter',
  hasAction: false,
  labelAction: '',
};

export default function DropdownButton({
  label,
  color,
  hasAction,
  handleAction,
  labelAction,
}) {
  return (
    <>
      {hasAction ? (
        <Dropdown
          arrow
          overlay={
            <Menu
              onClick={() => handleAction(true)}
              items={[{ key: 0, label: labelAction }]}
            />
          }
          trigger={['click']}
          placement="bottomLeft"
        >
          <a role="button" onClick={(e) => e.preventDefault()}>
            {label} <DownOutlined />
          </a>
        </Dropdown>
      ) : (
        <span>{label}</span>
      )}
      <style jsx="true">
        {`
          a,
          span {
            color: var(${color});
            font-size: 14px;
            font-weight: bold;
            overflow: hidden;
          }
        `}
      </style>
    </>
  );
}
