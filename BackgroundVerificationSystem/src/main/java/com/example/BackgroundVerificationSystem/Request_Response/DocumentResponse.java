package com.example.BackgroundVerificationSystem.Request_Response;

import com.example.BackgroundVerificationSystem.Model.Document;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class DocumentResponse {

    private Long id;
    private String name;
    private String uploadedBy;
    private Date uploadedOn;
    private String approvedBy;
    private String status;
    private String documentPath;

    public DocumentResponse(Document document){
        this.id = document.getId();
        this.name = document.getName();
        this.uploadedBy = document.getUploadedBy().getUsername();
        if(document.getApprovedBy() != null){
            this.approvedBy = document.getApprovedBy().getUsername();
        }
        this.uploadedOn = document.getUploadedOn();
        this.status = document.getStatus().name();
        this.documentPath = document.getDocumentPath();
    }
}
