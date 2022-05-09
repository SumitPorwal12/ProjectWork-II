import React, {useState,useEffect} from 'react';
import UserService from "../Services/user.service";
import { Card, Form, message, Button, Input, Select, Typography, Upload } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {history} from '../helpers/history';
import '../App.css';

const {Text} = Typography;

export default function UploadDocumentView(props)  {

   const [form] = Form.useForm();

   useEffect(() => {

   },[]);

   const handleSubmit = (values) => {
      let formData = new FormData();

      formData.append("name", values.name);
      formData.append("file", values["file"].file);

      UserService.uploadDocument(formData)
      .then(token => {
          form.resetFields();
          message.success("Document Uploaded Successfully");
      }).catch(error => {
          message("Something went wrong");
      })
   }

   return(
        <Card title={<h2 style={{textAlign: "center"}}>Upload Document</h2>} style={{width: "60%"}}>
          <Form
                name="basic"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={handleSubmit}
                autoComplete="off"
              >
                <Form.Item
                  label="Document Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input your document name!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                   label="Upload Document"
                   name="file"
                   rules={[{ required: true, message: 'Please upload document!' }]}
                >
                   <Upload name="document" listType="picture-card" beforeUpload={() => false} maxCount={1} >
                      <div>
                         <PlusOutlined />
                         <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                   </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
          </Form>
        </Card>
   )
}