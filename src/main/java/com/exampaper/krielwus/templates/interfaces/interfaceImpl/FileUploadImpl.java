package com.exampaper.krielwus.templates.interfaces.interfaceImpl;

import com.exampaper.krielwus.templates.interfaces.FileUpload;
import org.apache.commons.io.IOUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

public class FileUploadImpl implements FileUpload {

    @Override
    public String uploadFile(InputStream inputStream, long size, String extName) {
        //七牛云存储
//        QnConfig qnConfig = systemConfig.getQn();
//        Configuration cfg = new Configuration(Region.region2());
//        UploadManager uploadManager = new UploadManager(cfg);
//        Auth auth = Auth.create(qnConfig.getAccessKey(), qnConfig.getSecretKey());
//        String upToken = auth.uploadToken(qnConfig.getBucket());
//        try {
//            Response response = uploadManager.put(inputStream, null, upToken, null, null);
//            DefaultPutRet putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
//            return qnConfig.getUrl() + "/" + putRet.key;
//        } catch (QiniuException ex) {
////            logger.error(ex.getMessage(), ex);
//        }
        return null;
    }

    @Override
    public String uploadMultipartFile(MultipartFile multipartFile,String imgName) {
        //文件上传存储
        //文件上传目标地址
        String target_path = "D:\\Programming\\A-2-sourcefile\\test-paper\\src\\main\\resources\\static\\image\\";
        File target_file = new File(target_path + File.separator + imgName);
        String url = "http://127.0.0.1:10035/image/";
        FileOutputStream fileOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream(target_file);
            IOUtils.copy(multipartFile.getInputStream(),fileOutputStream);

            return url+imgName;
        } catch (IOException L){
            L.printStackTrace();
        } finally {
            try {
                fileOutputStream.close();
            }catch (IOException e){
                e.printStackTrace();
            }
        }

        return null;
    }
}
