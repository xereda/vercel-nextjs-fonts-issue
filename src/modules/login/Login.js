import { useEffect } from 'react';
import propTypes from 'prop-types';
import { useSessionDispatch } from '@/providers/index';
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
  const dispatchSession = useSessionDispatch();

  useEffect(() => {
    dispatchSession({
      type: 'RESET_STATE',
    });
  }, [dispatchSession]);

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
