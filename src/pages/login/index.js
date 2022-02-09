import Image from 'next/image';
import Form from './Form';
import style from './style';

export default function Login() {
  return (
    <section className="login-container">
      <div className="aside-bg">
        <div className="logo">
          <a href="https://www.benvisavale.com.br/">
            <Image src="/svg/icon-ben.svg" alt="Ben Visa Vale" width={70} height={70} />
          </a>
        </div>
        <div className="backgroud">
          <Image src="/png/homebackground.png" alt="Ben Visa Vale" width={410} height={550} />
        </div>
      </div>

      <div className="login-content">
        <div className="login-header">
          <h1 className="title">Login</h1>
          <h2 className="subtitle">Para recursos humanos</h2>
          <p className="label">
            Informe os dados a seguir para acessar seus <b>pedidos</b>,
            gerenciar seus <b> funcionários</b>, <b>notas fiscais</b>
            e muito <b>mais serviços </b>Ben Visa Vale.
            Seu dia a dia mais simples e ágil.
          </p>
        </div>

        <Form />

        <div className="social-content">
          <div className="establishment-area">
            <h1>Você aceita</h1>
            <h2><b>ben</b> visa vale?</h2>
            <p>
              <a href="https://estabelecimento.benvisavale.com.br/painel/login">acesse </a>
              a área para se cadastrar o seu estabelecimento.
            </p>
          </div>
          <div className="costumer-area">
            <h1>Você utiliza</h1>
            <h2><b>ben</b> visa vale?</h2>
            <p>
              <span>baixe</span> nosso app em seu
              smartphone e administre
              seus benefícios do seu jeito.
            </p>
            <div className="app-download">
              <a href="https://play.google.com/store/apps/details?id=br.com.santander.benvisavale&hl=pt_BR">
                <Image src="/svg/google-play.svg" width={120} height={40} alt="Disponível no Google Play" />
              </a>
              <a href="https://apps.apple.com/br/app/ben-visa-vale/id1426592452">
                <Image src="/svg/apple-store.svg" width={110} height={40} alt="Baixar na App Store" />
              </a>
            </div>
          </div>
        </div>
        <footer className="login-footer">
          <div className="ben-info">
            <h3>Ben Benefícios e Serviços S.A.</h3>
            <span>
              Rua Amador Bueno, 474, Bloco I Andar 2 CEP 04752-901,
              São Paulo/SP • CNPJ/MF nº 30.798.783/0001-61
            </span>
          </div>
          <div className="ben-network">
            <a href="https://www.facebook.com/benvisavale/">
              <Image src="/svg/icon-facebook.svg" width={32} height={32} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/benvisavale/?hl=pt-br">
              <Image src="/svg/icon-instagram.svg" width={32} height={32} alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/company/benvisavale/">
              <Image src="/svg/icon-linkedin.svg" width={32} height={32} alt="Linkedin" />
            </a>
          </div>
        </footer>
        <div className="bg-footer"></div>
      </div>

      <style jsx="true">{ style }</style>
    </section>
  );
}