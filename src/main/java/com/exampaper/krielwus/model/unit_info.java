package com.exampaper.krielwus.model;

import xyz.erupt.annotation.Erupt;
import xyz.erupt.annotation.EruptField;
import xyz.erupt.annotation.sub_erupt.Tree;
import xyz.erupt.annotation.sub_field.Edit;
import xyz.erupt.annotation.sub_field.EditType;
import xyz.erupt.annotation.sub_field.View;
import xyz.erupt.annotation.sub_field.sub_edit.ReferenceTreeType;
import xyz.erupt.jpa.model.BaseModel;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "em_unit_info")
@Erupt(
        name = "单元级联",
        orderBy = "unit_info.sort",
        tree =@Tree(id = "id", label = "name", pid = "parent.id")
)
public class unit_info extends BaseModel {

    @EruptField(
            views = @View(title = "单元名称"),
            edit = @Edit(title = "单元名称", notNull = true)
    )
    private String name;

    @EruptField(
            views = @View(title = "显示顺序"),
            edit = @Edit(title = "显示顺序")
    )
    private Integer sort;


    @ManyToOne
    @EruptField(
            edit = @Edit(
                    title = "级联单元",
                    type = EditType.REFERENCE_TREE,
                    referenceTreeType = @ReferenceTreeType(pid = "parent.id")
            )
    )
    private unit_info parent;

}