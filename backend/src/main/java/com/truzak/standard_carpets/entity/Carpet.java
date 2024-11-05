package com.truzak.standard_carpets.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "carpet")
public class Carpet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private String construction;

    @Column
    private String materials;

    @Column
    private String origin;

//    @Column
//    @CreationTimestamp
//    private Date created_at;

    @Lob
    @Column
    private byte[] img;

    @Column
    private int rugId;

    @Column
    private double imgSize;

    @ManyToOne
    //@JsonBackReference
    @JoinColumn(name="type_id")
    private Type type;

}

