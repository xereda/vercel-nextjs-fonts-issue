import propTypes from 'prop-types';
import InsideLoading from '../Loading/InsideLoading';

FeedbackPlaceholder.propTypes = {
  isLoading: propTypes.bool,
  hasError: propTypes.bool,
  noData: propTypes.bool,
  minHeight: propTypes.string,
  children: propTypes.node.isRequired,
};

FeedbackPlaceholder.defaultProps = {
  isLoading: false,
  hasError: false,
  noData: false,
  minHeight: 'auto',
};

export default function FeedbackPlaceholder({
  isLoading,
  hasError,
  noData,
  minHeight,
  children,
}) {
  if (isLoading) return <InsideLoading loading {...{ minHeight }} />;
  if (hasError && !isLoading) return 'error';
  if (!hasError && !isLoading && noData) return 'no data';

  return children;
}
