package com.exampaper.krielwus.controller;

import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by krielwus on 2022-03-11 15:25
 *
 * @author krielwus
 */
@Controller
@RequestMapping(value = "/calendar")
public class CalendarController {

    @RequestMapping(value = "/index")
    public String index(Model model, HttpServletRequest request){

        return "CalendarNote/index";
    }

    @RequestMapping(value = "/queryNote")
    @ResponseBody
    public JSONObject queryNote(Model model, HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();


        return jsonObject;
    }

}
