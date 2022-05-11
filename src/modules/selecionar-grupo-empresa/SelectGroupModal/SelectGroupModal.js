import React, { useMemo } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from '@hookstate/core';
import { sessionStore } from '@/store/index';
import style from './SelectGroupModal.style';

export default function SelectGroupModal() {
  const session = useState(sessionStore);

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

  return (
    <>
      <Modal
        closable={false}
        keyboard={false}
        visible
        width={400}
        bodyStyle={modalStyle}
        footer={null}
      >
        <p className="modal-header-title">Escolha o grupo que deseja acessar:</p>
        <div className="modal-content">
          {gruposEmpresa.map((grupo, index) =>
            <button
              className="group-item"
              onClick={() => console.log('clicou')}
              key={index}
            >
              {grupo.nomeGrupo}
              <ArrowRightOutlined />
            </button>)}
        </div>
      </Modal>
      <style jsx="true">{style}</style>
    </>
  );
}