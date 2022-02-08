import propTypes from 'prop-types';

FeedbackPlaceholder.propTypes = {
  isLoading: propTypes.bool,
  hasError: propTypes.bool,
  noData: propTypes.bool,
  children: propTypes.node.isRequired,
};

FeedbackPlaceholder.defaultProps = {
  isLoading: false,
  hasError: false,
  noData: false,
};

export default function FeedbackPlaceholder({
  isLoading,
  hasError,
  noData,
  children,
}) {

  if (isLoading) return 'loading...';
  if (hasError && !isLoading ) return 'error';
  if (!hasError && !isLoading && noData) return 'no data';

  return children;
}