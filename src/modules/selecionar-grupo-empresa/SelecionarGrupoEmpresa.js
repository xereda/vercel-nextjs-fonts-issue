import React, { useEffect, useMemo } from 'react';
import Layout from '@/components/Layout/Layout';
import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { useState } from '@hookstate/core';
import { loadingStore, persistSession, sessionStore } from '@/store/index';
import { getErrorMessage } from '@/utils/services';
import { selectGroup } from './services';
import style from './SelecionarGrupoEmpresa.style';

export default function SelecionarGrupoEmpresa() {
  const session = useState(sessionStore);
  const router = useRouter();
  const error = useState('');
  const loading = useState(loadingStore);
  const mounted = useState(false);

  persistSession(session);

  const gruposEmpresa = useMemo(() =>
    session?.gruposEmpresa?.value || [], [session]);

  const hasCurrentGroup = session?.grupoEmpresa?.value;

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mounted.set(true), []);

  if (!mounted.value) return null;

  return (
    <Layout>
      <Modal
        closable={!!hasCurrentGroup}
        keyboard={false}
        visible
        width={400}
        bodyStyle={modalStyle}
        footer={null}
        onCancel={() => router.back()}
      >
        <p className="modal-header-title">
          Escolha o grupo que deseja acessar:
        </p>
        <p className="error" role="error">
          {error?.value}
        </p>
        <div className="modal-content">
          {gruposEmpresa.map((grupoEmpresa, index) => {

            const selected =
              grupoEmpresa.id === session?.grupoEmpresa?.value?.id;

            return (
              <button
                className="group-item"
                onClick={() => onSelectGroup(grupoEmpresa)}
                key={index}
                selected={selected}
                disabled={selected}
              >
                {grupoEmpresa.nomeGrupo}

                {selected ? <CheckOutlined /> : <ArrowRightOutlined />}
              </button>
            );
          })}

        </div>
      </Modal>

      <style jsx="true">{style}</style>
    </Layout>
  );
}
