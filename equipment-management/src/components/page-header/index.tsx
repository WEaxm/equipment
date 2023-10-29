import { MailOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, MenuTheme } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const { Header } = Layout;

const items: MenuProps['items'] = [
  {
    label: <Link to="/">Equipment</Link>,
    key: 'mail',
    icon: <MailOutlined />,
  },
];

const PageHeader: React.FC = () => {
  const [current, setCurrent] = useState('mail');
  const theme: MenuTheme = 'dark';
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <Header>
      <Menu
        theme={theme}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </Header>
  );
};

export default PageHeader;
