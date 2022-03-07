package com.exampaper.krielwus.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping(value = "/questions")
public class QuestionsController {


    @RequestMapping(value = "/index")
    public String index(){
        return "/Questions/index";
    }

    @RequestMapping(value = "/edit")
    public String uetest(Model model, HttpServletRequest request){
        String id = String.valueOf(request.getParameter("id"));
        String content = String.valueOf(request.getParameter("content"));
        String index = String.valueOf(request.getParameter("index"));
        model.addAttribute("id",id);
        model.addAttribute("content", content);
        model.addAttribute("index",index);
        return "/Questions/edit";
    }

}
