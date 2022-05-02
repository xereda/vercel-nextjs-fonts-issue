import Link from 'next/link';
import style from './FeedbackSuccess.style';
import { CheckCircleOutlined } from '@ant-design/icons';

export default function FeedbackSuccess() {
  return (
    <div className="feedback-success">
      <CheckCircleOutlined
        style={{ fontSize: '50px', color: 'var(--green)' }}
      />
      <span className="message">
        Senha foi criada com sucesso!
      </span>

      <span className="disclaimer">
        Agora é só fazer login para voltar a usar os recursos
        que o <strong>Ben</strong> tem para gerenciar suas vendas
      </span>

      <Link href="/">
        <a className="back-to-login">Fazer login</a>
      </Link>

      <style jsx="true">{style}</style>
    </div>
  );
}