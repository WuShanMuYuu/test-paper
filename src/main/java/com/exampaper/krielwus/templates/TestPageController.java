package com.exampaper.krielwus.templates;

import com.exampaper.krielwus.templates.interfaces.interfaceImpl.FileUploadImpl;
import com.exampaper.krielwus.ueditor.UeditorConfigVM;
import com.exampaper.krielwus.ueditor.UploadResultVM;
import com.exampaper.krielwus.utils.Base64Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.exampaper.krielwus.templates.interfaces.FileUpload;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;

@Controller
@RequestMapping(value = "/uetest")
public class TestPageController {

//    private static final String IMAGE_UPLOAD = "imgUpload";
//    private static final String IMAGE_UPLOAD_FILE = "upFile";
//
//    @RequestMapping(value = "/index",method = RequestMethod.GET)
//    public String toIndex(){
//        return "index";
//    }
//
//    @RequestMapping(value = "/uetest")
//    public String uetest(Model model, HttpServletRequest request){
//        String id = String.valueOf(request.getParameter("id"));
////        String content = String.valueOf(request.getParameter("content").replace("\\$","\\+"));
//        String content = String.valueOf(request.getParameter("content"));
//        String index = String.valueOf(request.getParameter("index"));
//        model.addAttribute("id",id);
////        model.addAttribute("content", Base64Util.Base64Decode(content,"UTF-8"));
//        model.addAttribute("content", content);
//        model.addAttribute("index",index);
//        return "uetest2";
//    }
//
//    @ResponseBody
//    @RequestMapping(value = "/admin/upload/configAndUpload")
//    public Object upload(HttpServletRequest request, HttpServletResponse response) {
//        String action = request.getParameter("action");
//        if (action.equals(IMAGE_UPLOAD)) {
//            try {
//                MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
//                MultipartFile multipartFile = multipartHttpServletRequest.getFile(IMAGE_UPLOAD_FILE);
//                long attachSize = multipartFile.getSize();
//                String imgName = multipartFile.getOriginalFilename();
//                String filePath;
//                try (InputStream inputStream = multipartFile.getInputStream()) {
////                    filePath = fileUpload.uploadFile(inputStream, attachSize, imgName);
//                    filePath = new FileUploadImpl().uploadMultipartFile(multipartFile,imgName);
//                }
//                String imageType = imgName.substring(imgName.lastIndexOf("."));
//                UploadResultVM uploadResultVM = new UploadResultVM();
//                uploadResultVM.setOriginal(imgName);
//                uploadResultVM.setName(imgName);
//                uploadResultVM.setUrl(filePath);
//                uploadResultVM.setSize(multipartFile.getSize());
//                uploadResultVM.setType(imageType);
//                uploadResultVM.setState("SUCCESS");
//                return uploadResultVM;
//            } catch (IOException e) {
////                logger.error(e.getMessage(), e);
//            }
//        } else {
//            UeditorConfigVM ueditorConfigVM = new UeditorConfigVM();
//            ueditorConfigVM.setImageActionName(IMAGE_UPLOAD);
//            ueditorConfigVM.setImageFieldName(IMAGE_UPLOAD_FILE);
//            ueditorConfigVM.setImageMaxSize(2048000L);
//            ueditorConfigVM.setImageAllowFiles(Arrays.asList(".png", ".jpg", ".jpeg", ".gif", ".bmp"));
//            ueditorConfigVM.setImageCompressEnable(true);
//            ueditorConfigVM.setImageCompressBorder(1600);
//            ueditorConfigVM.setImageInsertAlign("none");
//            ueditorConfigVM.setImageUrlPrefix("");
//            ueditorConfigVM.setImagePathFormat("");
//            return ueditorConfigVM;
//        }
//        return null;
//    }

}
