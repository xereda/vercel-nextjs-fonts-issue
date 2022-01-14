import { Button } from 'antd';

const GhostButton = ({ children, icon }) => (
  <>
    <Button type="link" icon={icon}>{children}</Button>

    <style jsx>{`
      .primary-btn {
        display: flex;
      }
    `}</style>
  </>
);

export default GhostButton;