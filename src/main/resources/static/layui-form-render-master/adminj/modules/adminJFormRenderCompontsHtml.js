/**
 * AdminJ LayuiFormRender
 * @author adminj
 * @date 2021-8
 * @description  此类为实例化HTML，把组件的HTML写到BODY [开源不易，如果可能请留下版权信息]
 * @version 1.0 
 * 
 */
 layui.link(layui.cache.base + 'adminJFormRenderCompontsHtml.css')
layui.define(function (exports) {

  var adminJFormRenderCompontsHtml = {
    //初始化HTML
    baseHtml: function () {
      var html = '<div class="layui-form">\n' +
        '        <ul>\n' +
        '            <li class="adminj-ds-left" id="leftDragButtons"></li>\n' +
        '            <li class="adminj-ds-center" id=\'sortable\'></li>\n' +
        '            <li class="adminj-ds-right">\n' +
        '\n' +
        '                <div class="layui-tab layui-tab-brief">\n' +
        '                    <ul class="layui-tab-title">\n' +
        '                        <li class="layui-this">属性设置</li>\n' +
        '                    </ul>\n' +
        '                    <div class="layui-tab-content" style="height: 100px;">\n' +
        '                        <div class="layui-tab-item layui-show" id="propertiesDiv" style="padding-bottom: 20px;">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '\n' +
        '            </li>\n' +
        '        </ul>\n' +
        '    </div>\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '    <!--所有的组件 display:block 后可以直接在浏览器修改预览-->\n' +
        '    <span id="adminj_cpts_items" style="display: none">\n' +
        '        <div class="layui-form-item adminj-sort-item" id="text">\n' +
        '            <label class="layui-form-label">text</label>\n' +
        '            <div class="layui-input-inline" style="width:60%;">\n' +
        '                <input type="text" name="" autocomplete="off" class="layui-input" style="width: 99%;">\n' +
        '            </div>\n' +
        '            <div class="layui-form-mid layui-word-aux"></div>\n' +
        '        </div>\n' +
        '        <div class="layui-form-item adminj-sort-item adminj-group-layout-border" id="hidden">\n' +
        '            <label class="layui-form-label">&nbsp;</label>\n' +
        '            <div class="layui-input-inline" style="width:60%;">\n' +
        '                <input type="hidden" name="">\n' +
        '            </div>\n' +
        '            <div class="layui-form-mid layui-word-aux"></div>\n' +
        '        </div>\n' +
        '        <div class="layui-form-item adminj-sort-item" id="password">\n' +
        '            <label class="layui-form-label">password</label>\n' +
        '            <div class="layui-input-inline" style="width:60%;">\n' +
        '                <input type="password" name="" autocomplete="off" class="layui-input" style="width: 99%;">\n' +
        '            </div>\n' +
        '            <div class="layui-form-mid layui-word-aux"></div>\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="textarea">\n' +
        '            <label class="layui-form-label">textarea</label>\n' +
        '            <div class="layui-input-inline" style="width:60%;">\n' +
        '                <textarea class="layui-textarea" name="textarea" style="width: 99%;"></textarea>\n' +
        '            </div>\n' +
        '\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="date">\n' +
        '            <label class="layui-form-label">日期选择</label>\n' +
        '            <div class="layui-input-inline">\n' +
        '                <input type="text" name="" class="layui-input">\n' +
        '            </div>\n' +
        '            <div class="layui-form-mid layui-word-aux"></div>\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="switch" rename="false">\n' +
        '            <label class="layui-form-label">开关</label>\n' +
        '            <div class="layui-input-inline">\n' +
        '                <input type="checkbox" checked="" name="" lay-skin="switch" lay-filter="switch" lay-text="ON|OFF">\n' +
        '            </div>\n' +
        '            <div class="layui-form-mid layui-word-aux"></div>\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="select">\n' +
        '            <label class="layui-form-label">下拉选项</label>\n' +
        '            <div class="layui-input-inline">\n' +
        '                <select name="">\n' +
        '                    <option value="0" selected="">选择</option>\n' +
        '                    <option value="1">选项1</option>\n' +
        '                </select>\n' +
        '            </div>\n' +
        '            <div class="layui-form-mid layui-word-aux"></div>\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="select2" rename="false">\n' +
        '            <label class="layui-form-label" style="margin-top: -3px;">下拉多选</label>\n' +
        '            <div class="layui-input-inline" style="width:60%;">\n' +
        '                <select name="" lay-ignore class="select2" multiple="multiple" data-placeholder=""\n' +
        '                    data-dropdown-css-class="select2-purple" style="width: 99%;">\n' +
        '                    <option value="0" selected="">选择</option>\n' +
        '                    <option value="1">选项1</option>\n' +
        '                </select>\n' +
        '            </div>\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="radio">\n' +
        '            <label class="layui-form-label">单选择框</label>\n' +
        '            <div class="layui-input-inline" style="width:60%;">\n' +
        '                <input name="" type="radio" value="0" index="0" checked="" title="选择" lay-skin="primary">\n' +
        '                <input name="" type="radio" value="1" index="1" title="选项1" lay-skin="primary">\n' +
        '            </div>\n' +
        '            <div class="layui-form-mid layui-word-aux"></div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="checkbox">\n' +
        '            <label class="layui-form-label">多选择框</label>\n' +
        '            <div class="layui-input-inline" style="width:60%;">\n' +
        '                <input name="" type="checkbox" value="0" index="0" checked="" title="选择" lay-skin="primary">\n' +
        '                <input name="" type="checkbox" value="1" index="1" title="选项1" lay-skin="primary">\n' +
        '            </div>\n' +
        '            <div class="layui-form-mid layui-word-aux"></div>\n' +
        '        </div>\n' +
        '\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="dateRange">\n' +
        '            <label class="layui-form-label">日期范围</label>\n' +
        '            <div class="layui-input-inline">\n' +
        '                <input type="text" autocomplete="off" class="layui-input">\n' +
        '            </div>\n' +
        '            <div class="layui-form-mid layui-word-aux"></div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="uploadImage" rename="false">\n' +
        '            <label class="layui-form-label">单图上传</label>\n' +
        '            <div class="layui-input-inline">\n' +
        '                <!--button type="button" class="layui-btn" id="uploadbutf"><i class="layui-icon"></i>上传图片</button-->\n' +
        '                <ul class="adminj-upload-ul">\n' +
        '                    <li style="border: 0px;">\n' +
        '\n' +
        '                        <div class="adminj-upload-image-style" update_width="true">\n' +
        '                            <div class="adminj-upload-image-style" style="position:relative;top:0%;" flag="upload_div">\n' +
        '                                <div class="layui-upload-list" style="text-align: center;line-height: 60px;">\n' +
        '                                    <i class="layui-icon layui-icon-upload-drag adminj-upload-icon"\n' +
        '                                        style="font-size: 1.8em;color: #1d6fa5;"></i>\n' +
        '                                    <p id="msgText" style="display: none"></p>\n' +
        '                                </div>\n' +
        '                                <div class="upload_bar_div" style="top:38%;width: 100%; display: none;position:absolute;"\n' +
        '                                    update_width="true">\n' +
        '                                    <div class="layui-progress" lay-showpercent="yes" lay-filter="layui-progress">\n' +
        '                                        <div class="layui-progress-bar" lay-percent=""></div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="adminj-upload-image-style" id="upload_image_div"\n' +
        '                                style="top:5px;position:absolute;border:dashed 1px;pointer-events: none;"\n' +
        '                                update_width="true">\n' +
        '                                <img class="layui-upload-img image_src"\n' +
        '                                    style="wdith:100%;height: 100px;pointer-events: none;display: none;">\n' +
        '                            </div>\n' +
        '                            <div class="adminj-upload-image-style upload_mask_div"\n' +
        '                                style="top:0%;position:absolute;pointer-events: auto; display: none"\n' +
        '                                update_width="true">\n' +
        '\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '                    </li>\n' +
        '                </ul>\n' +
        '\n' +
        '            </div>\n' +
        '            <div class="layui-form-mid layui-word-aux"></div>\n' +
        '\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="uploadImages" rename="false">\n' +
        '            <label class="layui-form-label">多图上传</label>\n' +
        '            <div class="layui-input-inline" style="width:80%;">\n' +
        '                <ul class="adminj-upload-ul">\n' +
        '                    <li>\n' +
        '                        <div class="adminj-upload-image-style" update_width="true">\n' +
        '                            <div class="adminj-upload-image-style" style="position:absolute;z-index: 597;"\n' +
        '                                flag="upload_div">\n' +
        '                                <div class="layui-upload-list" style="text-align: center;line-height: 60px;">\n' +
        '                                    <i class="layui-icon layui-icon-upload-drag adminj-upload-icon"\n' +
        '                                        style="font-size: 1.8em;color: #1d6fa5;"></i>\n' +
        '                                    <p id="msgText" style="display: none"></p>\n' +
        '                                </div>\n' +
        '                                <div class="upload_bar_div" style="top:45%;width: 100%; display: none;position:absolute;"\n' +
        '                                    update_width="true">\n' +
        '                                    <div class="layui-progress" lay-showpercent="yes" lay-filter="layui-progress">\n' +
        '                                        <div class="layui-progress-bar" lay-percent=""></div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="adminj-upload-image-style" id="upload_image_div"\n' +
        '                                style="position:absolute;z-index: 598;border:dashed 0px red;pointer-events: none;"\n' +
        '                                update_width="true">\n' +
        '                                <img class="layui-upload-img image_src"\n' +
        '                                    style="wdith:100%;height: 100px;pointer-events: none;display: none;">\n' +
        '                            </div>\n' +
        '                            <div class="adminj-upload-image-style upload_mask_div" \n' +
        '                                style="position:absolute;z-index: 599;pointer-events: auto; display: none"\n' +
        '                                update_width="true">\n' +
        '\n' +
        '                            </div>\n' +
        '\n' +
        '                            <div class="close_div adminj-upload-tools-div adminj-upload-image-style"\n' +
        '                                style="pointer-events: none;position:absolute;z-index: 600;border:dotted 0px red; "\n' +
        '                                update_width="true">\n' +
        '                                <div\n' +
        '                                    style="position:absolute;pointer-events: auto;cursor:pointer;background-color:#1d6fa5;top:-8px;right: -10px;border-radius:10px;height: 18px;width: 18px;line-height: 18px;">\n' +
        '                                    <i class="layui-icon layui-icon-close"\n' +
        '                                        style="font-size: 15px; color:#ffffff;padding: 1px;"></i>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '\n' +
        '                        </div>\n' +
        '\n' +
        '\n' +
        '                    </li>\n' +
        '\n' +
        '                    <li class="adminj-upload-image-style adminj-add-upload-div"\n' +
        '                        style=" border: dashed 1px #1d6fa5;text-align: center">\n' +
        '                        <span class="layui-icon layui-icon-add-circle-fine"\n' +
        '                            style="font-size: 2em; color: #1d6fa5;line-height: 80px;"></span>\n' +
        '                    </li>\n' +
        '\n' +
        '                </ul>\n' +
        '\n' +
        '            </div>\n' +
        '\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="uploadFile" rename="false">\n' +
        '            <label class="layui-form-label">上传文件</label>\n' +
        '            <div class="layui-input-inline">\n' +
        '                <button type="button" class="layui-btn" id="uploadFile"><i class="layui-icon"></i>上传文件</button>\n' +
        '            </div>\n' +
        '            <div class="layui-input-inline adminj-upload-empty-div"  style="margin-left: -60px; margin-bottom: 18px; margin-top: 18px;display:none" >'+
        '<div class="layui-progress" lay-filter="" lay-showpercent="true"><div class="layui-progress-bar" lay-percent="0%"></div></div></div>' +
        '\n<div class="layui-form-mid layui-word-aux"></div>\n' +
        '\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="uploadFiles" rename="false">\n' +
        '            <label class="layui-form-label">多文件上传</label>\n' +
        '            <div class="layui-input-block">\n' +
        '                <div class="layui-upload">\n' +
        '                    <button type="button" class="layui-btn" select_file="true">选择多文件</button>\n' +
        '                    <button type="button" class="layui-btn" upload_file="true"><i class="layui-icon"></i>上传文件</button>\n' +
        '                    <div class="layui-upload-list" style="max-width: 1000px;">\n' +
        '                        <table class="layui-table">\n' +
        '                            <colgroup>\n' +
        '                                <col>\n' +
        '                                <col width="150">\n' +
        '                                <col width="260">\n' +
        '                                <col width="150">\n' +
        '                            </colgroup>\n' +
        '                            <thead>\n' +
        '                                <tr>\n' +
        '                                    <th>文件名</th>\n' +
        '                                    <th>大小</th>\n' +
        '                                    <th>上传进度</th>\n' +
        '                                    <th>操作</th>\n' +
        '                                </tr>\n' +
        '                            </thead>\n' +
        '                            <tbody id="fileList"></tbody>\n' +
        '                        </table>\n' +
        '                    </div>\n' +
        '                    <!--button type="button" class="layui-btn" id="uploadListAction">开始上传</button-->\n' +
        '                </div>\n' +
        '            </div>\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="color">\n' +
        '            <label class="layui-form-label">颜色选择</label>\n' +
        '            <div class="layui-input-inline">\n' +
        '                <input type="text" value="" placeholder="" class="layui-input">\n' +
        '            </div>\n' +
        '            <div class="layui-inline">\n' +
        '                <div flag="color_ui_div"></div>\n' +
        '            </div>\n' +
        '\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <div id="submitData" class="layui-form-item adminj-sort-item" rename="false">\n' +
        '            <div class="layui-input-block">\n' +
        '                <button type="submit" class="layui-btn" lay-submit="" lay-filter="postButton"\n' +
        '                    id="postButton">立即提交</button>\n' +
        '                <button type="reset" class="layui-btn layui-btn-primary">重置</button>\n' +
        '            </div>\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="layui-form-item layui-row  adminj-sort-item" id="groupLayout" rename="false">\n' +
        '            <div class="adminj-col-item adminj-group-layout-border layui-col-md6">\n' +
        '            </div>\n' +
        '            <div class="adminj-col-item adminj-group-layout-border layui-col-md6">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="slider">\n' +
        '            <label class="layui-form-label">滑块</label>\n' +
        '            <div class="layui-input-inline" style="width: 60%;">\n' +
        '                <div style="margin-left: 10px; margin-bottom: 18px; margin-top: 18px;"></div>\n' +
        '            </div>\n' +
        '            <div class="layui-form-mid layui-word-aux"></div>\n' +
        '        </div>\n' +
        '\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="rate">\n' +
        '            <label class="layui-form-label">评分</label>\n' +
        '            <div class="layui-input-inline" style="width: 60%;">\n' +
        '                <div style="margin-left: 10px; "></div>\n' +
        '            </div>\n' +
        '            <div class="layui-form-mid layui-word-aux"></div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="selectS">\n' +
        '            <label class="layui-form-label">无限级联动</label>\n' +
        '\n' +
        '            <div class="layui-form-mid layui-word-aux"></div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="layui-tab layui-tab-brief adminj-sort-item" id="tab" rename="false">\n' +
        '            <ul class="layui-tab-title">\n' +
        '                <li class="layui-this">选择</li>\n' +
        '                <li>选项1</li>\n' +
        '            </ul>\n' +
        '            <div class="layui-tab-content" style="height: 100%">\n' +
        '                <div class="layui-tab-item layui-show adminj-col-item"\n' +
        '                    style="border: 1px dashed cadetblue;min-height: 200px;"></div>\n' +
        '                <div class="layui-tab-item adminj-col-item" style="border: 1px dashed cadetblue;min-height: 200px;">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '\n' +
        '\n' +
        '        <div class="layui-form-item adminj-sort-item" id="editor">\n' +
        '            <label class="layui-form-label">文本编辑器</label>\n' +
        '            <div class="layui-input-block" style="width:78%;  ">\n' +
        '                <div class="editor">\n' +
        '                    <h2>Bilingual Personality Disorder</h2>\n' +
        '                    <figure class="image image-style-side"><img\n' +
        '                            src="https://c.cksource.com/a/1/img/docs/sample-image-bilingual-personality-disorder.jpg">\n' +
        '                        <figcaption>One language, one person.</figcaption>\n' +
        '                    </figure>\n' +
        '                    <p>\n' +
        '                        adults who are bilingual in English in French were showed series of pictures and were asked to\n' +
        '                        create 3-minute stories.\n' +
        '                        In the end participants emphasized drastically different dynamics for stories in English and\n' +
        '                        French.\n' +
        '                    </p>\n' +
        '                    <p>\n' +
        '                        Another ground-breaking experiment which included bilingual Japanese women married to American\n' +
        '                        men in San Francisco were\n' +
        '                        asked to complete sentences. The goal of the experiment was to investigate whether or not human\n' +
        '                        feelings and thoughts\n' +
        '                        are expressed differently in <strong>different language mindsets</strong>.\n' +
        '                        <Here>is a sample from the the experiment:</Here>\n' +
        '                    </p>\n' +
        '                    <table>\n' +
        '                        <thead>\n' +
        '                            <tr>\n' +
        '                                <th></th>\n' +
        '                                <th>English</th>\n' +
        '                                <th>Japanese</th>\n' +
        '                            </tr>\n' +
        '                        </thead>\n' +
        '                        <tbody>\n' +
        '                            <tr>\n' +
        '                                <td>Real friends should</td>\n' +
        '                                <td>Be very frank</td>\n' +
        '                                <td>Help each other</td>\n' +
        '                            </tr>\n' +
        '                            <tr>\n' +
        '                                <td>I will probably become</td>\n' +
        '                                <td>A teacher</td>\n' +
        '                                <td>A housewife</td>\n' +
        '                            </tr>\n' +
        '                        </tbody>\n' +
        '                    </table>\n' +
        '                    <p>\n' +
        '                        More recent <a href="https://books.google.pl/books?id=1LMhWGHGkRUC">studies</a> show, the\n' +
        '                        language a person speaks affects\n' +
        '                        their cognition, behaviour, emotions and hence <strong>their personality</strong>.\n' +
        '                        This shouldn’t come as a surprise\n' +
        '                        <a href="https://en.wikipedia.org/wiki/Lateralization_of_brain_function">since we already\n' +
        '                            know</a> that different regions\n' +
        '                        of the brain become more active depending on the person’s activity at hand. Since structure,\n' +
        '                        information and especially\n' +
        '                        <strong>the culture</strong> of languages varies substantially and the language a person speaks\n' +
        '                        is an essential element of daily life.\n' +
        '                    </p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '\n' +
        '\n' +
        '    </span>\n' +
        '\n' +
        '\n' +
        '    <!--layui template生成左边的拖放button-->\n' +
        '    <script id="leftButtonTemplate" type="text/html">\n' +
        '\n' +
        '    {{#  layui.each(d.list, function(i, groups){ }}\n' +
        '\n' +
        '    <div class="layui-tab layui-tab-brief">\n' +
        '        <ul class="layui-tab-title">\n' +
        '            <li class="layui-this">{{ groups.groupName }}</li>\n' +
        '        </ul>\n' +
        '        <div class="layui-tab-content">\n' +
        '            <div class="layui-tab-item layui-show">\n' +
        '                <div class="layui-row">\n' +
        '                    {{# layui.each(groups.list, function(index, item){ }}\n' +
        '                    <div class="layui-col-xs6">\n' +
        '                        <div>\n' +
        '                            <button type="button" cpt_id="{{ item.id }}"\n' +
        '                                    class="layui-btn layui-btn-primary adminj-left-darg-button">{{ item.name }}\n' +
        '                            </button>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    {{# }); }}\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '\n' +
        '    {{#  }); }}\n' +
        '\n' +
        '\n' +
        '</script>\n' +
        '    <!--点击中间组件后出现的删除和复制工具条-->\n' +
        '<script id="toolsTemplate" type="text/html">\n' +
        '<div class="action-tools adminj-item-top-left-tools">\n' +
        ' &nbsp;&nbsp;<i class="layui-icon layui-icon-screen-full"></i>&nbsp;&nbsp;\n' +
        '</div>\n' +
        '<div class="action-tools adminj-item-bottom-right-tools">\n' +
        ' &nbsp;&nbsp;<i class="layui-icon layui-icon-delete"></i>&nbsp;&nbsp;\n' +
        ' <i class="layui-icon layui-icon-layer"></i>&nbsp;&nbsp;\n' +
        '</div>\n' +
        '</script>';
      return html;
    },
    init: function (formRender, initConfig) {//所有方法调用之前调用
      //把HTML写到body,如果有传ID就用已有的id div,如果没有就创建一个新的
      var $ = layui.$;
      var id = initConfig.id,compontsHtml=initConfig.compontsHtml;
      if (id == undefined) {
        id = 'id_' + new Date().getTime();
        initConfig.id = id;
        $('body').append('<div id="{0}"></div>'.format(id));
      }
      var html = $(this.baseHtml());
      //自定义HTML
      var $ = layui.$;
      $('#' + id).html(html);
      if(compontsHtml!=undefined){
        $('#adminj_cpts_items').append(compontsHtml);
      }
    }
  }


  exports('adminJFormRenderCompontsHtml', adminJFormRenderCompontsHtml);
});