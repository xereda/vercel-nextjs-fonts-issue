import Link from 'next/link';
import style from './FeedbackSuccess.style';

export default function FeedbackSuccess() {
  return (
    <div className="feedback-success">
      <span className="message">
        Enviamos um e-mail para a criação da sua nova senha.
      </span>

      <span className="divider"></span>

      <span className="disclaimer">
        Caso exista algum problema com
        seu email, entre em contato com o
        usuário administrador da sua empresa.
      </span>

      <Link href="/">
        <a className="back-to-login">Voltar</a>
      </Link>

      <style jsx="true">{style}</style>
    </div>
  );
}