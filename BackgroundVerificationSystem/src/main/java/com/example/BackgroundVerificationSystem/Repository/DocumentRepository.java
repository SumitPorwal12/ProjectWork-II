package com.example.BackgroundVerificationSystem.Repository;

import com.example.BackgroundVerificationSystem.Model.Document;
import com.example.BackgroundVerificationSystem.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long>, QuerydslPredicateExecutor<Document> {
    @Query(nativeQuery = true, value = "Select * from document where uploaded_by_id =:id")
    List<Document> findDocumentByUploadedUser(Long id);
}
