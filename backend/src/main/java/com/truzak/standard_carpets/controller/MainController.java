package com.truzak.standard_carpets.controller;

import com.truzak.standard_carpets.dto.TypeWithCarpetDTO;
import com.truzak.standard_carpets.entity.Carpet;
import com.truzak.standard_carpets.entity.Type;
import com.truzak.standard_carpets.service.CarpetService;
import com.truzak.standard_carpets.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sc")
public class MainController {

    @Autowired
    private TypeService typeService;

    @Autowired
    private CarpetService carpetService;

    @RequestMapping("/hello")
    public String hello(){

        return "hello";
    }

    @GetMapping("/types")
    public List<Type> getTypes(){
        return typeService.getTypes();
    }

    @GetMapping("/collections")
    public List<Carpet> getCollections(){
        return carpetService.getCarpets();
    }

    @GetMapping("/collections/{id}")
    public List<Carpet> getCarpetsByType(@PathVariable int id){
        return carpetService.getCarpetsByType(id);
    }

    @GetMapping("/types-with-carpet")
    public List<Type> getTypesWithCarpet() {
        return typeService.getTypesWithCarpets();
    }

    @GetMapping("/types/{name}")
    public Type getTypeWithName(@PathVariable String  name){
        return typeService.getTypeByName(name);
    }

    @GetMapping("/collection/{id}")
    public Optional<Carpet> getCarpet(@PathVariable int id){
        return carpetService.getCarpet(id);
    }


}