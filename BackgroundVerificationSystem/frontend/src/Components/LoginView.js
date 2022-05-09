import React, {Component} from 'react';
import AuthService from "../Services/auth.service";
import { Card, Form, message, Button, Input, Select, Typography } from 'antd';
import {history} from '../helpers/history';
import '../App.css';

const {Text} = Typography;

export default class LoginView extends Component  {

   constructor(props) {
      super(props);

      this.state = {
         submitted: false,
         loading: false,
         loginError: "",
      }

      this.handleSubmit = this.handleSubmit.bind(this);
   }

   componentDidMount() {
      if(AuthService.isLoggedIn()) {
         history.push("/");
         window.location.reload();
      }
   }

   handleSubmit(values) {
      if(!(values.username && values.password)) {
         return
      }

      this.setState({loading: true});
      AuthService.login(values.username,values.password)
      .then(token => {
          history.push("/");
          window.location.reload();
          message.success("Login Successfully");
      }).catch(error => {
           this.setState({
              loginError: "Something went wrong, please try again",
              loading: false
           })
      })
   }

   render() {

   return(
        <Card title={<h2 style={{textAlign: "center"}}>Login</h2>} style={{top: 50,marginLeft: "30%",marginRight: "30%"}}>
          <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={this.handleSubmit}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
          </Form>
          {this.state.loginError && <Text type="danger">{this.state.loginError}</Text>}
        </Card>
   )}
}