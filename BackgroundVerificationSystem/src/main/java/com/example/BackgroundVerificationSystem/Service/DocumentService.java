package com.example.BackgroundVerificationSystem.Service;

import com.example.BackgroundVerificationSystem.Enum.DocumentStatus;
import com.example.BackgroundVerificationSystem.Model.Document;
import com.example.BackgroundVerificationSystem.Repository.DocumentRepository;
import com.example.BackgroundVerificationSystem.Request_Response.DocumentRequest;
import com.example.BackgroundVerificationSystem.Request_Response.DocumentResponse;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    @Autowired
    UserService userService;
    
    @Autowired
    DocumentRepository documentRepository;
    
    @Value("${file.upload-dir}")
    private String uploadDirPath;

    public void uploadDocument(DocumentRequest documentRequest, MultipartFile file){
        Document document = new Document();
        document.setName(documentRequest.getName());
        document.setUploadedBy(userService.getCurrentUser());
        document.setStatus(DocumentStatus.PENDING);
        document.setUploadedOn(new Date());
        
        Path fileDir = Paths.get(uploadDirPath);
        String path;
        if(file != null){
            if(!Files.exists(fileDir)){
                fileDir.toFile().mkdirs();
            }
            try{
                path = String.format("%s/%s", uploadDirPath, file.getOriginalFilename());
                File uploadFile = Paths.get(path).toFile();
                FileUtils.copyInputStreamToFile(file.getInputStream(), uploadFile);
                document.setDocumentPath(path);
            } catch (IOException e) {
                e.printStackTrace();
            }

            documentRepository.save(document);
        }
    }

    public List<DocumentResponse> getAllDocuments(){
        return documentRepository.findAll().stream().map(DocumentResponse::new).collect(Collectors.toList());
    }

    public List<DocumentResponse> getDocumentByUploadedUser(){
        return documentRepository.findDocumentByUploadedUser(userService.getCurrentUser().getId()).stream().map(DocumentResponse::new).collect(Collectors.toList());
    }

    public void updateDocumentStatus(Long id,String status){
        Document document = documentRepository.getById(id);
        if(document!=null){
            if(status.equals("Approve")){
                document.setStatus(DocumentStatus.APPROVED);
            }
            else if(status.equals("Reject")){
                document.setStatus(DocumentStatus.REJECTED);
            }
            document.setApprovedBy(userService.getCurrentUser());
            documentRepository.save(document);
        }
    }
}
