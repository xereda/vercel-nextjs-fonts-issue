import LayoutLogin from '@/components/LayoutLogin/LayoutLogin';
import propTypes from 'prop-types';
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
      <LayoutLogin>
        <Content>
          <Form {...{ withRecaptcha }} />
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
