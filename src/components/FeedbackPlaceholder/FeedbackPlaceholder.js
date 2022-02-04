import PropTypes from 'prop-types';

FeedbackPlaceholder.propTypes = {
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  noContent: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

FeedbackPlaceholder.defaultProps = {
  isLoading: false,
  hasError: false,
  noContent: false,
};

export default function FeedbackPlaceholder({
  isLoading,
  hasError,
  noContent,
  children,
}) {

  if (isLoading) return 'loading...';
  if (hasError && !isLoading ) return 'error';
  if (!hasError && !isLoading && noContent) return 'no content';

  return children;
}