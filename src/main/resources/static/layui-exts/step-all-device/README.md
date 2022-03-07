# step-all-device

#### 介绍
> 针对`layui`封装的分步表单提交组件，解决了各种设备适配

#### 软件架构
* layui
* jquery

#### 安装教程

本地拉取后，直接用浏览器打开`index.html`即可看到效果

#### 使用说明

> 拉取项目后，里面包含一个`step-lc`文件夹，其中包含两个文件，`step.js`和`step.css`，`step.css`可以放在你项目的任何静态文件夹，然后要在使用分步表单的页面引入这个`step.css`样式即可，只要保证路径正确，例如下面的：

*引入样式`(step.css)`*
```bash
# index.html
# 无论在哪个页面使用分步表单
# 需要引入以下两个样式如：
<link href="./layui/css/layui.css" rel="stylesheet"/>
<link href="./step-lc/step.css" rel="stylesheet">
# 可以将 step.css 放入任何目录，只要地址引用正确即可
```

*引入脚本`(step.js)`*
> 假如你的项目当中，`.js`文件全部放在`/static/js/`文件夹下面，此时第一步将拉取的`step-lc`目录放到复制到里面，即`/static/js/step-lc`，然后在需要用到分步表单的页面写上如下：
```html
<script>
layui.config({
    base:'./'
}).extend({
    step: 'step-lc/step'
}).use(['step'], () => {
    let step = layui.step
    step.run({
        // 参数配置...
    })
})
</script>
```

##### 参数说明

||类型|默认值|说明|
|-|-|-|-|
|elem|string|-|一个`DOM`的`id`|
|stepWidth|string/num|'16rem'|分步表单进度提示容器宽度，可以接受一个大小的宽度，如`'18rem'`、`'500px'`、`500`|
|contentWidth|string/num|'100%'|分步表单内容的宽度，可以接受一个大小的宽度，如`'18rem'`、`'500px'`、`500`|
|contentHeight|string/num|'20rem'|分步表单内容的高度, 如`'18rem'`、`'500px'`、`500`|
|nodes|array|-|分步表单的进度内容提示，如：[{tip: '协议',},{tip: '信息',},{tip: '结果',}]|
|contents|array|[]|分步表单的内容，每个数组项是一个对象，这个对象包含两个字段，`_tpl`和`ctx`，`_tpl`是内容的模板，`ctx`是这个模板里面要用到的各种方法和变量，具体用法参照示例的`index.html`|
|getCurrent|-|-|通过 step.getCurrent 获取当前屏幕的序号|
|freshHeight|-|-|通过 step.freshHeight() 可以即时刷新当前内容高度（因为此组件是基于carousel分装的，carousel 的每项高度本身不能动态变化，这个方法通过动态计算内容高度，实现每一屏高度自适应），例如，当填写表单中某个表单项时，表单由于需要显示消息，消息显示时表单高度会变高，每次变化时调用 step.freshHeight() 就可以更新当前屏的高度|

##### 重要方法

||功能|示例|
|-|-|-|
|prev|返回上一屏|step.prev()|
|next|去下一屏|step.next()|


