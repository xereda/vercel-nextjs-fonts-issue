import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { useLoadingState, useSessionState } from '@/store/index';
import ClientOnly from '@/components/ClientOnly/ClientOnly';
import { getErrorMessage } from '@/utils/services';
import { selectGroup } from './services';
import style from './SelecionarGrupoEmpresa.style';

export default function SelecionarGrupoEmpresa() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [, setLoading] = useLoadingState();
  const [session, , mergeSession] = useSessionState();
  const gruposEmpresa = session?.gruposEmpresa?.value || [];
  const selectedGroupCompany = session?.grupoEmpresa?.value || {};
  const groupCompanyIsSelected = !!session?.grupoEmpresa?.value?.id;

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
        setLoading(true);
        setError('');
      },
      onSuccess: (parametros) => {
        mergeSession({ grupoEmpresa, parametros });
        router.push('/dashboard');
      },
      onError: (e) => {
        setError(getErrorMessage(e).message);
        setLoading(false);
      },
      onFinally: () => setLoading(false),
    });
  };

  return (
    <Layout>
      <ClientOnly>
        <Modal
          closable={groupCompanyIsSelected}
          keyboard={false}
          maskClosable={false}
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
            {error}
          </p>
          <div className="modal-content">
            {gruposEmpresa.map((grupoEmpresa, index) => {
              const isSelected = grupoEmpresa.id === selectedGroupCompany.id;

              return (
                <button
                  className="group-item"
                  onClick={() => onSelectGroup(grupoEmpresa)}
                  key={index}
                  selected={isSelected}
                  disabled={isSelected}
                >
                  {grupoEmpresa.nomeGrupo}

                  {isSelected ? <CheckOutlined /> : <ArrowRightOutlined />}
                </button>
              );
            })}
          </div>
        </Modal>
      </ClientOnly>

      <style jsx="true">{style}</style>
    </Layout>
  );
}
