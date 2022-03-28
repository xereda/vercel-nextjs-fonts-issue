import React from 'react';
import propTypes from 'prop-types';
import Image from 'next/image';
import style from './Content.style';

Content.propTypes = {
  children: propTypes.node.isRequired,
};

export default function Content({ children }) {

  return (
    <>
      <header className="login-header">
        <h1 className="title">Login</h1>
        <h2 className="subtitle">Para recursos humanos</h2>
        <p className="label">
          Informe os dados a seguir para acessar seus <b>pedidos</b>,{` `}
          gerenciar seus <strong>funcionários</strong>,{` `}
          <strong>notas fiscais</strong> e muito{` `}
          <strong>mais serviços</strong>. Ben Visa Vale.{` `}
          Seu dia a dia mais simples e ágil.
        </p>
      </header>

      {children}

      <div className="social-content">
        <div className="establishment-area">
          <h1>Você aceita</h1>
          <h2>
            <b>ben</b> visa vale?
          </h2>
          <p>
            <a href="https://estabelecimento.benvisavale.com.br/painel/login">
              acesse{' '}
            </a>
            a área para se cadastrar o seu estabelecimento.
          </p>
        </div>
        <div className="costumer-area">
          <h1>Você utiliza</h1>
          <h2>
            <b>ben</b> visa vale?
          </h2>
          <p>
            <span>baixe</span> nosso app em seu smartphone
            e administre seus benefícios do seu jeito.
          </p>
          <div className="app-download">
            <a href="https://play.google.com/store/apps/details?id=br.com.santander.benvisavale&hl=pt_BR">
              <Image
                src="/svg/google-play.svg"
                width={120}
                height={40}
                alt="Disponível no Google Play"
              />
            </a>
            <a href="https://apps.apple.com/br/app/ben-visa-vale/id1426592452">
              <Image
                src="/svg/apple-store.svg"
                width={110}
                height={40}
                alt="Baixar na App Store"
              />
            </a>
          </div>
        </div>
      </div>

      <style jsx="true">{style}</style>
    </>
  );
}
