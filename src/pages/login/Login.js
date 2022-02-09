import Aside from './Aside';
import Content from './Content';
import Form from './Form';

export default function Login() {
  return (
    <>
      <section className="login-container">
        <Aside />
        <Content>
          <Form />
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