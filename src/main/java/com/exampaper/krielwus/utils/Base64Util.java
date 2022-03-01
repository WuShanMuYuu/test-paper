package com.exampaper.krielwus.utils;

import sun.misc.BASE64Decoder;

import java.io.UnsupportedEncodingException;

public class Base64Util {

    /**
     * base64编码
     *
     * @param str
     * @param CodeType 编码方式UTF-8以及ASCII等等
     * @return
     */

    public static String Base64Encode(String str, String CodeType) {
        if (str == null) {
            return null;
        }

        String res = "";
        try {
            res = new sun.misc.BASE64Encoder().encode(str.getBytes(CodeType));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return res;
    }

    /**
     * Base64解密
     * @param str
     * @param CodeType
     * @return
     */
    public static String Base64Decode(String str,String CodeType) {
        if (str == null) {
            return null;
        }
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            byte[] b = decoder.decodeBuffer(str);
            return new String(b, CodeType);
        } catch (Exception e) {
            return null;
        }
    }

    public static void main(String[] args) {
        String a = "年会还哈";

        System.out.println(Base64Util.Base64Encode(a, "UTF-8"));
        System.out.println(Base64Util.Base64Decode(Base64Util.Base64Encode(a, "UTF-8"), "UTF-8"));
    }
}
