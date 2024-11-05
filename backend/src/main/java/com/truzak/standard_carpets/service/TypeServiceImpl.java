package com.truzak.standard_carpets.service;

import com.truzak.standard_carpets.dto.TypeWithCarpetDTO;
import com.truzak.standard_carpets.entity.Carpet;
import com.truzak.standard_carpets.entity.Type;
import com.truzak.standard_carpets.repo.TypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Transactional
@Service
public class TypeServiceImpl implements TypeService{

    private TypeRepo typeRepo;

    @Autowired
    public TypeServiceImpl(TypeRepo typeRepo) {
        this.typeRepo = typeRepo;
    }

    @Override
    public List<Type> getTypes() {
        return typeRepo.findAllByOrderByPositionAsc();
    }

    @Override
    public Optional<Type> getType(int id) {
        return typeRepo.findById(id);
    }

    @Override
    public Type getTypeByName(String name) {
        return typeRepo.findByName(name);
    }

    @Override
    public void saveType(Type type) {
        int newPosition = type.getPosition();

        typeRepo.incrementPositionsFrom(newPosition);

        typeRepo.save(type);
    }

    @Override
    public void deleteType(int id) {
        Optional<Type> typeToDelete = typeRepo.findById(id);
        int deletedPosition = typeToDelete.get().getPosition();

        typeRepo.deleteById(id);

        typeRepo.decrementPositionsAfter(deletedPosition);
    }

    @Override
    public long getTotalNumberOfTypes() {
        return typeRepo.count();
    }


    public List<TypeWithCarpetDTO> getTypesWithCarpet() {
        List<Object[]> results = typeRepo.findAllTypesWithOneCarpet();
        List<TypeWithCarpetDTO> typeWithCarpetList = new ArrayList<>();

        for (Object[] result : results) {
            Type type = (Type) result[0];
            Carpet carpet = (Carpet) result[1];
            typeWithCarpetList.add(new TypeWithCarpetDTO(type, carpet));
        }

        return typeWithCarpetList;
    }

    @Override
    public List<Type> getTypesWithCarpets() {
        return typeRepo.findTypesWithCarpets();
    }
}
