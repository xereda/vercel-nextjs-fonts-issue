import Image from 'next/image';
import propTypes from 'prop-types';

InsideLoading.propTypes = {
  loading: propTypes.bool.isRequired,
  children: propTypes.node,
  minHeight: propTypes.string,
};

InsideLoading.defaultProps = {
  children: null,
  minHeight: 'auto',
};

export default function InsideLoading({ loading, children, minHeight }) {
  return loading ? (
    <>
      <div role="Loading" className="wrapper-loading">
        <Image
          width={72}
          height={72}
          src="/gif/logo-animado-ben-transparente.gif"
          alt="Logo da Ben - loading"
        />
      </div>
      <style jsx="true">{`
        .wrapper-loading {
          width: 100%;
          height: 100%;
          min-height: ${minHeight};
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  ) : (
    children
  );
}
