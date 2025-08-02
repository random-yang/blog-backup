---
title: CSS中的几种“滤镜”
date: 2019-02-04 14:51:35
tags:
- css
- filter
- blend-mode
- 总结
- 易混
---

#### filter
应用场景：filter CSS属性将模糊或颜色偏移等图形效果应用于元素。滤镜通常用于调整图像，背景和边框的渲染。
作用对象：作用于使用该属性的**元素本身**
具体应用实例：[DEMO](https://codepen.io/randomyang/pen/ajvdvG)

#### mix-blend-mode
应用场景：mix-blend-mode CSS 属性描述了元素本身应该与元素的背景(元素后面的任何内容)如何混合。
作用对象：作用于使用该属性的**元素本身**
具体应用实例：[DEMO](https://codepen.io/randomyang/pen/RJrwJo)

#### background-blend-mode
应用场景：background-blend-mode CSS属性定义该元素的背景(背景图片、背景色等等)之间如何混合。通常结合`background-image`属性使用。
作用对象：作用于使用该属性的元素的**背景**
具体应用实例：[DEMO](https://codepen.io/randomyang/pen/pLmZjM)

#### 三者的相同点

* 都属于Blend混合效果的“滤镜”(这里所讲的滤镜不仅仅指`filter`属性)
* 都用通过某种形式，改变元素的显示效果
* 都可以混合使用，多个属性同时叠加作用于同一个元素
* 其中`mix-blend-mode`和`background-blend-mode`更是非常的相似，就连`系统可见值`几乎都是一样的。


#### 三者的不同点
* 作用的对象不同（参见上文）
* `filter`和`mix-blend-mode | background-blend-mode`的`系统可见值`不同
`filter`有：blur | brightness | contrast | drop-shadow | grayscale | hue-rotate | invert | opacity | saturate | sepia
`mix-blend-mode | background-blend-mode`有：normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity;

#### 说明
**`filter`**：
可以类比为你带着各种各样“有色眼镜”，在这种情况下再去观看被添加`filter`属性的元素。
**`mix-blend-mode`**：
可以理解为，在一个像素上同时显示来自两个元素的像素，那么该怎么显示呢？显示什么颜色呢？这就要取决于你的**混合模式**了。
而这两个元素则分别是被设置了`mix-blend-mode`属性的元素及位于其之后的元素。
**`background-blend-mode`**：可以理解为，其他地方和`mix-blend-mode`类似，但是混合的对象不是来自不同的元素，而是来自同一个元素的不同背景层。设置该属性，**不会**影响元素背景之上的元素。

#### 参考
> [混合模式 <blend-mode>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/blend-mode)
> [MDN filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
> [MDN mix-blend-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode)
> [background-blend-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-blend-mode)
