import propTypes from 'prop-types';
import LayoutLogin from '@/components/LayoutLogin/LayoutLogin';
import style from './RecuperarSenha.style';
import Button from '@/components/Button/Button.js';
import Recaptcha from '@/components/Recaptcha/Recaptcha';
import { loadingStore } from '@/store/index';
import { getErrorMessage } from '@/utils/services';
import { isValidCPF, isValidEmail, toCPFMask } from '@/utils/format';
import { useFormik } from 'formik';
import { useState } from '@hookstate/core';
import { recoverPassword } from './services.js';
import FeedbackSuccess from './FeedbackSuccess';

RecuperarSenha.propTypes = {
  withRecaptcha: propTypes.bool,
};

RecuperarSenha.defaultProps = {
  withRecaptcha: process.env.NODE_ENV === 'production',
};

export default function RecuperarSenha({ withRecaptcha }) {
  const error = useState('');
  const loading = useState(loadingStore);
  const recaptchaVerified = useState(withRecaptcha ? false : true);
  const hasSuccess = useState(false);

  const formik = useFormik({
    initialValues: { cpf: '', email: '' },
    validate: (values) => {
      const errors = {};
      if (!values.cpf) {
        errors.cpf = 'Campo obrigatório';
      } else if (!isValidCPF(values.cpf)) {
        errors.cpf = 'O CPF digitado não é valido.';
      }

      if (!values.email) {
        errors.email = 'Campo obrigatório';
      } else if (!isValidEmail(values.email)) {
        errors.email = 'O e-mail não é valido.';
      }

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      handleSubmit(values);
    },
  });

  const defineClassCpfField = () => {
    if (formik.errors.cpf && formik.touched.cpf) {
      return 'error-input';
    }

    if (formik.values.cpf) {
      return 'success-input';
    }

    return '';
  };

  const defineClassEmailField = () => {
    if (formik.errors.email && formik.touched.email) {
      return 'error-input';
    }

    if (formik.values.email) {
      return 'success-input';
    }

    return '';
  };

  const disableButton = () => {
    return !formik.isValid || !formik.dirty || !recaptchaVerified.value;
  };

  const handleSubmit = async ({ cpf, email }) => {
    recoverPassword({
      cpf,
      email,
      onStart: () => {
        loading?.set(true);
        error?.set('');
      },
      onSuccess: () => {
        hasSuccess.set(true);
      },
      onError: (e) => {
        error?.set(getErrorMessage(e).message);
        loading?.set(false);
      },
      onFinally: () => loading?.set(false),
    });
  };

  const handleRecaptch = (isVerified) => {
    recaptchaVerified.set(!!isVerified);

    isVerified && formik.validateForm();
  };

  return (
    <LayoutLogin>
      <header className="header">
        <h1 className="title">recuperar senha</h1>
        <h2 className="subtitle">Para recursos humanos</h2>
        <p className="label">
          Para que você possa acessar seus <b>pedidos</b>, gerenciar seus{' '}
          <b>funcionários</b>, <b>notas fiscais</b> e muito <b>mais serviços</b>{' '}
          Ben Visa Vale, nós precisamos do seu CPF e e-mail cadastrado.
        </p>
      </header>

      {!hasSuccess.value ? (
        <form className="recover-password-form" onSubmit={formik.handleSubmit}>
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
              placeholder="Insira o seu CPF aqui"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            <span className={`${defineClassCpfField()}-icon`}></span>

            {formik.touched.cpf && formik.errors.cpf && (
              <span className="error-message">{formik.errors.cpf}</span>
            )}
          </div>
          <div className="fieldset">
            <label htmlFor="email">E-mail</label>
            <input
              required
              autoComplete="email"
              className={`input-field ${defineClassEmailField()}`}
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              placeholder="Insira o seu e-mail"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            <span className={`${defineClassEmailField()}-icon`}></span>

            {formik.touched.email && formik.errors.email && (
              <span className="error-message">{formik.errors.email}</span>
            )}
          </div>

          {withRecaptcha && <Recaptcha {...{ handleRecaptch }} />}

          <p className="error" role="error">
            {error?.value}
          </p>

          <Button isFullWidth type="submit" disabled={disableButton()}>
            Continuar
          </Button>
        </form>
      ) : (
        <FeedbackSuccess />
      )}

      <style jsx="true">{style}</style>
    </LayoutLogin>
  );
}
