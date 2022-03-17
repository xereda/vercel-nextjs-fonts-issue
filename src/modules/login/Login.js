import { useEffect } from 'react';
import { useSessionDispatch } from '@/providers/index';
import Aside from './Aside';
import Content from './Content';
import Form from './Form';

export default function Login() {
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
          <Form withRecaptcha={false} />
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
