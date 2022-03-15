package com.exampaper.krielwus.model;

import org.hibernate.annotations.GenericGenerator;
import xyz.erupt.annotation.Erupt;
import xyz.erupt.annotation.EruptField;
import xyz.erupt.annotation.sub_field.Edit;
import xyz.erupt.annotation.sub_field.EditType;
import xyz.erupt.annotation.sub_field.Readonly;
import xyz.erupt.annotation.sub_field.View;
import xyz.erupt.annotation.sub_field.sub_edit.ChoiceType;
import xyz.erupt.annotation.sub_field.sub_edit.Search;
import xyz.erupt.toolkit.handler.SqlChoiceFetchHandler;

import javax.persistence.*;

/**
 * Created by krielwus on 2022-03-14 14:39
 * knowledge dictionary
 *
 * @author krielwus
 */

@Erupt(name = "知识点字典")
@Table(name = "em_knowledge_info")
@Entity
public class knowledge_info {

    @Id
    @GeneratedValue(generator = "generator")
    @GenericGenerator(name = "generator", strategy = "native")
    @Column(name = "id")
    @EruptField(views = @View(title = "知识点编号"), edit = @Edit(title = "知识点编号", readonly = @Readonly, show = false))
    private Long id;

    @EruptField(views = @View(title = "知识点名称"), edit = @Edit(title = "知识点名称", notNull = true))
    private String knowledge_name;

    @EruptField(views = @View(title = "关联学科"), edit = @Edit(search = @Search, title = "关联学科", type = EditType.CHOICE, choiceType = @ChoiceType(fetchHandler = SqlChoiceFetchHandler.class, fetchHandlerParams = "select epi.id as id , epi.project_name as project_name from test_paper.em_project_info epi order by epi.sort asc")))
    private Integer project_id;

//    @EruptField(views = @View(title = "关联试题"), edit = @Edit(title = "关联试题", notNull = true, type = EditType.NUMBER))
//    private Integer test_id;
    //文本输入
    @EruptField(views = @View(title = "排序"), edit = @Edit(title = "排序", type = EditType.NUMBER))
    private String sort;

}
