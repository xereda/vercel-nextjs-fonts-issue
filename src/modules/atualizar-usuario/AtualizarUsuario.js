import React, { useMemo } from 'react';
import { useState } from '@hookstate/core';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import {
  isDateInFuture,
  isValidDate,
  isValidPhone,
  parseToBrazilianDate,
  toMaskDate,
  toPhoneMask,
} from '@/utils/format';
import { loadingStore, persistSession, sessionStore } from '@/store/index';
import { getErrorMessage } from '@/utils/services';
import Button from '@/components/Button/Button.js';
import LayoutLogin from '@/components/LayoutLogin/LayoutLogin';
import style from './AtualizarUsuario.style';
import { postStatus } from './services.js';

export default function UpdateUser() {
  const router = useRouter();
  const error = useState('');
  const loading = useState(loadingStore);
  const session = useState(sessionStore);

  persistSession(session);

  const usuario = useMemo(() => session?.usuario?.value || {}, [session]);

  const formik = useFormik({
    initialValues: {
      birthdate: `${parseToBrazilianDate(usuario?.dataNascimento)}`,
      phone: `${usuario?.ddd}${usuario?.telefone}`,
      motherName: `${usuario?.nomeMae}`,
    },
    validate: (values) => {
      const errors = {};
      if (values.birthdate) {
        if (
          !isValidDate(values.birthdate) ||
          isDateInFuture(values.birthdate)
        ) {
          errors.birthdate = 'Data inválida';
        }
      } else {
        errors.birthdate = 'Campo obrigatório';
      }

      if (!values.phone) {
        errors.phone = 'Campo obrigatório';
      } else if (!isValidPhone(values.phone)) {
        errors.phone = 'Telefone inválido';
      }

      if (!values.motherName) {
        errors.motherName = 'Campo obrigatório';
      }

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      handleSubmit(values);
    },
  });

  const defineClassBirthField = () => {
    if (formik.errors.birthdate && formik.touched.birthdate) {
      return 'error-input';
    }

    if (formik.values.birthdate) {
      return 'success-input';
    }

    return '';
  };

  const defineClassPhoneField = () => {
    if (formik.errors.phone && formik.touched.phone) {
      return 'error-input';
    }

    if (formik.values.phone) {
      return 'success-input';
    }

    return '';
  };

  const defineClassMotherField = () => {
    if (formik.errors.motherName && formik.touched.motherName) {
      return 'error-input';
    }

    if (formik.values.motherName) {
      return 'success-input';
    }

    return '';
  };

  const handleSubmit = async ({ birthdate, phone, motherName }) => {
    postStatus({
      birthdate,
      phone,
      motherName,
      onStart: () => {
        loading?.set(true);
        error?.set('');
      },
      onSuccess: () => {
        if (session?.gruposEmpresa?.length > 1) {
          router.push('/selecionar-grupo-empresa');
        } else {
          router.push('/dashboard');
        }
      },
      onError: (e) => {
        error?.set(getErrorMessage(e).message);
        loading?.set(false);
      },
      onFinally: () => loading?.set(false),
    });
  };

  const disableUpdateButton = () => {
    return !formik.isValid || !formik.dirty;
  };

  return (
    <LayoutLogin>
      <header className="header">
        <h1 className="title">atualização de dados</h1>
        <p className="label">
          Agora, para manter o nosso ambiente seguro, pedimos que você atualize
          seus dados abaixo. Eles serão utilizados para sua identificação na
          nossa central de atendimento
        </p>
      </header>

      <form className="update-form" onSubmit={formik.handleSubmit}>
        <div className="fieldset">
          <label htmlFor="birthdate">Data de nascimento</label>
          <input
            required
            autoComplete="birthdate"
            className={`input-field ${defineClassBirthField()}`}
            type="text"
            name="birthdate"
            id="birthdate"
            maxLength="10"
            value={toMaskDate(formik.values.birthdate)}
            placeholder="DD/MM/AAAA"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <span className={`${defineClassBirthField()}-icon`}></span>

          {formik.touched.birthdate && formik.errors.birthdate && (
            <span className="error-message">{formik.errors.birthdate}</span>
          )}
        </div>
        <div className="fieldset">
          <label htmlFor="phone">Telefone</label>
          <input
            required
            autoComplete="phone"
            className={`input-field ${defineClassPhoneField()}`}
            type="text"
            name="phone"
            id="phone"
            maxLength="15"
            value={toPhoneMask(formik.values.phone)}
            placeholder="(11) 98888-1111"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <span className={`${defineClassPhoneField()}-icon`}></span>

          {formik.touched.phone && formik.errors.phone && (
            <span className="error-message">{formik.errors.phone}</span>
          )}
        </div>
        <div className="fieldset last-field">
          <label htmlFor="motherName">Nome da mãe</label>
          <input
            required
            autoComplete="motherName"
            className={`input-field ${defineClassMotherField()}`}
            type="motherName"
            name="motherName"
            id="motherName"
            value={formik.values.motherName}
            placeholder="Joana de Paula"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <span className={`${defineClassMotherField()}-icon`}></span>

          {formik.touched.motherName && formik.errors.motherName && (
            <span className="error-message">{formik.errors.motherName}</span>
          )}
        </div>

        <Button isFullWidth type="submit" disabled={disableUpdateButton()}>
          Atualizar
        </Button>
      </form>

      <p className="error" role="error">{error?.value}</p>

      <style jsx="true">{style}</style>
    </LayoutLogin>
  );
}
