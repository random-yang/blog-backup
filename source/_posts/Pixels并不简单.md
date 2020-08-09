---
title: Pixels并不简单
date: 2019-01-27 16:03:42
tags:
- front-end
- 开发
- 单位
- 像素
- pixel
---

### 基本概念

#### PX(css pixels)

> **虚拟像素**，可以理解为“直觉”像素，`CSS`和`JS`使用的抽象单位，浏览器内的一切长度都是以`CSS`像素为单位的，`CSS`像素的单位是**px**.

#### DP(device pixels)

> **设备像素（物理像素）**顾名思义，显示屏是由一个个**物理像素**点组成的，通过控制每个像素点的颜色，使屏幕显示出不同的图像，屏幕从工厂出来那天起，它上面的**物理像素点**就固定不变了，单位**pt**.

#### DIP(Device independent Pixel)

> 设备独立像素，也称为逻辑像素，简称`dip`
>
> **CSS像素 = 设备独立像素 = 逻辑像素**

#### DPR(device pixels ratio)

> **设备像素比dpr** 描述的是未缩放状态下，`物理像素`和`CSS像素`的初始比例关系
>
> dpr = 设备像素 / css像素
>
> dpr = 屏幕横向设备像素 / 理想视口的宽

![1.0](https://source-hosting.oss-cn-shanghai.aliyuncs.com/Pixels%E5%B9%B6%E4%B8%8D%E7%AE%80%E5%8D%95-1.png)

#### 参考像素

> **参考像素**即为从一臂之遥看解析度为`96DPI`的设备输出（即1英寸96点）时，1点（即1/96英寸）的视角。它并不是1/96英寸长度，而是从一臂之遥的距离处看解析度为`96DPI`的设备输出一单位（即1/96英寸）时视线与水平线的夹角.

通常认为常人臂长为28英寸，所以它的视角是:

(1/96)in / (28in \* 2 \* PI / 360deg) = 0.0213度

![2.0](https://source-hosting.oss-cn-shanghai.aliyuncs.com/Pixels%E5%B9%B6%E4%B8%8D%E7%AE%80%E5%8D%95-2.png)
<small>图片来源：https://github.com/jawil/blog/issues/21</small>

#### PPI(pixels per inch)

> **每英寸像素取值**，更确切的说法应该是像素密度，也就是衡量单位物理面积内拥有像素值的情况.

#### DPI(dot per inch)

> **dpi**：每英寸多少点

### 参考

[CSS像素、物理像素、逻辑像素、设备像素比、PPI、Viewport](https://github.com/jawil/blog/issues/21)
[MDN/window.devicePixelRatio
](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)




