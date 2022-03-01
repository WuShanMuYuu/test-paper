package com.exampaper.krielwus.templates.interfaces;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Set;

public interface FileUpload {

    String uploadFile(InputStream inputStream, long size, String extName);

    String uploadMultipartFile(MultipartFile multipartFile, String imgName);

}