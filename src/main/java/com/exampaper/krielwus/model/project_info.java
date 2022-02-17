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
 * Created by krielwus on 2022-02-17 16:45
 *
 * @author krielwus
 */
@Erupt(name = "学科字典",orderBy = " sort asc")
@Table(name = "em_project_info")
@Entity
public class project_info {
    @Id
    @GeneratedValue(generator = "generator")
    @GenericGenerator(name = "generator",strategy = "native")
    @Column(name = "id")
    @EruptField(
            views = @View(title = "学科编号"),
            edit = @Edit(title = "学科编号",readonly = @Readonly,show = false)
    )
    private Long id;

    //文本输入
    @EruptField(
            views = @View(title = "学科名称",sortable = true),
            edit = @Edit(title = "学科名称",search = @Search(vague = true))
    )
    private String project_name;

    //文本输入
    @EruptField(
            views = @View(title = "排序"),
            edit = @Edit(title = "排序",type = EditType.NUMBER)
    )
    private String sort;
}
