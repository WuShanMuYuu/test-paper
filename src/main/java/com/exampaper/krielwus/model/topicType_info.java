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
 * Created by krielwus on 2022-03-15 16:40
 *
 * @author krielwus
 */
@Erupt(name = "题型字典")
@Table(name = "em_topictype_info")
@Entity
public class topicType_info {
    @Id
    @GeneratedValue(generator = "generator")
    @GenericGenerator(name = "generator",strategy = "native")
    @Column(name = "id")
    @EruptField(
            views = @View(title = "题型编号"),
            edit = @Edit(title = "题型编号",readonly = @Readonly,show = false)
    )
    private Long id;

    @EruptField(
            views = @View(title = "题型名称",sortable = true),
            edit = @Edit(title = "题型名称",search = @Search(vague = true))
    )
    private String topic_name;

    @EruptField(
            views = @View(title = "排序"),
            edit = @Edit(title = "排序",type = EditType.NUMBER)
    )
    private String sort;
}
