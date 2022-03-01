# location

#### 项目介绍
基于优秀的国产前端框架layui的地图定位组件。

#### 1.0版本说明


- 实现鼠标移动定位
- 集成3个地图api，百度，高德，天地图
- 实现地图api与坐标系混用，自动转换坐标
- 实现搜索定位（参考admin）



### 配置参数
参数 | 说明
---|---
type | 0 : 仅定位  1： 带有搜索的定位
title  |  标题
zoom | 默认缩放级别
apiType | 地图api  可选参数  baiduMap, tiandiMap, gaodeMap
coordinate | 坐标系 可选参数  baiduMap, tiandiMap, gaodeMap
mapType | 地图类型   0 普通地图 1 卫星地图 2 混合地图
searchKey | 默认的检索关键字，type=1时生效
init | 初始化方法，初始化中心点位置
success | 回调方法，参数data是定位标记的经纬度信息
onClickTip| 回调方法，参数data是中文信息，还有未经过转换的经纬度信息。

### 使用示例
render(elem,options) 绑定定位按钮

```
	location.render("#locationBtn", //定位按钮ID
{
                    type:0,
                    apiType: "baiduMap",
                    coordinate: "baiduMap",
                    mapType: 2,
                    zoom: 15,
					title: '区域定位',
                    init: function(){
                        return {longitude: $("#longitude").val()?$("#longitude").val():locationData.lng,latitude: $("#latitude").val()?$("#latitude").val():locationData.lat};
                    },
                    success: function (data) {
                        $("#longitude").val(data.lng);
                        $("#latitude").val(data.lat);
                    }
                });
    
  });
```
