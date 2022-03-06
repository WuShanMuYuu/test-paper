<%@ page contentType="text/html; charset=utf-8" language="java" import="java.io.ByteArrayOutputStream,java.io.File" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="java.io.IOException" %>
<%! private static String readTextFile(File file, String encode) {


        StringBuilder sbf = new StringBuilder();

        FileInputStream in = null;
        ByteArrayOutputStream out = null;
        try {

            in = new FileInputStream(file);
            if (in == null) return "";
            out = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int len = 0;
            while ((len = in.read(buffer)) != -1) {
                out.write(buffer, 0, len);
            }
            byte[] data = out.toByteArray();

            return new String(data, encode);

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                }
            }
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                }
            }

        }

        return sbf.toString();

    }%>

<%
request.setCharacterEncoding("utf-8");
response.setCharacterEncoding("utf-8");
String html=request.getParameter("resHtml");
if(html==null)html="";
String path=request.getRealPath("/");
String txt=readTextFile(new File(path+"editor_base.html"),"utf-8");
txt=txt.replaceAll("<!--code-->",html);

%>
<%=txt%>

