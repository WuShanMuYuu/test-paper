package com.exampaper.krielwus.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by krielwus on 2022-02-17 14:32
 *
 * @author krielwus
 */
@Controller
@RequestMapping(value = "/pageAction")
public class pageController {

    /**
     * 初始化进入页面
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/index")
    public String index(Model model, HttpServletRequest request){
        //初始化页面


        return "";
    }
}
