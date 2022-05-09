import React, {useState,useEffect} from 'react';
import '../App.css';
import UserService from "../Services/user.service";
import { Card, Form, message, Button, Input, Select, Typography, Upload, Row, Col, Table } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {history} from '../helpers/history';

export default function EmployerView(props) {

   const columns = [
      {
         title: "Name",
         dataIndex: "name",
         key: "name"
      },
      {
         title: "Email",
         dataIndex: "email",
         key: "email"
      },
      {
         title: "UserName",
         dataIndex: "username",
         key: "name"
      },
      {
         title: "Role",
         dataIndex: "roles",
         key: "roles",
         render: (text,record) =>
             <div>{record.roles[0].name}</div>
      }
   ]

   const [users, setUsers] = useState([]);

   useEffect(() => {
       UserService.getAllUsers().then(res => {
          setUsers(res.data);
       }).catch(err => {
          message.error("Something went wrong");
       })
   },[])

   return(
       <Row>
          <Col lg={24}>
             <h2 style={{marginBottom: "10px"}}>Total Users : {users.length}</h2>
             <Table dataSource={users} columns={columns} rowKey="id" pagination={{showSizeChanger: true}} sticky />
          </Col>
       </Row>
   )
}