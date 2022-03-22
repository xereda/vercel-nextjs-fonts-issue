import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';
import { loadingStore, sessionStore } from '@/store/index';
import { isValidCPF, toCPFMask } from '@/utils/format';
import Button from '@/components/Button/Button.js';
import Recaptcha from '@/components/Recaptcha/Recaptcha';
import style from './Form.style.js';
import { authenticate } from './services.js';
import { getErrorMessage } from '@/utils/services';

Form.propTypes = {
  withRecaptcha: propTypes.bool,
};

Form.defaultProps = {
  withRecaptcha: true,
};

export default function Form({ withRecaptcha }) {
  const router = useRouter();
  const error = useState('');

  const session = useState(sessionStore);
  const loading = useState(loadingStore);

  if (typeof window !== 'undefined') {
    session.attach(Persistence('session'));
  }

  const updateSessionState = (payload) => {
    console.log(payload);

    session.set(payload);

    router.push('/dashboard');
  };

  const recaptchaVerified = useState(withRecaptcha ? false : true);

  const formik = useFormik({
    initialValues: { cpf: '', password: '' },
    validate: (values) => {
      const errors = {};

      if (!values.cpf) {
        errors.cpf = 'Campo obrigatório';
      } else if (!isValidCPF(values.cpf)) {
        errors.cpf = 'O CPF digitado não é valido.';
      }

      if (!values.password.trim()) {
        errors.password = 'Campo obrigatório';
      }

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      handleLogin(values);
    },
  });

  const handleLogin = ({ cpf, password }) => {
    authenticate({
      cpf,
      password,
      onStart: () => {
        loading.set(true);
        error.set('');
      },
      onSuccess: (session) => {
        console.log('onSuccess login:', { session });

        updateSessionState(session);
      },
      onError: (e) => {
        error.set(getErrorMessage(e).message);
        loading.value(false);
      },
      onFinally: console.log('FINALLY'),
    });
  };

  const handleRecaptch = (isVerified) => {
    recaptchaVerified.set(!!isVerified);

    isVerified && formik.validateForm();
  };

  const defineClassCpfField = () => {
    if (formik.errors.cpf && formik.touched.cpf) {
      return 'error-input';
    }

    if (formik.values.cpf) {
      return 'success-input';
    }

    return '';
  };

  const defineClassPasswordField = () => {
    if (formik.errors.password && formik.touched.password) {
      return 'error-input';
    }

    if (formik.values.password) {
      return 'success-input';
    }

    return '';
  };

  const disableSubmitButton = () => {
    return !formik.isValid || !formik.dirty || !recaptchaVerified.value;
  };

  return (
    <form className="login-form" onSubmit={formik.handleSubmit}>
      <div className="fieldset">
        <label htmlFor="cpf">CPF</label>
        <input
          required
          autoComplete="cpf"
          className={`input-field ${defineClassCpfField()}`}
          type="text"
          name="cpf"
          id="cpf"
          maxLength="14"
          value={toCPFMask(formik.values.cpf)}
          placeholder="Digite seu CPF"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />

        <span className={`${defineClassCpfField()}-icon`}></span>

        {formik.touched.cpf && formik.errors.cpf && (
          <span className="error-message">{formik.errors.cpf}</span>
        )}
      </div>
      <div className="fieldset">
        <label htmlFor="password">Senha</label>
        <input
          autoComplete="current-password"
          className={`input-field ${defineClassPasswordField()}`}
          type="password"
          name="password"
          id="password"
          value={formik.values.password}
          placeholder="Digite sua senha"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <span className={`${defineClassPasswordField()}-icon`}></span>

        {formik.touched.password && formik.errors.password && (
          <span className="error-message">{formik.errors.password}</span>
        )}
      </div>
      {withRecaptcha && <Recaptcha {...{ handleRecaptch }} />}
      <p className="integration-error">{error.value}</p>
      <Button isFullWidth type="submit" disabled={disableSubmitButton()}>
        Fazer login
      </Button>
      <div className="password-recovery">
        <button className="forgot-password">Esqueceu sua senha?</button>
      </div>
      <style jsx="true">{style}</style>
    </form>
  );
}
