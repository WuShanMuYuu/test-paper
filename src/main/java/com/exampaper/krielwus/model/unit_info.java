package com.exampaper.krielwus.model;

import xyz.erupt.annotation.Erupt;
import xyz.erupt.annotation.EruptField;
import xyz.erupt.annotation.sub_erupt.Tree;
import xyz.erupt.annotation.sub_field.Edit;
import xyz.erupt.annotation.sub_field.EditType;
import xyz.erupt.annotation.sub_field.View;
import xyz.erupt.annotation.sub_field.sub_edit.ChoiceType;
import xyz.erupt.annotation.sub_field.sub_edit.ReferenceTreeType;
import xyz.erupt.annotation.sub_field.sub_edit.Search;
import xyz.erupt.annotation.sub_field.sub_edit.VL;
import xyz.erupt.jpa.model.BaseModel;
import xyz.erupt.toolkit.handler.SqlChoiceFetchHandler;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "em_unit_info")
@Erupt(name = "单元级联", orderBy = "unit_info.sort", tree = @Tree(id = "id", label = "name", pid = "parent.id"))
public class unit_info extends BaseModel {

    @EruptField(views = @View(title = "单元名称"), edit = @Edit(title = "单元名称", notNull = true))
    private String name;

    @EruptField(views = @View(title = "关联学科"), edit = @Edit(search = @Search, title = "关联学科", type = EditType.CHOICE, choiceType = @ChoiceType(fetchHandler = SqlChoiceFetchHandler.class, fetchHandlerParams = "select epi.id as id , epi.project_name as project_name from test_paper.em_project_info epi order by epi.sort asc")))
    private Integer project_id;

    @EruptField(views = @View(title = "显示顺序"), edit = @Edit(title = "显示顺序"))
    private Integer sort;

    @EruptField(views = @View(title = "节点等级"), edit = @Edit(search = @Search, title = "节点等级", type = EditType.CHOICE, choiceType = @ChoiceType(vl = {@VL(value = "1", label = "1"), @VL(value = "2", label = "2"), @VL(value = "3", label = "3"), @VL(value = "4", label = "4")})))
    private Integer level;


    @ManyToOne
    @EruptField(edit = @Edit(title = "级联单元", type = EditType.REFERENCE_TREE, referenceTreeType = @ReferenceTreeType(pid = "parent.id")))
    private unit_info parent;

}