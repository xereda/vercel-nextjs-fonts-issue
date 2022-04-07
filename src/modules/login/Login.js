import LayoutLogin from '@/components/LayoutLogin/LayoutLogin';
import Content from './Content';
import Form from './Form';

export default function Login() {
  return (
    <>
      <LayoutLogin>
        <Content>
          <Form />
        </Content>
      </LayoutLogin>

      <style jsx="true">{`
        .login-container {
          display: flex;
        }
      `}</style>
    </>
  );
}
