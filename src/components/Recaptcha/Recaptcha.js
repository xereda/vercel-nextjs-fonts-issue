import propTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';

Recaptcha.propTypes = {
  handleRecaptch: propTypes.func.isRequired,
};

export default function Recaptcha({ handleRecaptch }) {

  return (
    <>
      <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        onChange={handleRecaptch}
        onExpired={handleRecaptch}
        className="captcha-box"
      />

      <style jsx="true">{`
        .captcha-box {
          align-self: center;
        }      
      `}</style>
    </>
  );
}