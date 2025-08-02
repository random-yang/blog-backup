---
title: p5.js简易实现 apple watch 三色表盘
date: 2018-07-07 08:29:58
tags: 
- p5.js
- animation 
- Javascript
photos:
- https://source-hosting.oss-cn-shanghai.aliyuncs.com/p5-js%E7%AE%80%E6%98%93%E5%AE%9E%E7%8E%B0-apple-watch-%E4%B8%89%E8%89%B2%E8%A1%A8%E7%9B%98-2.jpg
---

**Content**
[TOC]

 ### apple watch原图欣赏
![apple原图](https://source-hosting.oss-cn-shanghai.aliyuncs.com/p5-js%E7%AE%80%E6%98%93%E5%AE%9E%E7%8E%B0-apple-watch-%E4%B8%89%E8%89%B2%E8%A1%A8%E7%9B%98-1.jpg)

莫名其妙的好看有不！

于是我就想着用js写写看，能否简单的实现这个效果，于是就真的实现了一个很简单（简陋）的效果。

图片预览一下：

![demo截图](https://source-hosting.oss-cn-shanghai.aliyuncs.com/p5-js%E7%AE%80%E6%98%93%E5%AE%9E%E7%8E%B0-apple-watch-%E4%B8%89%E8%89%B2%E8%A1%A8%E7%9B%98-2.jpg)

### p5.js

想要实现上述的简单效果用原生的canvas绘图API也不难实现，但是从实现这个效果来讲，我选用了 ***p5.js*** 这个js动画库。可以帮助你以优雅的方式实现这个效果。将注意力集中在实现效果上，而不是各种偏底层API的调用问题上。

[API查阅](https://p5js.org/reference/)

### CodePen预览

[Demo预览](https://codepen.io/randomyang/pen/QxwgGJ)

Demo很多瑕疵，欢迎fork修改、自由创作、使优秀...

### 代码
代码部分其实很简单，根据注释稍微看看就能明白，大致分为：
1. 得到当前时间
* 小时（注意24进制和表盘的12进制）
* 分钟
* 秒（我这里其实是获取的毫秒，为了平滑秒针的运动）
2. 将时间映射(map)到角度
3. 调用p5.js的绘图API，传入角度等参数
4. p5.js利用canvas绘制动画

### 注意
在p5.js的绘图函数`arc()`中，有个bug

```
arc(x, y, xd, yd, start_angle, end_angle);
```
在这个函数中当`start_angle == end_angle`时会有一个bug，特定的我测试当`start_angle == end_angle == -PI/2`时会绘制一个**半圆**，但是显然这是不对的，当`start_angle == end_angle`时，我们应该什么都不绘制。

后来我到官方github仓库上，发现一个[issue](https://github.com/processing/p5.js/issues/2919)提到的就是关于这个问题。


最后我修改了映射区间避免了`start_angle == end_angle == 0`,从0 -> 360 改为 1 -> 360
```
secondsAngle = map(secondes, 0, 60 * 1000, 1, 360);
minitesAngle = map(minites, 0, 60, 1, 360);
hoursAngle = map(hours % 12, 0, 12, 1, 360);
```

> 最后等我写完了我才发现，这东西看不了时间，一看官方也不是用来看时间用的—.— 






