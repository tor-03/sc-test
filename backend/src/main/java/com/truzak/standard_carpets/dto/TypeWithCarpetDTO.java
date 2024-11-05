package com.truzak.standard_carpets.dto;

import com.truzak.standard_carpets.entity.Carpet;
import com.truzak.standard_carpets.entity.Type;
import lombok.Data;

import java.util.Base64;

@Data
public class TypeWithCarpetDTO {
    private String typeName;
    private String typeDescription;
    private Integer position;
    private String carpetImage;

    public TypeWithCarpetDTO(Type type, Carpet carpet) {
        this.typeName = type.getName();
        this.typeDescription = type.getDescription();
        this.position = type.getPosition();

        if (carpet != null && carpet.getImg() != null) {
            this.carpetImage = Base64.getEncoder().encodeToString(carpet.getImg());
        } else {
            this.carpetImage = null;
        }
    }

}




