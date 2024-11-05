package com.truzak.standard_carpets.service;

import com.truzak.standard_carpets.entity.Carpet;
import com.truzak.standard_carpets.repo.CarpetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class CarpetServiceImpl implements CarpetService{

    private CarpetRepo carpetRepo;

    @Autowired
    public CarpetServiceImpl(CarpetRepo carpetRepo) {
        this.carpetRepo = carpetRepo;
    }

    @Override
    public List<Carpet> getCarpets() {
        return carpetRepo.findAll();
    }

    @Override
    public List<Carpet> getCarpetsByType(int id) {
        return carpetRepo.findByTypeId(id);
    }

    @Override
    public Optional<Carpet> getCarpet(int id) {
        return carpetRepo.findById(id);
    }

    @Override
    public void saveCarpet(Carpet carpet) {
        carpetRepo.save(carpet);
    }

    @Override
    public void deleteCarpet(int id) {
        carpetRepo.deleteById(id);
    }

    @Override
    public double getTotalImagesSize() {
        return carpetRepo.getTotalImageSize();
    }
}
