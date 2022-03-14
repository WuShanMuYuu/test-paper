package com.exampaper.krielwus.controller;

import com.exampaper.krielwus.layuiInfo.transferInfo;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
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
        return "/Questions/radio-index";
    }

    /**
     * 单选题目插入
     * @return
     */
    @RequestMapping(value = "/insertRadio")
    @ResponseBody
    public Object insertRadio(Model model,HttpServletRequest request){
        String subject = String.valueOf(request.getParameter("subject"));
        String exam_name = String.valueOf(request.getParameter("exam_name"));
        String options_a = String.valueOf(request.getParameter("options_a"));
        String options_b = String.valueOf(request.getParameter("options_b"));
        String options_c = String.valueOf(request.getParameter("options_c"));
        String options_d = String.valueOf(request.getParameter("options_d"));
        String radio = String.valueOf(request.getParameter("radio"));
        String analyze = String.valueOf(request.getParameter("analyze"));
        String score = String.valueOf(request.getParameter("score"));
        String difficulty = String.valueOf(request.getParameter("difficulty"));
        String knowledge_point = String.valueOf(request.getParameter("knowledge_point"));



        return null;
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
        return "/Questions/multiple-choice-index";
    }

    /**
     * 进入判断题编创
     *
     * @return
     */
    @RequestMapping(value = "/judgment")
    public String judgment() {
        return "/Questions/judgment";
    }

    /**
     * 填空题编创
     *
     * @return
     */
    @RequestMapping(value = "/space-topic")
    public String space_topic() {
        return "/Questions/fill-in-the-blank";
    }

    /**
     * 简答题编创
     *
     * @return
     */
    @RequestMapping(value = "/answer-question")
    public String answer_question() {
        return "/Questions/answer-questions";
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
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/question-preview")
    public String questionPreview(Model model, HttpServletRequest request) {
        String subject_id = String.valueOf(request.getParameter("id"));


        return "/Questions/question-preview";
    }

    /**
     * 文件传方法
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
