import React, {useState,useEffect} from 'react';
import '../App.css';
import UserService from "../Services/user.service";
import { Card, Form, message, Button, Input, Select, Typography, Upload, Row, Col, Table } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {history} from '../helpers/history';

export default function EmployerDocumentView(props) {

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
           },
           {
              title: "Action",
              dataIndex: "name",
              key: "action",
              width: "250px",
              render: (text,record) =>
                 <span>
                   <Button type="primary" style={{marginRight: "10px"}} onClick={() => updateDocumentStatus(record.id,"Approve")}>
                       Approve
                   </Button>
                   <Button type="primary" danger onClick={() => updateDocumentStatus(record.id,"Reject")}>
                       Reject
                   </Button>
                 </span>
           }
    ]

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        UserService.getAllDocuments()
        .then(res => {
           setDocuments(res.data);
        }).catch(err => {
           message.error("Something went wrong");
        })
    },[])

    const updateDocumentStatus = (id,status) => {
        UserService.updateDocumentStatus(id,status).then(res => {
           window.location.reload();
           message.success("Updated Successfully");
        }).catch(err => {
           message.error("Something went wrong");
        })
    }

    return(
           <Row>
              <Col lg={24}>
                 <h2 style={{marginBottom: "10px"}}>Total Uploaded Documents : {documents.length}</h2>
                 <Table dataSource={documents} columns={columns} rowKey="id" pagination={{showSizeChanger: true}} sticky />
              </Col>
           </Row>
    )
}