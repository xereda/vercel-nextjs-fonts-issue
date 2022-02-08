import propTypes from 'prop-types';
import { SWRConfig } from 'swr';

RenderWithoutSWRCache.propTypes = {
  children: propTypes.node.isRequired,
};

export default function RenderWithoutSWRCache({ children }) {

  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      {children}
    </SWRConfig>
  );
}