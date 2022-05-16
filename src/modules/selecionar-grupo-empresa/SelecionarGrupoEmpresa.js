import React, { useMemo } from 'react';
import Layout from '@/components/Layout/Layout';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { useState } from '@hookstate/core';
import { loadingStore, sessionStore } from '@/store/index';
import { getErrorMessage } from '@/utils/services';
import { selectGroup } from './services';
import style from './SelecionarGrupoEmpresa.style';

export default function SelecionarGrupoEmpresa() {
  const session = useState(sessionStore);
  const router = useRouter();
  const error = useState('');
  const loading = useState(loadingStore);

  const gruposEmpresa = useMemo(() =>
    session?.gruposEmpresa?.value || {}, [session]);

  const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
    minHeight: '370px',
    marginTop: '3rem',
  };

  const onSelectGroup = async (grupoEmpresa) => {
    selectGroup({
      grupoEmpresa,
      onStart: () => {
        loading?.set(true);
        error?.set('');
      },
      onSuccess: (parametros) => {
        session.merge({ grupoEmpresa, parametros });
        router.push('/dashboard');
      },
      onError: (e) => {
        error?.set(getErrorMessage(e).message);
        loading?.set(false);
      },
      onFinally: () => loading?.set(false),
    });
  };

  return (
    <Layout>
      <Modal
        closable={false}
        keyboard={false}
        visible
        width={400}
        bodyStyle={modalStyle}
        footer={null}
      >
        <p className="modal-header-title">
          Escolha o grupo que deseja acessar:
        </p>
        <p className="error" role="error">
          {error?.value}
        </p>
        <div className="modal-content">
          {gruposEmpresa.map((grupoEmpresa, index) =>
            <button
              className="group-item"
              onClick={() => onSelectGroup(grupoEmpresa)}
              key={index}
            >
              {grupoEmpresa.nomeGrupo}
              <ArrowRightOutlined />
            </button>)}
        </div>
      </Modal>

      <style jsx="true">{style}</style>
    </Layout>
  );
}
