import propTypes from 'prop-types';
import Aside from './Aside';
import Content from './Content';
import Form from './Form';

Login.propTypes = {
  withRecaptcha: propTypes.bool,
};

Login.defaultProps = {
  withRecaptcha: true,
};

export default function Login({ withRecaptcha }) {
  return (
    <>
      <section className="login-container">
        <Aside />
        <Content>
          <Form {...{ withRecaptcha }} />
        </Content>
      </section>

      <style jsx="true">{`
        .login-container {
          display: flex;
        }
      `}</style>
    </>
  );
}
