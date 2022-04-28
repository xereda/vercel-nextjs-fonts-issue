import propTypes from 'prop-types';
import LayoutLogin from '@/components/LayoutLogin/LayoutLogin';
import style from './CriarSenha.style';
import Button from '@/components/Button/Button.js';
import PasswordRule from '@/components/PasswordRule/PasswordRule';
import Recaptcha from '@/components/Recaptcha/Recaptcha';
import { isStrongPassword } from '@/utils/format';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useState } from '@hookstate/core';

CreatePassword.propTypes = {
  withRecaptcha: propTypes.bool,
};

CreatePassword.defaultProps = {
  withRecaptcha: process.env.NODE_ENV !== 'development',
};

export default function CreatePassword({ withRecaptcha }) {
  const showPassword = useState(false);
  const recaptchaVerified = useState(withRecaptcha ? false : true);

  const handlePasswordVisibility = () => showPassword.set(!showPassword.value);

  const formik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validate: (values) => {
      const errors = {};
      if (values.password) {
        if (!isStrongPassword(values.password)) {
          errors.password = 'Senha não atende os padrões';
        }
      } else {
        errors.password = 'Campo obrigatório';
      }

      if (values.confirmPassword) {
        if (values.confirmPassword !== values.password) {
          errors.confirmPassword = 'As senhas digitadas não são iguais';
        } else if (errors.password) {
          errors.confirmPassword = 'Senha não atende os padrões';
        }
      } else {
        errors.confirmPassword = 'Campo obrigatório';
      }

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      handleSubmit(values);
    },
  });

  const defineClassPasswordField = () => {
    if (formik.errors.password && formik.touched.password) {
      return 'error-input';
    }

    if (formik.values.password) {
      return 'success-input';
    }

    return '';
  };

  const defineClassConfirmPasswordField = () => {
    if (formik.errors.confirmPassword && formik.touched.confirmPassword) {
      return 'error-input';
    }

    if (formik.values.confirmPassword) {
      return 'success-input';
    }

    return '';
  };

  const disableButton = () => {
    return !formik.isValid || !formik.dirty || !recaptchaVerified.value;
  };

  const handleSubmit = () => {
    console.log('clicou');
  };

  const handleRecaptch = (isVerified) => {
    recaptchaVerified.set(!!isVerified);

    isVerified && formik.validateForm();
  };

  return (
    <LayoutLogin>
      <header className="header">
        <h1 className="title">criar nova senha</h1>
        <h2 className="subtitle">Para recursos humanos</h2>
        <p className="label">
          Para continuar, crie uma nova senha seguindo as orientações abaixo:
        </p>
      </header>

      <PasswordRule
        value={formik.values.password}
        error={formik.errors.password && formik.touched.password}
      />

      <form className="create-password-form" onSubmit={formik.handleSubmit}>
        <div className="fieldset">
          <label htmlFor="password">Criar uma senha</label>
          <input
            required
            autoComplete="password"
            className={`input-field ${defineClassPasswordField()}`}
            type={showPassword.value ? 'password' : 'text'}
            name="password"
            id="password"
            maxLength="15"
            value={formik.values.password}
            placeholder="Insira aqui sua senha"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <div className="eye">
            {showPassword.value ? (
              <EyeOutlined
                onClick={handlePasswordVisibility}
                style={{ color: 'var(--ligth-grey)' }}
              />
            ) : (
              <EyeInvisibleOutlined
                onClick={handlePasswordVisibility}
                style={{ color: 'var(--ligth-grey)' }}
              />
            )}
          </div>

          <span className={`${defineClassPasswordField()}-icon`}></span>

          {formik.touched.password && formik.errors.password && (
            <span className="error-message">{formik.errors.password}</span>
          )}
        </div>
        <div className="fieldset">
          <label htmlFor="confirmPassword">Confirmar senha</label>
          <input
            required
            autoComplete="confirmPassword"
            className={`input-field ${defineClassConfirmPasswordField()}`}
            type={showPassword.value ? 'password' : 'text'}
            name="confirmPassword"
            id="confirmPassword"
            maxLength="15"
            value={formik.values.confirmPassword}
            placeholder="Repita a sua senha"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <div className="eye">
            {showPassword.value ? (
              <EyeOutlined
                onClick={handlePasswordVisibility}
                style={{ color: 'var(--ligth-grey)' }}
              />
            ) : (
              <EyeInvisibleOutlined
                onClick={handlePasswordVisibility}
                style={{ color: 'var(--ligth-grey)' }}
              />
            )}
          </div>

          <span className={`${defineClassConfirmPasswordField()}-icon`}></span>

          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span className="error-message">{formik.errors.confirmPassword}</span>
          )}
        </div>

        {withRecaptcha && <Recaptcha {...{ handleRecaptch }} />}

        <Button isFullWidth type="submit" disabled={disableButton()}>
          Continuar
        </Button>
      </form>

      <style jsx="true">{style}</style>
    </LayoutLogin>
  );
}