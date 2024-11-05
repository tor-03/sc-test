package com.truzak.standard_carpets.service;

import com.truzak.standard_carpets.dto.TypeWithCarpetDTO;
import com.truzak.standard_carpets.entity.Type;

import java.util.List;
import java.util.Optional;

public interface TypeService {

    List<Type> getTypes();

    Optional<Type> getType(int id);

    Type getTypeByName(String  name);
    void saveType(Type type);

    void deleteType(int id);

    long getTotalNumberOfTypes();

    public List<TypeWithCarpetDTO> getTypesWithCarpet();

    List<Type> getTypesWithCarpets();
}
