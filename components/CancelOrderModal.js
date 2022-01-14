import { useState } from 'react';
import { Modal, Button } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

export default function CancelOrderModal() { 
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('Modal fechará depois de 2 segundos');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicou no botão Cancelar');
    setVisible(false);
  };
  return (
    <>
      <a className="cancel-order" onClick={showModal}>Cancelar Pedido</a>
      <Modal
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Continuar"
        cancelText="Cancelar"
        width={600}
        bodyStyle={
          {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "40px 60px",
            minHeight: "370px",
            marginTop: "3rem"
          }
        }
      >
        <div className="warning-icon">
          <WarningOutlined style={{fontSize: "3.5rem", color: "#E1E1E1"}}/>
        </div>
        <p className="modal-header-title">Tem certeza que deseja cancelar o pedido que está sendo processado?</p>
        <p className="modal-content">
          (Importante: Se você realizar o cancelamento
          após às 23h - Horário de Brasília, será cobrado
          o valor dos cartões solicitados)
        </p>
      </Modal>

      <style jsx>{`
        a, a:hover {
          color: var(--lightBlack);
        }
        .warning-icon {
          margin: 30px 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-header-title {
          font-weight: 600;
          line-height: 26px;
          font-size: 16px;
          text-align: center
        }
        .modal-content {
          font-size: 12px;
          text-align: center;
          letter-spacing: 0.1px;
        }
      `}</style>
    </>
  )
}