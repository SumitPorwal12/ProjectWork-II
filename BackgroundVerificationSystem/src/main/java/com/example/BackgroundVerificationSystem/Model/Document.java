package com.example.BackgroundVerificationSystem.Model;

import com.example.BackgroundVerificationSystem.Enum.DocumentStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String documentPath;

    @Column(nullable = false)
    private DocumentStatus status;

    @OneToOne
    private User UploadedBy;

    @OneToOne
    private User ApprovedBy;

    @Temporal(TemporalType.TIMESTAMP)
    private Date uploadedOn;
}
