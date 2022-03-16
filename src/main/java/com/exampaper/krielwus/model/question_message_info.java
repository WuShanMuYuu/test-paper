package com.exampaper.krielwus.model;

import org.hibernate.annotations.GenericGenerator;
import xyz.erupt.annotation.Erupt;
import xyz.erupt.annotation.EruptField;
import xyz.erupt.annotation.sub_field.Edit;
import xyz.erupt.annotation.sub_field.EditType;
import xyz.erupt.annotation.sub_field.Readonly;
import xyz.erupt.annotation.sub_field.View;
import xyz.erupt.annotation.sub_field.sub_edit.ChoiceType;
import xyz.erupt.annotation.sub_field.sub_edit.DateType;
import xyz.erupt.annotation.sub_field.sub_edit.Search;
import xyz.erupt.annotation.sub_field.sub_edit.VL;
import xyz.erupt.toolkit.handler.SqlChoiceFetchHandler;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by krielwus on 2022-03-15 16:35
 *
 * @author krielwus
 */
@Erupt(name = "题目列表")
@Table(name = "em_question_detail_info")
@Entity
public class question_message_info {
    @Id
    @GeneratedValue(generator = "generator")
    @GenericGenerator(name = "generator",strategy = "native")
    @Column(name = "id")
    @EruptField(
            views = @View(title = "题目编号"),
            edit = @Edit(title = "题目编号",readonly = @Readonly,show = false)
    )
    private Long id;

    @EruptField(
            views = @View(title = "题目类型"),
            edit = @Edit(
                    title = "题目类型",
                    search = @Search,
                    type = EditType.CHOICE,
                    choiceType = @ChoiceType(
                            fetchHandler = SqlChoiceFetchHandler.class,
                            fetchHandlerParams = "select eti.id as id , eti.topic_name as topic_name " +
                                    "from test_paper.em_topictype_info eti order by eti.sort asc"
                    )
            )
    )
    private Long question_type;

    @EruptField(
            views = @View(title = "关联学科"),
            edit = @Edit(
                    search = @Search,
                    title = "关联学科",
                    type = EditType.CHOICE,
                    choiceType = @ChoiceType(
                            fetchHandler = SqlChoiceFetchHandler.class,
                            fetchHandlerParams = "select epi.id as id , epi.project_name as project_name from test_paper.em_project_info epi order by epi.sort asc"
                    )
            )
    )
    private Long project_id;

    @EruptField(
            views = @View(title = "分值"),
            edit = @Edit(title = "分值",type = EditType.NUMBER,search = @Search)
    )
    private Double score;

    @EruptField(
            views = @View(title = "难度系数"),
            edit = @Edit(
                    title = "难度系数",
                    search = @Search,
                    type = EditType.CHOICE,
                    choiceType = @ChoiceType(
                                vl = {  @VL(value = "1", label = "1"),
                                        @VL(value = "2", label = "2"),
                                        @VL(value = "3", label = "3"),
                                        @VL(value = "4", label = "4"),
                                        @VL(value = "5", label = "5")
                                }
                            )
            )
    )
    private Integer difficulty;

    @EruptField(
            views = @View(title = "关联题干ID",sortable = true,width = "950px"),
            edit = @Edit(
                    title = "关联题干ID",
                    type = EditType.CHOICE,
                    choiceType = @ChoiceType(
                            fetchHandler = SqlChoiceFetchHandler.class,
                            fetchHandlerParams = "select eqi.id as id , eqi.questions_text as questions_text from test_paper.em_question_info eqi"
                    )
            )
    )
    private Long question_content_id;

    @EruptField(
            views = @View(title = "正确答案"),
            edit = @Edit(title = "正确答案")
    )
    private String answer;

    @EruptField(
            views = @View(title = "使用状态",show = false),
            edit = @Edit(
                    title = "使用状态",
                    search = @Search,
                    type = EditType.CHOICE,
                    choiceType = @ChoiceType(
                            vl = {  @VL(value = "0", label = "禁用"),
                                    @VL(value = "1", label = "在用"),
                            }
                    )
            )
    )
    private Integer states;

    @EruptField(
            views = @View(title = "删除状态",show = false),
            edit = @Edit(
                    title = "删除状态",
                    search = @Search,
                    type = EditType.CHOICE,
                    choiceType = @ChoiceType(
                            vl = {  @VL(value = "0", label = "已删除"),
                                    @VL(value = "1", label = "未删除"),
                            }
                    )
            )
    )
    private Integer deleted;

    @EruptField(
            views = @View(title = "创建时间",sortable = true,show = false),
            edit = @Edit(
                    title = "创建时间",
                    type = EditType.DATE, notNull = true,
                    dateType = @DateType(type = DateType.Type.DATE_TIME)
            )
    )
    private Date create_time;
}
