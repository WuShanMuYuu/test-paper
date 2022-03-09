package com.exampaper.krielwus.layuiInfo;

import java.io.Serializable;

/**
 * Created by krielwus on 2022-03-09 15:47
 *
 * @author krielwus
 */
public class transferInfo implements Serializable {
    private static final long serialVersionUID = 8323916538578609239L;

    private String value;
    private String title;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public transferInfo(String value, String title) {
        this.value = value;
        this.title = title;
    }

    public transferInfo() {
    }

    @Override
    public String toString() {
        return "transferInfo{" + "value='" + value + '\'' + ", title='" + title + '\'' + '}';
    }

}
