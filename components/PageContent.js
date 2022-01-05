import { PageHeader } from "antd";

export default function PageContent({title, onBack, children}) {
  return (
    <div className="page-content">
      <header className="header-wrapper">
        <PageHeader
          className="page-header"
          onBack={onBack}
          title={title}
        />
      </header>
      <div className="content-wrapper">
        {children}
      </div>

      <style jsx>{`
        .header-wrapper {
          display: flex;
          -webkit-box-pack: justify;
          justify-content: space-between;
          flex-direction: column;
          padding-bottom: 24px;
          border-bottom: 0px;
        }
        .content-wrapper {
          padding: 0 24px;
        }
      `}</style>
    </div>
  )
}