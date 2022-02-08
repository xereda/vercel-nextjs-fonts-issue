import propTypes from 'prop-types';
import { Modal } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import style from './CancelOrderModal.style';

CancelOrderModal.propTypes = {
  handleCloseModal: propTypes.func.isRequired,
};

export default function CancelOrderModal({ handleCloseModal }) {

  const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px 60px',
    minHeight: '370px',
    marginTop: '3rem',
  };

  return (
    <>
      <Modal
        visible
        onOk={() => console.log('continuar')}
        onCancel={handleCloseModal}
        okText="Continuar"
        cancelText="Sair"
        width={600}
        bodyStyle={modalStyle}
      >
        <div className="warning-icon">
          <WarningOutlined style={{fontSize: '3.5rem', color: '#E1E1E1'}}/>
        </div>
        <p className="modal-header-title">Tem certeza que deseja cancelar o pedido que está sendo processado?</p>
        <p className="modal-content">
          (Importante: Se você realizar o cancelamento
          após às 23h - Horário de Brasília, será cobrado
          o valor dos cartões solicitados)
        </p>
      </Modal>
      <style jsx="true">{style}</style>
    </>
  );
}