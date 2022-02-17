package com.exampaper.krielwus.model;

import org.hibernate.annotations.GenericGenerator;
import xyz.erupt.annotation.Erupt;
import xyz.erupt.annotation.EruptField;
import xyz.erupt.annotation.sub_field.Edit;
import xyz.erupt.annotation.sub_field.EditType;
import xyz.erupt.annotation.sub_field.Readonly;
import xyz.erupt.annotation.sub_field.View;
import xyz.erupt.annotation.sub_field.sub_edit.Search;

import javax.persistence.*;

/**
 * Created by krielwus on 2022-02-17 16:55
 *
 * @author krielwus
 */
@Erupt(name = "班级字典",orderBy = " sort asc")
@Table(name = "em_class_info")
@Entity
public class class_info {
    @Id
    @GeneratedValue(generator = "generator")
    @GenericGenerator(name = "generator",strategy = "native")
    @Column(name = "id")
    @EruptField(
            views = @View(title = "班级编号"),
            edit = @Edit(title = "班级编号",readonly = @Readonly,show = false)
    )
    private Long id;

    //文本输入
    @EruptField(
            views = @View(title = "班级名称",sortable = true),
            edit = @Edit(title = "班级名称",search = @Search(vague = true))
    )
    private String class_name;

    @EruptField(
            views = @View(title = "排序"),
            edit = @Edit(title = "排序",type = EditType.NUMBER)
    )
    private String sort;
}
