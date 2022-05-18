import { useState } from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useLoadingState, useSessionState } from '@/store/index';
import { isValidCPF, toCPFMask } from '@/utils/format';
import { authenticate } from './services.js';
import { getErrorMessage } from '@/utils/services';
import Recaptcha from '@/components/Recaptcha/Recaptcha';
import style from './Form.style.js';
import Button from '@/components/Button/Button.js';

Form.propTypes = {
  withRecaptcha: propTypes.bool,
};

Form.defaultProps = {
  withRecaptcha: process.env.NODE_ENV === 'production',
};

export default function Form({ withRecaptcha }) {
  const router = useRouter();
  const [error, setError] = useState('');

  const [, setSession] = useSessionState();
  const [, setLoading] = useLoadingState();

  const updateSessionState = (payload) => {
    console.log(payload);
    setSession(payload);
  };

  const [recaptchaVerified, setRecaptchaVerified] = useState(
    withRecaptcha ? false : true,
  );

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
        setLoading(true);
        setError('');
      },
      onSuccess: (session) => {
        console.log('onSuccess login:', { session });
        updateSessionState(session);

        if (session.usuarioAceitouTermos) {
          if (
            session.usuario.dataNascimento &&
            session.usuario.telefone &&
            session.usuario.nomeMae
          ) {
            if (session?.gruposEmpresa?.length > 1) {
              router.push('/selecionar-grupo-empresa');
            } else {
              router.push('/dashboard');
            }
          } else {
            router.push('/atualizar-usuario');
          }
        } else {
          router.push('/termo-privacidade');
        }
      },
      onError: (e) => {
        setError(getErrorMessage(e).message);
        setLoading(false);
      },
      onFinally: () => setLoading(false),
    });
  };

  const handleRecaptch = (isVerified) => {
    setRecaptchaVerified(!!isVerified);

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
    return !formik.isValid || !formik.dirty || !recaptchaVerified;
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
      <p className="integration-error">{error}</p>
      <Button isFullWidth type="submit" disabled={disableSubmitButton()}>
        Fazer login
      </Button>
      <div className="password-recovery">
        <Link href="/recuperar-senha">
          <a className="forgot-password">Esqueceu sua senha?</a>
        </Link>
      </div>
      <style jsx="true">{style}</style>
    </form>
  );
}
