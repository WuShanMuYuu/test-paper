package com.exampaper.krielwus.model;

import org.hibernate.annotations.GenericGenerator;
import xyz.erupt.annotation.Erupt;
import xyz.erupt.annotation.EruptField;
import xyz.erupt.annotation.sub_field.Edit;
import xyz.erupt.annotation.sub_field.EditType;
import xyz.erupt.annotation.sub_field.Readonly;
import xyz.erupt.annotation.sub_field.View;
import xyz.erupt.annotation.sub_field.sub_edit.DateType;
import xyz.erupt.annotation.sub_field.sub_edit.HtmlEditorType;
import xyz.erupt.annotation.sub_field.sub_edit.Search;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by krielwus on 2022-03-15 9:14
 *
 * @author krielwus
 */
@Erupt(name = "题目列表")
@Table(name = "em_question_info")
@Entity
public class question_info {
    @Id
    @GeneratedValue(generator = "generator")
    @GenericGenerator(name = "generator",strategy = "native")
    @Column(name = "id")
    @EruptField(
            views = @View(title = "题目编号"),
            edit = @Edit(title = "题目编号",readonly = @Readonly,show = false)
    )
    private Long id;

    //富文本输入
    @EruptField(
            views = @View(title = "题目内容",sortable = true),
            edit = @Edit(title = "题目内容",
                    type = EditType.HTML_EDITOR,
                    htmlEditorType = @HtmlEditorType(HtmlEditorType.Type.UEDITOR))
    )
    private String question_content;

    @EruptField(
            views = @View(title = "创建时间",sortable = true),
            edit = @Edit(
                    title = "创建时间",
                    type = EditType.DATE, search = @Search, notNull = true,
                    dateType = @DateType(type = DateType.Type.DATE_TIME)
            )
    )
    private Date create_time;

}
