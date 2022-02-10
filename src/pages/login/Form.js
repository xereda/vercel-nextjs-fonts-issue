import { useFormik } from 'formik';
import { useState } from 'react';
import { toCPFMask, isValidCPF } from '@/utils/format';
import Button from '@/components/Button/Button.js';
import Recaptcha from '@/components/Recaptcha/Recaptcha';
import style from './Form.style.js';

export default function LoginForm() {

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const formik = useFormik({
    initialValues: { cpf: '', password: '' },
    validate: values => {
      const errors = {};

      if (!values.cpf) {

        errors.cpf = 'Campo obrigatório';
        errors.hasError = true;
      } else if (

        !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(values.cpf) ||
        !isValidCPF(values.cpf)
      ) {

        errors.cpf = 'O CPF digitado não é valido.';
        errors.hasError = true;
      }

      if (!values.password) {

        errors.password = 'Campo obrigatório';
        errors.hasError = true;
      }

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  const handleRecaptch = isVerified => {
    setIsCaptchaVerified(!!isVerified);

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

  const disableSubmitButton = () =>
    formik.errors.hasError ||
    !formik.dirty ||
    !isCaptchaVerified;

  return (
    <form className="login-form" onSubmit={formik.handleSubmit}>
      <div className="fieldset">
        <label htmlFor="cpf">CPF</label>
        <input
          required
          autoComplete='cpf'
          className={`input-field ${defineClassCpfField()}`}
          type="text"
          name="cpf"
          maxLength='14'
          value={toCPFMask(formik.values.cpf)}
          placeholder="Digite seu CPF"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />

        <span className={`${defineClassCpfField()}-icon`}></span>

        {formik.touched.cpf && formik.errors.cpf &&
          <span className="error-message">{formik.errors.cpf}</span>
        }
      </div>
      <div className="fieldset">
        <label htmlFor="password">Senha</label>
        <input
          autoComplete='current-password'
          className={`input-field ${defineClassPasswordField()}`}
          type="password"
          name="password"
          value={formik.values.password}
          placeholder="Digite sua senha"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <span className={`${defineClassPasswordField()}-icon`}></span>

        {formik.touched.password && formik.errors.password &&
          <span className="error-message">{formik.errors.password}</span>
        }
      </div>

      <Recaptcha {...{handleRecaptch}} />

      <div>
        <Button isFullWidth type="submit" disabled={disableSubmitButton()} arial-label="submit-login">
          Fazer login
        </Button>
      </div>

      <div className="password-recovery">
        <button className="forgot-password">Esqueceu sua senha?</button>
      </div>

      <style jsx="true">{style}</style>
    </form>
  );
}
