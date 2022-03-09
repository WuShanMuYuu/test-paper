package com.exampaper.krielwus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Created by krielwus on 2022-02-17 14:32
 *
 * @author krielwus
 */
@Controller
@RequestMapping(value = "/pageAction")
public class pageController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * 初始化进入页面
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/index")
    public List<Map<String, Object>> index(Model model, HttpServletRequest request){
        //初始化页面
        String sql = "SELECT * FROM test_paper.em_project_info";
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(sql);
        maps.forEach(map -> System.out.println(String.valueOf(map.get("project_name"))));
        return maps;
    }
//
//    @RequestMapping(value = "/design")
//    public String designPage(){
//        return "/layui-form-render-master/editor";
//    }
}
