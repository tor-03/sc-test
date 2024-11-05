package com.truzak.standard_carpets.controller;

import com.truzak.standard_carpets.entity.Carpet;
import com.truzak.standard_carpets.entity.Type;
import com.truzak.standard_carpets.service.CarpetService;
import com.truzak.standard_carpets.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:5173",allowedHeaders = {"Authorization", "Origin"})
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private CarpetService carpetService;

    @Autowired
    private TypeService typeService;

    @PostMapping("/collections")
    public void saveCarpet(@RequestBody Carpet carpet) {
        //System.out.println(carpet);
        carpetService.saveCarpet(carpet);
    }

    @DeleteMapping("/collections/{id}")
    public void updateCarpet(@PathVariable int id) {
        carpetService.deleteCarpet(id);
    }

    @PutMapping("/collections")
    public void updateCarpet(@RequestBody Carpet carpet) {
        carpetService.saveCarpet(carpet);
    }

    @PostMapping("/types")
    public void saveType(@RequestBody Type type) {
        //System.out.println(type);
        typeService.saveType(type);
    }

    @DeleteMapping("/types/{id}")
    public void DeleteType(@PathVariable int id) {
        typeService.deleteType(id);
    }

    @PutMapping("/types")
    public void updateType(@RequestBody Type type) {
        typeService.saveType(type);
    }

    @GetMapping("/total-types")
    public long getTotalNumberOfTypes(){
        return typeService.getTotalNumberOfTypes();
    }

    @GetMapping("/total-image-size")
    public double getTotalImagesSize(){
        return carpetService.getTotalImagesSize();
    }
}
