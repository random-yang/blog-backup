---
title: CSS3 mix-blend-mode 初探
date: 2018-07-07 08:27:10
tags: 
- mix-blend-mode
- css3
- front-end
---

**Content**
[TOC]

关于了一个我知道，但是从来没有用过的css3属性`mix-blend-mode`。做了一个小demo，再一次被css3 的强大所征服。

经常做图片处理的人，比如用photoshop处理图片，对**混合模式**一定不会陌生。在css3中，属性`mix-blend-mode`其实就是ps中的**混合模式**（比如图层的混合模式）。 

### 混合模式Demo效果截图

* OVERLAY

![image_1](https://source-hosting.oss-cn-shanghai.aliyuncs.com/CSS3-mix-blend-mode-%E5%88%9D%E6%8E%A2-1.jpg)

* SOFT-LIGHT

![image_2](https://source-hosting.oss-cn-shanghai.aliyuncs.com/CSS3-mix-blend-mode-%E5%88%9D%E6%8E%A2-2.jpg)

* HUE

![image_3](https://source-hosting.oss-cn-shanghai.aliyuncs.com/CSS3-mix-blend-mode-%E5%88%9D%E6%8E%A2-3.jpg)


### 在线演示Demo

[codepen](https://codepen.io/randomyang/pen/RJrwJo)预览

这个demo很简单，一看应该就明白。透过不同的滤镜蒙版来显示渲染下面的背景图。这里的我随便找了一张色彩比较丰富的图片。某些混合模式下面还意外的得到了更加酷炫的效果。

（图片来源于[unsplash](https://unsplash.com/)）

### 参考

* [https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
* [https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode)

### 说在最后
* 这里容易忽略的一点是，mask_div里面的文字也对下面的背景进行了混合，所以有的效果下，文字几乎看不见。
* `background-blend-mode` 和这里提到的`mix-blend-mode`极其的相似，不过前者是作用于背景，而后者作用于重叠的元素之间。
* 这里不得不提到的另一个属性`isolation`，这个属性并我好像还没有怎么完全弄清楚如何去理解和使用。但是很多情况下是要搭配上面两个属性使用的。
