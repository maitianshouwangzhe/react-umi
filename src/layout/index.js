// 注意这里我们除了从antd中引入了Layout布局组件，还引入了Menu菜单组件，Icon图标组件

import { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link'

const { Header, Footer, Sider, Content } = Layout;

// 引入子菜单组件
const SubMenu = Menu.SubMenu;

export default class BasicLayout extends Component {
    render() {
        return (
            <Layout>
                <Sider width={256} style={{ minHeight: '100vh' }}>
                    <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/helloworld">
                                <Icon type="home" />
                                <span>首页---hello world</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="dashboard" /><span>仪表板</span></span>}
                        >
                            <Menu.Item key="2"><Link to="/dashboard/analysis">分析页</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/dashboard/monitor">监控页</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/dashboard/workplace">工作台</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="5">
                            <Link to="/puzzlecards">
                                <Icon type="github" />
                                <span>puzzlecards（配置代理）</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to="/list">
                                <Icon type="ordered-list" />
                                <span>表格--表单--图表</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to="/cards">
                                <Icon type="google" />
                                <span>卡片cards</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/users">
                                <Icon type="user" />
                                <span>用户管理</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout >
                    <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}
