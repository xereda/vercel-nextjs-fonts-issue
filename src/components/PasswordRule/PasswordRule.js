import React from 'react';
import Image from 'next/image';
import propTypes from 'prop-types';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import style from './PasswordRule.style';

PasswordRule.propTypes = {
  value: propTypes.string.isRequired,
  error: propTypes.bool,
};

PasswordRule.defaultProps = {
  error: false,
};

export default function PasswordRule ({ value, error }) {
  const minimumNumber = RegExp(/.{8,15}/).test(value);
  const uppercase = RegExp(/^(?=.*?[A-Z])/).test(value);
  const lowercase = RegExp(/(?=.*?[a-z])/).test(value);
  const number = RegExp(/(?=.*?[0-9])/).test(value);
  const specialCharacter = RegExp(/(?=.*?[#?!@$%^&*-])/).test(value);

  return (
    <div className="password-tips">
      <Image
        src="/svg/icon-ben-heart.svg"
        alt="Ben Visa Vale"
        width={24}
        height={24}
      />
      <span className="form-title">
        <strong>lembre-se que sua senha precisa ter ao menos:</strong>
      </span>

      <ul className="tip">
        {minimumNumber ? (
          <li className="success-label" id="min-caracter">
            Mínimo 8 e máximo 15 caracteres <CheckOutlined />
          </li>
        ) : (
          <li className={error ? 'error-label' : 'label'} id="min-caracter">
            Mínimo 8 e máximo 15 caracteres {error ? <CloseOutlined /> : ''}
          </li>
        )}

        {uppercase ? (
          <li className="success-label" id="uma-maiscula">
            Uma letra maiúscula <CheckOutlined />
          </li>
        ) : (
          <li className={error ? 'error-label' : 'label'} id="uma-maiscula">
            Uma letra maiúscula {error ? <CloseOutlined /> : ''}
          </li>
        )}
      </ul>

      <ul className="tip">
        {lowercase ? (
          <li className="success-label" id="uma-minuscula">
            Uma letra minúscula <CheckOutlined />
          </li>
        ) : (
          <li className={error ? 'error-label' : 'label'} id="uma-minuscula">
            Uma letra minúscula {error ? <CloseOutlined /> : ''}
          </li>
        )}

        {specialCharacter ? (
          <li className="success-label" id="caracter-especial">
            Um caractere especial (Exemplo: @ # * & % $) <CheckOutlined />
          </li>
        ) : (
          <li className={error ? 'error-label' : 'label'} id="caracter-especial">
            Um caractere especial (Exemplo: @ # * & % $) {error ? <CloseOutlined /> : ''}
          </li>
        )}

        {number ? (
          <li className="success-label" id="um-numero">
            Um número <CheckOutlined />
          </li>
        ) : (
          <li className={error ? 'error-label' : 'label'} id="um-numero">
            Um número {error ? <CloseOutlined /> : ''}
          </li>
        )}

      </ul>

      <style jsx="true">{style}</style>
    </div>
  );
};