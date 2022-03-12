package com.exampaper.krielwus.model;

import org.hibernate.annotations.GenericGenerator;
import xyz.erupt.annotation.Erupt;
import xyz.erupt.annotation.EruptField;
import xyz.erupt.annotation.sub_field.Edit;
import xyz.erupt.annotation.sub_field.EditType;
import xyz.erupt.annotation.sub_field.Readonly;
import xyz.erupt.annotation.sub_field.View;
import xyz.erupt.annotation.sub_field.sub_edit.DateType;
import xyz.erupt.annotation.sub_field.sub_edit.Search;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by krielwus on 2022-03-13 16:55
 *
 * @author krielwus
 */
@Erupt(name = "日历备忘录",orderBy = " sort asc")
@Table(name = "em_calendar_info")
@Entity
public class calendarNote_info {
    @Id
    @GeneratedValue(generator = "generator")
    @GenericGenerator(name = "generator",strategy = "native")
    @Column(name = "id")
    @EruptField(
            views = @View(title = "备忘记录ID"),
            edit = @Edit(title = "备忘记录ID",readonly = @Readonly,show = false)
    )
    private Long id;

    @EruptField(
            views = @View(
                    title = "日历时间", sortable = true
            ),
            edit = @Edit(
                    title = "日历时间", search = @Search, notNull = true
            )
    )
    private String note_time;

    @EruptField(
            views = @View(
                    title = "备忘录"
            ),
            edit = @Edit(
                    title = "备忘录",
                    type = EditType.TEXTAREA, search = @Search, notNull = true
            )
    )
    private @Lob String note_content;

    @EruptField(
            views = @View(
                    title = "创建时间"
            ),
            edit = @Edit(
                    title = "创建时间",
                    type = EditType.DATE, search = @Search, notNull = true,
                    dateType = @DateType(type = DateType.Type.DATE_TIME)
            )
    )
    private Date create_time;
}
