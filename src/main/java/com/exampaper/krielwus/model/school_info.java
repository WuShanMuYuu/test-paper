package com.exampaper.krielwus.model;

import org.hibernate.annotations.GenericGenerator;
import xyz.erupt.annotation.Erupt;
import xyz.erupt.annotation.EruptField;
import xyz.erupt.annotation.sub_field.Edit;
import xyz.erupt.annotation.sub_field.EditType;
import xyz.erupt.annotation.sub_field.View;
import xyz.erupt.annotation.sub_field.sub_edit.Search;

import javax.persistence.*;
import javax.xml.crypto.Data;
import java.util.Date;

/**
 * Created by krielwus on 2022-02-17 14:36
 *
 * @author krielwus
 */
@Erupt(name = "学校")
@Table(name = "em_school_info")
@Entity
public class school_info {

    @Id
    @GeneratedValue(generator = "generator")
    @GenericGenerator(name = "generator",strategy = "native")
    @Column(name = "id")
    @EruptField
    private Long id;

    //文本输入
    @EruptField(
            views = @View(title = "名称"),
            edit = @Edit(title = "名称",search = @Search(vague = true))
    )
    private String school_name;

    //文本输入
    @EruptField(
            views = @View(title = "地址"),
            edit = @Edit(title = "地址",type= EditType.MAP)
    )
    private String address;

    //布尔选择
    @EruptField(
            views = @View(title = "启用"),
            edit = @Edit(title = "启用",search = @Search)
    )
    private Boolean used;

    //时间选择
    @EruptField(
            views = @View(title = "创建时间"),
            edit = @Edit(title = "创建时间",search = @Search)
    )
    private Date create_date;

}
