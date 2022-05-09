import React, {useState,useEffect} from 'react';
import '../App.css';
import UserService from "../Services/user.service";
import { Card, Form, message, Button, Input, Select, Typography, Upload, Row, Col, Table } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {history} from '../helpers/history';

export default function CandidateView(props) {

    const columns = [
       {
          title: "Document Name",
          dataIndex: "name",
          key: "name"
       },
       {
          title: "Uploaded By",
          dataIndex: "uploadedBy",
          key: "uploadedBy"
       },
       {
          title: "Uploaded On",
          dataIndex: "uploadedOn",
          key: "uploadedOn"
       },
       {
          title: "Status",
          dataIndex: "status",
          key: "status"
       },
       {
          title: "Document",
          dataIndex: "documentPath",
          key: "documentPath",
          render: (text,record) =>
             <div>
               <a href={record.documentPath} target="_blank" rel="noreferrer">
                 View Document
               </a>
             </div>
       }
    ]

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        UserService.getDocumentByUploadedUser()
        .then(res => {
           setDocuments(res.data);
        }).catch(err => {
           message.error("Something went wrong");
        })
    },[])

    return(
           <Row>
              <Col lg={24}>
                 <h2 style={{marginBottom: "10px"}}>Uploaded Documents : {documents.length}</h2>
                 <Table dataSource={documents} columns={columns} rowKey="id" pagination={{showSizeChanger: true}} sticky />
              </Col>
           </Row>
    )
}