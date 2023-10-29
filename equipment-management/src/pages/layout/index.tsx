import PageContent from '@/components/page-content';
import PageHeader from '@/components/page-header';
import { Layout } from 'antd';

const PageLayout = () => {
  return (
    <Layout className="container h-full bg-light-200">
      <PageHeader></PageHeader>
      <PageContent></PageContent>
    </Layout>
  );
};
export default PageLayout;
