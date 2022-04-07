import propTypes from 'prop-types';
import { PageHeader } from 'antd';
import style from './PageContent.style';

PageContent.propTypes = {
  title: propTypes.string.isRequired,
  onBack: propTypes.func,
  children: propTypes.node.isRequired,
};

PageContent.defaultProps = {
  onBack: null,
};

export default function PageContent({ title, onBack, children }) {
  return (
    <div className="page-content">
      <header className="header-wrapper">
        <PageHeader className="page-header" onBack={onBack} title={title} />
      </header>
      <div className="content-wrapper">{children}</div>

      <style jsx="true">{style}</style>
    </div>
  );
}
