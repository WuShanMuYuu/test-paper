package com.exampaper.krielwus.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/MathGrapher")
public class MathGrapherController {

    @RequestMapping(value = "/index")
    public String index(){
        return "MathGrapher/index";
    }

}
