package com.exampaper.krielwus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by krielwus on 2022-03-11 15:25
 *
 * @author krielwus
 */
@Controller
@RequestMapping(value = "/calendar")
public class CalendarController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @RequestMapping(value = "/index")
    public String index(Model model, HttpServletRequest request){

        return "CalendarNote/index";
    }

    @RequestMapping(value = "/queryNote")
    @ResponseBody
    public Object queryNote(Model model, HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        String sql = "select eci.note_time ,eci.note_content from test_paper.em_calendar_info eci";
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(sql);
        maps.forEach(map -> {
            try {
                jsonObject.put(String.valueOf(map.get("note_time")),String.valueOf(map.get("note_content")));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        });
        return jsonObject.toString();
    }

    @RequestMapping(value = "/insert")
    @ResponseBody
    public void insertNote(Model model, HttpServletRequest request){
        String markDate = String.valueOf(request.getParameter("markDate"));
        String markNote = String.valueOf(request.getParameter("markNote"));
        String sql = "INSERT INTO test_paper.em_calendar_info(create_time, note_content, note_time)VALUES(now(), '"+markNote+"', '"+markDate+"')";
        jdbcTemplate.execute(sql);
    }


    @RequestMapping(value = "/deleteNote")
    @ResponseBody
    public Object deleteNote(Model model, HttpServletRequest request){
        Map map = new HashMap(16);
        String markDate = String.valueOf(request.getParameter("markDate"));
        String markNote = String.valueOf(request.getParameter("markNote"));
        String sql = "delete from test_paper.em_calendar_info where note_content = '"+markNote+"' and note_time = '"+markDate+"'";
        try{
            jdbcTemplate.execute(sql);
            map.put("code","1");
            map.put("message","success!");
            return map;
        }catch (Exception e){
            e.printStackTrace();
            map.put("code","-1");
            map.put("message",e.toString());
            return map;
        }
    }


}
