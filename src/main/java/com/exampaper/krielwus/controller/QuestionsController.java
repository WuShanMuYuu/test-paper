package com.exampaper.krielwus.controller;

import com.exampaper.krielwus.templates.interfaces.interfaceImpl.FileUploadImpl;
import com.exampaper.krielwus.ueditor.UeditorConfigVM;
import com.exampaper.krielwus.ueditor.UploadResultVM;
import com.exampaper.krielwus.utils.Base64Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.alibaba.fastjson.JSONObject;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/questions")
public class QuestionsController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * 定义上传组件变量
     */
    private static final String IMAGE_UPLOAD = "imgUpload";
    private static final String IMAGE_UPLOAD_FILE = "upFile";


    /**
     * 进入单选题编创
     *
     * @return
     */
    @RequestMapping(value = "/radio-index")
    public String index(Model model) {
        String sql = "select epi.id as id , epi.project_name as project_name from test_paper.em_project_info epi order by epi.sort asc";
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(sql);
//        maps.forEach(map -> System.out.println(String.valueOf(map.get("project_name"))));
        model.addAttribute("subjectList", maps);
        return "Questions/radio-index";
    }

    /**
     * 单选题目插入
     *
     * @return
     */
    @RequestMapping(value = "/insertRadio")
    @ResponseBody
    public Object insertRadio(Model model, HttpServletRequest request) {
        //获取到下一个存盘ID
        String getIndexID = "select NEXTVAL('questionSeq') as question_id from dual";
        Map IndexMap = jdbcTemplate.queryForMap(getIndexID);
        long question_id = Integer.valueOf(String.valueOf(IndexMap.get("question_id")));
        Map resultMap = new HashMap(16);
        try {
            String jsonStr = String.valueOf(request.getParameter("postData"));
            if (StringUtils.isEmpty(jsonStr)) {
                resultMap.put("code", "-1");
                resultMap.put("message", "提交信息为空!");
                return resultMap;
            }
            //String转JSON
            JSONObject jsonObject = JSONObject.parseObject(jsonStr);

            String subject_id = String.valueOf(jsonObject.get("subject"));
            String question_content = String.valueOf(jsonObject.get("question_content"));
            String options_a = String.valueOf(jsonObject.get("options_a"));
            String options_b = String.valueOf(jsonObject.get("options_b"));
            String options_c = String.valueOf(jsonObject.get("options_c"));
            String options_d = String.valueOf(jsonObject.get("options_d"));
            if (StringUtils.isEmpty(options_a)){
                options_a = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">A. </span>" + options_a + "</p>";
            }
            if (StringUtils.isEmpty(options_b)){
                options_b = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">B. </span>" + options_b + "</p>";
            }
            if (StringUtils.isEmpty(options_c)){
                options_c = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">C. </span>" + options_c + "</p>";
            }
            if (StringUtils.isEmpty(options_d)){
                options_d = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">D. </span>" + options_d + "</p>";
            }
            String questionsText = question_content + options_a + options_b + options_c + options_d;

            String insert_questions = "INSERT INTO test_paper.em_question_info (id , create_time, question_content,questions_text) " + "VALUES(" + question_id + ", now(), '" + jsonStr + "','" + questionsText + "')";
            jdbcTemplate.execute(insert_questions);

            String answer = String.valueOf(jsonObject.get("answer"));
            String analyze = String.valueOf(jsonObject.get("analyze"));
            String score = String.valueOf(jsonObject.get("score"));
            String difficulty = String.valueOf(jsonObject.get("difficulty"));
            String knowledge_point = String.valueOf(jsonObject.get("knowledge_point"));
            //单选题类型type=1
            //int question_type = 1;
            int question_type = Integer.valueOf(String.valueOf(jsonObject.get("question_type")));
            String insert_Str = "INSERT INTO test_paper.em_question_detail_info(id, answer, create_time, deleted, difficulty, project_id, question_content_id, question_type, score, states)VALUES(" + question_id + ", '" + answer + "', now(), 1, " + difficulty + ", " + subject_id + ", " + question_id + ", " + question_type + ", " + score + ", 1)";
            jdbcTemplate.execute(insert_Str);

            resultMap.put("code", "1");
            resultMap.put("message", "提交信息成功!");
            return resultMap;
        } catch (Exception e) {
            e.printStackTrace();
            //发生异常  删除写入数据  并将原数据写入redis缓存中
            String detete_q = "DELETE FROM test_paper.em_question_info WHERE id ='" + getIndexID + "'";
            String detete_detail = "DELETE FROM test_paper.em_question_detail_info WHERE id ='" + getIndexID + "'";
            jdbcTemplate.execute(detete_q);
            jdbcTemplate.execute(detete_detail);

            /**
             * todo
             * 数据缓存redis
             */

            resultMap.put("code", "-1");
            resultMap.put("message", e.toString());
            return null;
        }
    }

    /**
     * 进入多选题编创
     *
     * @return
     */
    @RequestMapping(value = "/multiple-choice-index")
    public String choice_index(Model model) {
        String sql = "select epi.id as id , epi.project_name as project_name from test_paper.em_project_info epi order by epi.sort asc";
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(sql);
//        maps.forEach(map -> System.out.println(String.valueOf(map.get("project_name"))));
        model.addAttribute("subjectList", maps);
        return "Questions/multiple-choice-index";
    }

    /**
     * 多选题目插入
     *
     * @return
     */
    @RequestMapping(value = "/insertCheck")
    @ResponseBody
    public Object insertCheck(Model model, HttpServletRequest request) {
        //获取到下一个存盘ID
        String getIndexID = "select NEXTVAL('questionSeq') as question_id from dual";
        Map IndexMap = jdbcTemplate.queryForMap(getIndexID);
        long question_id = Integer.valueOf(String.valueOf(IndexMap.get("question_id")));
        Map resultMap = new HashMap(16);
        try {
            String jsonStr = String.valueOf(request.getParameter("postData"));
            if (StringUtils.isEmpty(jsonStr)) {
                resultMap.put("code", "-1");
                resultMap.put("message", "提交信息为空!");
                return resultMap;
            }
            //String转JSON
            JSONObject jsonObject = JSONObject.parseObject(jsonStr);
            String subject_id = String.valueOf(jsonObject.get("subject"));
            String question_content = String.valueOf(jsonObject.get("question_content"));
            String options_a = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">A. </span>" + String.valueOf(jsonObject.get("options_a")) + "</p>";
            String options_b = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">B. </span>" + String.valueOf(jsonObject.get("options_b")) + "</p>";
            String options_c = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">C. </span>" + String.valueOf(jsonObject.get("options_c")) + "</p>";
            String options_d = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">D. </span>" + String.valueOf(jsonObject.get("options_d")) + "</p>";
            String questionsText = question_content + options_a + options_b + options_c + options_d;
            //答案整理
            String answer_temp = "";
            if ("A".equals(String.valueOf(jsonObject.get("answer[a]")))) {
                answer_temp = answer_temp + "A,";
            }
            if ("B".equals(String.valueOf(jsonObject.get("answer[b]")))) {
                answer_temp = answer_temp + "B,";
            }
            if ("C".equals(String.valueOf(jsonObject.get("answer[c]")))) {
                answer_temp = answer_temp + "C,";
            }
            if ("D".equals(String.valueOf(jsonObject.get("answer[d]")))) {
                answer_temp = answer_temp + "D";
            }
            jsonObject.put("answer", answer_temp);
            String insert_questions = "INSERT INTO test_paper.em_question_info (id , create_time, question_content,questions_text) " + "VALUES(" + question_id + ", now(), '" + jsonObject.toString() + "','" + questionsText + "')";
            jdbcTemplate.execute(insert_questions);

            String answer = String.valueOf(jsonObject.get("answer"));
            String analyze = String.valueOf(jsonObject.get("analyze"));
            String score = String.valueOf(jsonObject.get("score"));
            String difficulty = String.valueOf(jsonObject.get("difficulty"));
            String knowledge_point = String.valueOf(jsonObject.get("knowledge_point"));
            //单选题类型type=1
            //int question_type = 1;
            int question_type = Integer.valueOf(String.valueOf(jsonObject.get("question_type")));
            String insert_Str = "INSERT INTO test_paper.em_question_detail_info(id, answer, create_time, deleted, difficulty, project_id, question_content_id, question_type, score, states)VALUES(" + question_id + ", '" + answer + "', now(), 1, " + difficulty + ", " + subject_id + ", " + question_id + ", " + question_type + ", " + score + ", 1)";
            jdbcTemplate.execute(insert_Str);

            resultMap.put("code", "1");
            resultMap.put("message", "提交信息成功!");
            return resultMap;
        } catch (Exception e) {
            e.printStackTrace();
            //发生异常  删除写入数据  并将原提交数据写入redis缓存中
            String detete_q = "DELETE FROM test_paper.em_question_info WHERE id ='" + getIndexID + "'";
            String detete_detail = "DELETE FROM test_paper.em_question_detail_info WHERE id ='" + getIndexID + "'";
            jdbcTemplate.execute(detete_q);
            jdbcTemplate.execute(detete_detail);

            /**
             * todo
             * 数据缓存redis
             */

            resultMap.put("code", "-1");
            resultMap.put("message", e.toString());
            return null;
        }
    }


    /**
     * 进入判断题编创
     *
     * @return
     */
    @RequestMapping(value = "/judgment")
    public String judgment(Model model,HttpServletRequest request) {
        String sql = "select epi.id as id , epi.project_name as project_name from test_paper.em_project_info epi order by epi.sort asc";
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(sql);
        model.addAttribute("subjectList", maps);
        return "/Questions/judgment";
    }

    /**
     * 填空题编创
     *
     * @return
     */
    @RequestMapping(value = "/space-topic")
    public String space_topic(Model model,HttpServletRequest request) {
        String sql = "select epi.id as id , epi.project_name as project_name from test_paper.em_project_info epi order by epi.sort asc";
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(sql);
        model.addAttribute("subjectList", maps);
        return "/Questions/fill-in-the-blank";
    }

    /**
     * 简答题编创
     *
     * @return
     */
    @RequestMapping(value = "/answer-question")
    public String answer_question(Model model, HttpServletRequest request) {
        String sql = "select epi.id as id , epi.project_name as project_name from test_paper.em_project_info epi order by epi.sort asc";
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(sql);
        model.addAttribute("subjectList", maps);
        return "/Questions/answer-questions";
    }

    /**
     * 计算题与实验题存盘
     *
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/insertCalculate")
    @ResponseBody
    public Object insertCalculate(Model model, HttpServletRequest request) {
        //获取到下一个存盘ID
        String getIndexID = "select NEXTVAL('questionSeq') as question_id from dual";
        Map IndexMap = jdbcTemplate.queryForMap(getIndexID);
        long question_id = Integer.valueOf(String.valueOf(IndexMap.get("question_id")));
        Map resultMap = new HashMap(16);

        try {
            String jsonStr = String.valueOf(request.getParameter("postData"));
            if (StringUtils.isEmpty(jsonStr)) {
                resultMap.put("code", "-1");
                resultMap.put("message", "提交信息为空!");
                return resultMap;
            }
            //String转JSON
            JSONObject jsonObject = JSONObject.parseObject(jsonStr);
            String subject_id = String.valueOf(jsonObject.get("subject"));
            String question_content = String.valueOf(jsonObject.get("question_content"));
            String questionsText = question_content ;
            //insert
            String insert_questions = "INSERT INTO test_paper.em_question_info (id , create_time, question_content,questions_text) " + "VALUES(" + question_id + ", now(), '" + jsonObject.toString() + "','" + questionsText + "')";
            jdbcTemplate.execute(insert_questions);

            String answer = String.valueOf(jsonObject.get("answer"));
            String analyze = String.valueOf(jsonObject.get("analyze"));
            String score = String.valueOf(jsonObject.get("score"));
            String difficulty = String.valueOf(jsonObject.get("difficulty"));
            String knowledge_point = String.valueOf(jsonObject.get("knowledge_point"));
            //单选题类型type=1
            //int question_type = 1;
            int question_type = Integer.valueOf(String.valueOf(jsonObject.get("question_type")));
            String insert_Str = "INSERT INTO test_paper.em_question_detail_info(id, answer, create_time, deleted, difficulty, project_id, question_content_id, question_type, score, states)VALUES(" + question_id + ", '" + answer + "', now(), 1, " + difficulty + ", " + subject_id + ", " + question_id + ", " + question_type + ", " + score + ", 1)";
            jdbcTemplate.execute(insert_Str);

            resultMap.put("code", "1");
            resultMap.put("message", "提交信息成功!");
            return resultMap;
        } catch (Exception e) {
            e.printStackTrace();
            //发生异常  删除写入数据  并将原提交数据写入redis缓存中
            String detete_q = "DELETE FROM test_paper.em_question_info WHERE id ='" + getIndexID + "'";
            String detete_detail = "DELETE FROM test_paper.em_question_detail_info WHERE id ='" + getIndexID + "'";
            jdbcTemplate.execute(detete_q);
            jdbcTemplate.execute(detete_detail);

            /**
             * todo
             * 数据缓存redis
             */

            resultMap.put("code", "-1");
            resultMap.put("message", e.toString());
            return null;
        }
    }

    /**
     * 富文本编辑页面
     *
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/edit")
    public String uetest(Model model, HttpServletRequest request) {
        String id = String.valueOf(request.getParameter("id"));
        String content = String.valueOf(request.getParameter("content"));
        String index = String.valueOf(request.getParameter("index"));
        model.addAttribute("id", id);
        model.addAttribute("content", content);
        model.addAttribute("index", index);
        return "/Questions/edit";
    }

    /**
     * 知识点选型
     *
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/SelectPoint")
    public String selectPoint(Model model, HttpServletRequest request) {
        String subject_id = String.valueOf(request.getParameter("id"));
        String sql = "SELECT eui.id as value ,eui.name as title FROM test_paper.em_unit_info eui where eui.project_id = " + Integer.valueOf(subject_id) + " and eui.level in (3,4) order by eui.sort asc ";
        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
        StringBuffer stringBuffer = new StringBuffer("[");
        list.forEach(map -> {
            stringBuffer.append("{\"value\": \"" + map.get("value") + "\", \"title\": \"" + map.get("title") + "\"},");
        });
        stringBuffer.append("]");
        String buffer = stringBuffer.toString().trim();
        model.addAttribute("PointList", buffer);
        return "/Questions/pointSelect";
    }

    /**
     * 问题预览页面
     *
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/question-preview")
    public String questionPreview(Model model, HttpServletRequest request) {
        String jsonStr = String.valueOf(request.getParameter("content"));
        JSONObject jsonObject = JSONObject.parseObject(Base64Util.Base64Decode(jsonStr, "UTF-8"));
        String question_type = String.valueOf(jsonObject.get("question_type"));
        model.addAttribute("question_type", question_type);
        String question_content = String.valueOf(jsonObject.get("question_content"));
        switch (question_type) {
            //单选
            case "1": {
                String options_a = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">A. </span>" + String.valueOf(jsonObject.get("options_a")) + "</p>";
                String options_b = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">B. </span>" + String.valueOf(jsonObject.get("options_b")) + "</p>";
                String options_c = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">C. </span>" + String.valueOf(jsonObject.get("options_c")) + "</p>";
                String options_d = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">D. </span>" + String.valueOf(jsonObject.get("options_d")) + "</p>";
                model.addAttribute("question_content", question_content);
                model.addAttribute("options_a", options_a);
                model.addAttribute("options_b", options_b);
                model.addAttribute("options_c", options_c);
                model.addAttribute("options_d", options_d);
            }
            //多选
            case "2": {
                String options_a = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">A. </span>" + String.valueOf(jsonObject.get("options_a")) + "</p>";
                String options_b = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">B. </span>" + String.valueOf(jsonObject.get("options_b")) + "</p>";
                String options_c = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">C. </span>" + String.valueOf(jsonObject.get("options_c")) + "</p>";
                String options_d = "<p><span style=\"color: #333333; font-family: 微软雅黑, Arial, 宋体; font-size: 14px; background-color: #FFFFFF;\">D. </span>" + String.valueOf(jsonObject.get("options_d")) + "</p>";
                model.addAttribute("question_content", question_content);
                model.addAttribute("options_a", options_a);
                model.addAttribute("options_b", options_b);
                model.addAttribute("options_c", options_c);
                model.addAttribute("options_d", options_d);
            }
            //实验题
            case "3": {
                model.addAttribute("question_content", question_content);
            }
            //解答题
            case "4": {
                model.addAttribute("question_content", question_content);
            }
            //填空题
            case "5": {
                model.addAttribute("question_content", question_content);
            }
            //
            case "6": {
                model.addAttribute("question_content", question_content);
            }
            default:
                model.addAttribute("question_content", question_content);
        }
        return "/Questions/question-preview";
    }

    @RequestMapping(value = "/print")
    public String printPage(Model model, HttpServletRequest request) {

        return "/Questions/print-page";
    }


    /**
     * 文件上传方法
     *
     * @param request
     * @param response
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/admin/upload/configAndUpload")
    public Object upload(HttpServletRequest request, HttpServletResponse response) {
        String action = request.getParameter("action");
        if (action.equals(IMAGE_UPLOAD)) {
            try {
                MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
                MultipartFile multipartFile = multipartHttpServletRequest.getFile(IMAGE_UPLOAD_FILE);
                long attachSize = multipartFile.getSize();
                String imgName = multipartFile.getOriginalFilename();
                String filePath;
                try (InputStream inputStream = multipartFile.getInputStream()) {
//                    filePath = fileUpload.uploadFile(inputStream, attachSize, imgName);
                    filePath = new FileUploadImpl().uploadMultipartFile(multipartFile, imgName);
                }
                String imageType = imgName.substring(imgName.lastIndexOf("."));
                UploadResultVM uploadResultVM = new UploadResultVM();
                uploadResultVM.setOriginal(imgName);
                uploadResultVM.setName(imgName);
                uploadResultVM.setUrl(filePath);
                uploadResultVM.setSize(multipartFile.getSize());
                uploadResultVM.setType(imageType);
                uploadResultVM.setState("SUCCESS");
                return uploadResultVM;
            } catch (IOException e) {
//                logger.error(e.getMessage(), e);
            }
        } else {
            UeditorConfigVM ueditorConfigVM = new UeditorConfigVM();
            ueditorConfigVM.setImageActionName(IMAGE_UPLOAD);
            ueditorConfigVM.setImageFieldName(IMAGE_UPLOAD_FILE);
            ueditorConfigVM.setImageMaxSize(2048000L);
            ueditorConfigVM.setImageAllowFiles(Arrays.asList(".png", ".jpg", ".jpeg", ".gif", ".bmp"));
            ueditorConfigVM.setImageCompressEnable(true);
            ueditorConfigVM.setImageCompressBorder(1600);
            ueditorConfigVM.setImageInsertAlign("none");
            ueditorConfigVM.setImageUrlPrefix("");
            ueditorConfigVM.setImagePathFormat("");
            return ueditorConfigVM;
        }
        return null;
    }
}
