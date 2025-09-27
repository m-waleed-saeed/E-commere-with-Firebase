import React, { useState } from 'react';
import {
  UserOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, Avatar, Dropdown, Space, ConfigProvider } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardRoutes from './Routes';
import { useAuthContext } from '../../contexts/Auth'; 

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, handleLogout } = useAuthContext();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();

  // Custom dark theme configuration
  const darkTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#BB86FC',
      colorBgBase: '#121212',
      colorBgContainer: '#1E1E1E',
      colorText: '#FFFFFF',
      colorTextSecondary: '#BBBBBB',
      colorBorder: '#2D2D2D',
      colorBgLayout: '#121212',
      borderRadius: 8,
      borderRadiusLG: 12,
      fontSize: 16,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    components: {
      Layout: {
        headerBg: '#121212',
        headerPadding: '0 24px',
        bodyBg: 'transparent',
        footerBg: '#121212',
        siderBg: '#121212',
      },
      Menu: {
        itemBg: 'transparent',
        itemHoverBg: 'rgba(187, 134, 252, 0.1)',
        itemActiveBg: 'rgba(187, 134, 252, 0.2)',
        itemSelectedBg: 'rgba(187, 134, 252, 0.15)',
        itemSelectedColor: '#BB86FC',
      },
      Button: {
        defaultHoverBg: 'rgba(255, 255, 255, 0.08)',
        defaultHoverBorderColor: '#BB86FC',
        defaultHoverColor: '#BB86FC',
        primaryShadow: '0 0 15px rgba(187, 134, 252, 0.3)',
      }
    }
  };

  const menuItems = [
    // Removed Admin Info dashboard link
    {
      key: '/dashboard/orders',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/dashboard/orders">Orders</Link>,
    },
    {
      key: '/dashboard/users',
      icon: <TeamOutlined />,
      label: <Link to="/dashboard/users">Users</Link>,
    },
    {
      key: 'products',
      icon: <AppstoreOutlined />,
      label: 'Products',
      children: [
        {
          key: '/dashboard/all-product-details',
          label: <Link to="/dashboard/all-product-details">Product Details</Link>,
        },
        {
          key: '/dashboard/add-product',
          label: <Link to="/dashboard/add-product">Add Product</Link>,
        },
      ],
    },
    {
      key: '/dashboard/newsletter-list',
      icon: <BellOutlined />,
      label: <Link to="/dashboard/newsletter-list">News Letters</Link>,
    },
  ];

  const dropdownItems = [
    {
      key: 'user-info',
      label: (
        <div style={{ padding: '12px 16px', width: 300 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <Avatar
              size={64}
              src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
              icon={<UserOutlined />}
              style={{
                backgroundColor: 'rgba(187, 134, 252, 0.2)',
                color: darkTheme.token.colorPrimary,
                marginRight: 12
              }}
            />
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{user?.fullName || 'Admin User'}</div>
              <div style={{ color: darkTheme.token.colorTextSecondary, fontSize: 14 }}>{user?.email}</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 8,
            padding: 12,
            marginBottom: 12
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: darkTheme.token.colorTextSecondary }}>Role:</span>
              <span style={{ fontWeight: 500 }}>{user?.role || 'Admin'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: darkTheme.token.colorTextSecondary }}>Joined:</span>
              <span>
                {user?.createdAt?.toDate().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'logout',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LogoutOutlined style={{ marginRight: 8 }} />
          <span>Logout</span>
        </div>
      ),
      onClick: () => {
        handleLogout();
        navigate('/auth/login');
      }
    }
  ];

  return (
    <ConfigProvider theme={darkTheme}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          collapsedWidth={0}
          trigger={null}
          width={250}
          breakpoint="lg"
          style={{
            background: darkTheme.token.colorBgBase,
            borderRight: `1px solid ${darkTheme.token.colorBorder}`
          }}
        >
          <div className="demo-logo-vertical" style={{
            padding: '16px 24px',
            color: darkTheme.token.colorPrimary,
            fontSize: '1.25rem',
            fontWeight: 700,
            borderBottom: `1px solid ${darkTheme.token.colorBorder}`
          }}>
            {!collapsed && 'Admin Dashboard'}
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ background: 'transparent', padding: '8px 0' }}
          />
        </Sider>

        <Layout>
          <Header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: darkTheme.token.colorBgBase,
            borderBottom: `1px solid ${darkTheme.token.colorBorder}`,
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 1
          }}>
            <Space>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
                style: {
                  fontSize: '20px',
                  color: darkTheme.token.colorText,
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  ':hover': {
                    color: darkTheme.token.colorPrimary,
                    backgroundColor: 'rgba(187, 134, 252, 0.1)'
                  }
                }
              })}
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: darkTheme.token.colorPrimary
              }}>
                Admin Portal
              </span>
            </Space>

            <Space size="large">
              <Dropdown
                menu={{ items: dropdownItems }}
                placement="bottomRight"
                trigger={['click']}
                overlayStyle={{
                  background: darkTheme.token.colorBgContainer,
                  borderRadius: darkTheme.token.borderRadiusLG,
                  border: `1px solid ${darkTheme.token.colorBorder}`,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                }}
              >
                <Space
                  style={{
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    transition: 'all 0.2s'
                  }}
                  className="hover-effect"
                >
                  <Avatar
                    src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                    icon={<UserOutlined />}
                    style={{
                      backgroundColor: 'rgba(187, 134, 252, 0.2)',
                      color: darkTheme.token.colorPrimary
                    }}
                  />
                  <span style={{ fontWeight: 500 }}>{user?.fullName || 'Admin User'}</span>
                </Space>
              </Dropdown>
            </Space>
          </Header>

          <Content style={{ overflow: 'initial' }}>
            <div
              style={{
                padding: 10,
                minHeight: 360,
                background: darkTheme.token.colorBgContainer,
                border: `1px solid ${darkTheme.token.colorBorder}`,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              <DashboardRoutes />
            </div>
          </Content>

          <Footer style={{
            textAlign: 'center',
            borderTop: `1px solid ${darkTheme.token.colorBorder}`,
            background: darkTheme.token.colorBgBase
          }}>
            Admin Dashboard ©{new Date().getFullYear()}
            <span style={{ color: darkTheme.token.colorPrimary, marginLeft: '4px' }}>
              Created by Muhammad Waleed
            </span>
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Dashboard;