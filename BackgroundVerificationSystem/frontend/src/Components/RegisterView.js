import React, {Component} from 'react';
import AuthService from "../Services/auth.service";
import { Card, Form, message, Button, Input, Select } from 'antd';
import '../App.css';
import {history} from '../helpers/history';

const { Option } = Select;

export default class RegisterView extends Component  {

   constructor(props) {
      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);
   }

   componentDidMount() {

   }

   handleSubmit(values) {
      console.log("hi");
      this.setState({loading: true});
      let roles = Array.of(values.role);
      AuthService.register(values.name,values.username,values.email,values.password,roles)
      .then(token => {
          history.push("/login");
          window.location.reload();
          message.success("Registered Successfully");
      }).catch(error => {
           message.error("Something went wrong");
      })
   }

   render() {

   return(
        <Card title={<h2 style={{textAlign: "center"}}>Register</h2>} style={{top: 50,marginLeft: "30%",marginRight: "30%"}}>
          <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={this.handleSubmit}
                autoComplete="off"
              >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                     <Input />
                </Form.Item>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Select
                       allowClear
                       style={{ width: '100%' }}
                       placeholder="Please select Role"
                    >
                       <Option value="ROLE_EMPLOYER">EMPLOYER</Option>
                       <Option value="ROLE_CANDIDATE">CANDIDATE</Option>
                    </Select>
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
                    Sign Up
                  </Button>
                </Form.Item>
          </Form>
        </Card>
   )}
}