import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './Services/auth.service';
import LoginView from './Components/LoginView';
import RegisterView from './Components/RegisterView';
import EmployerView from './Components/EmployerView';
import CandidateView from './Components/CandidateView';
import UploadDocumentView from './Components/UploadDocumentView';
import EmployerDocumentView from './Components/EmployerDocumentView';
import { history } from './helpers/history';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {LogoutOutlined,DashboardOutlined,MenuFoldOutlined,MenuUnfoldOutlined,UploadOutlined,FileOutlined} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function App(props) {

  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showEmployer, setShowEmployer] = useState(false);
  const [showCandidate, setShowCandidate] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
     const user = JSON.parse(localStorage.getItem('user'));
     setIsLoggedIn(AuthService.isLoggedIn());
     if (user) {
        setCurrentUser(user);
        setShowEmployer(user.roles.includes("ROLE_EMPLOYER"));
        setShowCandidate(user.roles.includes("ROLE_CANDIDATE"));
     }
     else{
        localStorage.clear();
        history.push("/login");
     }
  },[]);

  const toggle = () => {
      setCollapsed(!collapsed);
  };

  const logOut = () => {
     AuthService.logout();
     history.push("/login");
  }

  return (
    <div className="App">
      <Layout style={{minHeight: '100vh'}}>
         {isLoggedIn &&
           <Sider trigger={null} collapsible collapsed={collapsed}>
                <div style={{height: "32px",margin: "16px",color: "white",fontSize: "24px"}}>
                     <div style={{textAlign: "center"}}>{showEmployer ? "Employer" : "Candidate"}</div>
                 </div>
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={['employer','candidate']}
                >
                  {showEmployer &&
                     <Menu.Item key="employer">
                        <Link to="/employer"><DashboardOutlined /><span className="nav-text">Dashboard</span></Link>
                     </Menu.Item>
                  }
                  {showEmployer &&
                     <Menu.Item key="documents">
                        <Link to="/documents"><UploadOutlined /><span className="nav-text">Document</span></Link>
                     </Menu.Item>
                  }
                  {showCandidate &&
                     <Menu.Item key="candidate">
                        <Link to="/candidate"><DashboardOutlined /><span className="nav-text">Dashboard</span></Link>
                     </Menu.Item>
                  }
                  {showCandidate &&
                     <Menu.Item key="uploaddocument">
                        <Link to="/uploadDocument"><FileOutlined /><span className="nav-text">Document</span></Link>
                     </Menu.Item>
                   }
                  <Menu.Item key="Logout">
                       <Link to="/" onClick={() => AuthService.logout()}><LogoutOutlined /><span className="nav-text">Logout</span></Link>
                  </Menu.Item>
                </Menu>
           </Sider>
         }
           <Layout className="site-layout">
              {isLoggedIn &&
                <Header className="site-layout-background" style={{ padding: "0px 20px" }}>
                  {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle,
                    style: {fontSize: "18px"}
                  })}
                </Header>
              }
                <Content style={{margin: "16px"}}
                  className="site-layout-background"
                  style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    backgroundColor: "#f0f2f5"
                  }}
                >
                 <div style={{padding: 20}}>
                  <Routes>
                     <Route exact path="/" element={showEmployer ? <EmployerView/> : <CandidateView/>} />
                     <Route exact path="/employer" element={<EmployerView/>} />
                     <Route exact path="/login" element={<LoginView/>} />
                     <Route exact path="/register" element={<RegisterView/>} />
                     <Route exact path="/candidate" element={<CandidateView/>} />
                     <Route exact path="/uploadDocument" element={<UploadDocumentView />} />
                     <Route exact path="/documents" element={<EmployerDocumentView/>} />
                  </Routes>
                 </div>
                </Content>
           </Layout>
      </Layout>
    </div>
  );
}

export default App;
