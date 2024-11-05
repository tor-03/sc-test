package com.truzak.standard_carpets.service;

import com.truzak.standard_carpets.entity.Carpet;

import java.util.List;
import java.util.Optional;

public interface CarpetService {
    List<Carpet> getCarpets();

    List<Carpet> getCarpetsByType(int id);

    Optional<Carpet> getCarpet(int id);

    void saveCarpet(Carpet carpet);

    void deleteCarpet(int id);

    double getTotalImagesSize();


}
