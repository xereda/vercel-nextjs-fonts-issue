import Image from 'next/image';
import style from './Footer.style';

export default function Footer() {
  return (
    <>
      <footer className="login-footer">
        <div className="ben-info">
          <h3>Ben Benefícios e Serviços S.A.</h3>
          <span>
            Rua Amador Bueno, 474, Bloco I Andar 2 CEP 04752-901, São Paulo/SP
            • CNPJ/MF nº 30.798.783/0001-61
          </span>
        </div>
        <div className="ben-network">
          <a href="https://www.facebook.com/benvisavale/">
            <Image
              src="/svg/icon-facebook.svg"
              width={32}
              height={32}
              alt="Facebook"
            />
          </a>
          <a href="https://www.instagram.com/benvisavale/?hl=pt-br">
            <Image
              src="/svg/icon-instagram.svg"
              width={32}
              height={32}
              alt="Instagram"
            />
          </a>
          <a href="https://www.linkedin.com/company/benvisavale/">
            <Image
              src="/svg/icon-linkedin.svg"
              width={32}
              height={32}
              alt="Linkedin"
            />
          </a>
        </div>
      </footer>
      <div className="bg-footer"></div>

      <style jsx="true">{style}</style>
    </>
  );
}