package com.truzak.standard_carpets.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "type")
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private int position;

    @Lob
    @Column
    private byte[] coverImg;

    @JsonBackReference
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "type")
    private List<Carpet> carpets;

}
