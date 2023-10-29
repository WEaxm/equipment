import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;
const PageContent = () => {
  return (
    <Content className="container flex justify-center px-16 py-8">
      <Outlet></Outlet>
    </Content>
  );
};

export default PageContent;
