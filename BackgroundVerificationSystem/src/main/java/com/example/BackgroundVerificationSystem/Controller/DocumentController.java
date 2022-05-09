package com.example.BackgroundVerificationSystem.Controller;

import com.example.BackgroundVerificationSystem.Model.Document;
import com.example.BackgroundVerificationSystem.Request_Response.DocumentRequest;
import com.example.BackgroundVerificationSystem.Request_Response.DocumentResponse;
import com.example.BackgroundVerificationSystem.Service.DocumentService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class DocumentController {

    @Autowired
    DocumentService documentService;

    @PostMapping("/uploadDocument")
    @PreAuthorize("hasRole('CANDIDATE')")
    public void uploadDocument(@ModelAttribute DocumentRequest documentRequest, @RequestParam(name="file") MultipartFile file){
        documentService.uploadDocument(documentRequest,file);
    }

    @GetMapping("/documents")
    @PreAuthorize("hasRole('EMPLOYER')")
    public List<DocumentResponse> getAllDocuments(){
        return documentService.getAllDocuments();
    }

    @GetMapping("/documentByUploadedUser")
    @PreAuthorize("hasRole('CANDIDATE')")
    public List<DocumentResponse> getDocumentByUploadedUser(){
        return documentService.getDocumentByUploadedUser();
    }

    @GetMapping("/updateDocumentStatus/{id}")
    @PreAuthorize("hasRole('CANDIDATE')")
    public void updateDocumentUStatus(@PathVariable("id") Long id,@RequestParam String status){
        documentService.updateDocumentStatus(id,status);
    }

}
