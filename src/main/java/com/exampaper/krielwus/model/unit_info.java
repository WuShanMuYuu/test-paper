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
 * Created by krielwus on 2022-02-18 17:44
 *
 * @author krielwus
 */
@Erupt(name = "教学单元字典",orderBy = " sort asc")
@Table(name = "em_unit_info")
@Entity
public class unit_info {
    @Id
    @GeneratedValue(generator = "generator")
    @GenericGenerator(name = "generator",strategy = "native")
    @Column(name = "id")
    @EruptField(
            views = @View(title = "单元编号"),
            edit = @Edit(title = "单元编号",readonly = @Readonly,show = false)
    )
    private Long id;

    @EruptField(
            views = @View(title = "学科"),
            edit = @Edit(title = "班级编号",type = EditType.CHOICE,
                    choiceType = @ChoiceType(fetchHandler = SqlChoiceFetchHandler.class,
                            fetchHandlerParams = "select id,project_name from em_project_info")
            )
    )
    private Long project_id;

    @EruptField(
            views = @View(title = "单元名称"),
            edit = @Edit(title = "单元名称",search = @Search(vague = true))
    )
    private Long unit_name;
}
