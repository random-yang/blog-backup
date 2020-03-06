---
title: hexo博客主题「paper」的设计与开发
date: 2019-12-01 16:48:48
top: true
tags:
- design
- blog主题
photos:
- https://source-hosting.oss-cn-shanghai.aliyuncs.com/20191214174027.png
---

![](http://source-hosting.oss-cn-shanghai.aliyuncs.com/Paper-showcase.png)

> *虽然麻烦，但是我还是写了个自己的博客主题叫[Paper](https://github.com/OfficialYoungX/paper)*

[hexo的theme](https://hexo.io/themes/)里面有接近300个主题，逛了一圈，似乎还是没有找到自己心仪的。看来看去，好像也就几个大的风格占了主要的比例。例如，Material Design、卡片布局、大图Landing，等等。

这些风格似乎都是近几年比较流行的博客风格，但可能是因为用的人太多，我有点审美疲劳了。趁着自己好像有点设计能力，决定写一个自己的博客主题。

这篇文章记录一下设计思想、设计过程、编码相关(其实这不是重点)。

### 设计
**Q&A**
Q：主题是什么风格？
A：paper-like，随便翻译一下可以翻译为“类纸化”风格。主要体现在排版以及一些线条的使用上。排版借鉴了报纸的排版风格。

Q：具体参考了哪个报纸的排版设计？
A：我当时其实就是随便google了一张报纸，然后就开始设计了。链接我也给忘了，后面补上，长这样。
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/20191214174027.png)
其实现在想起来，我当时应该多参考几个，不过已经有点晚了，这一点比较后悔。

Q：使用什么设计工具？
A：当下比较流行的UI矢量绘图工具[sketch](https://www.sketch.com)。就是一个画UI比较方便的绘图工具。用什么工具不太重要，画出来像你想的那样就行了。

Q：设计稿长什么样？
A：这样：
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/20191214182734.png)
最终的真实页面并非和设计稿长得完全一样，因为中途编码的过程中一些小的想法有变化。并且个人感觉，也没必要完全和设计稿一样，尤其是当设计师和开发人员是同一个人的时候。。。

**排版**
如上所述，完全“模仿”和“魔改”的如图的报纸排版设计。作出好的排版实在是太难了，设计能力不够，所以就只有借鉴一下了。

**字体**
字体又是一个大坑，我看上的好的字体都要收费。无奈之下只能暂时选择中规中矩的通用方案`font-family: "SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif`
行高上我还是下了一定的功夫，因为行高对于阅读体验的影响比较大。参考了这位[大佬](https://canisminor.cc/blog/posts/20180820_canisminor)(真大佬，是谁我也不清楚，反正大佬)博客上的行高算法，感觉最有道理，最能说服我。
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/20191214180635.png)
按照上图的计算，最后将字号和行高设定为stylu中的变量
```styl
// font-size
$font-size-s-1 = 1.4rem
$font-size-s-2 = 1.6rem
$font-size-s-3 = 1.8rem

$font-size-m-1 = 2.2rem
$font-size-m-2 = 2.8rem
$font-size-m-3 = 3.4rem
$font-size-m-4 = 4.2rem

$font-size-l-1 = 5.2rem
$font-size-l-2 = 6.4rem
$font-size-l-3 = 7.8rem

// line-height
$line-height-s-1 = 2.2rem
$line-height-s-2 = 2.4rem
$line-height-s-3 = 2.6rem

$line-height-m-1 = 3.0rem
$line-height-m-2 = 3.6rem
$line-height-m-3 = 4.4rem
$line-height-m-4 = 5.6rem

$line-height-l-1 = 6.6rem
$line-height-l-2 = 8.2rem
$line-height-l-3 = 10rem
```
再写一个stylu函数，在之后的样式中引用就好了：
```styl
text-size(n)
  if n == 's-1'
    font-size: $font-size-s-1
    line-height: $line-height-s-1
  else if n == 's-2'
    font-size: $font-size-s-2
    line-height: $line-height-s-2
  else if n == 's-3'
    font-size: $font-size-s-3
    line-height: $line-height-s-3
  else if n == 'm-1'
    font-size: $font-size-m-1
    line-height: $line-height-m-1
  else if n == 'm-2'
    font-size: $font-size-m-2
    line-height: $line-height-m-2
  else if n == 'm-3'
    font-size: $font-size-m-3
    line-height: $line-height-m-3
  else if n == 'm-4'
    font-size: $font-size-m-4
    line-height: $line-height-m-4
  else if n == 'l-1'
    font-size: $font-size-l-1
    line-height: $line-height-l-1
  else if n == 'l-2'
    font-size: $font-size-l-2
    line-height: $line-height-l-2
  else if n == 'l-3'
    font-size: $font-size-l-3
    line-height: $line-height-l-3
```

**色彩**
官方提供了6种可配置的颜色，都是大自然的颜色！灵感来源就是大自然啊。如果你一个都不喜欢，那就自己去代码里面改了。
```bash
# theme color
main_color: default # forest | grass | sky | sun | sea
```
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/paper-github-4.png)


**对于自己设计的评价(tu cao)**
- 拼命想设计出paper的感觉，但是又不够paper。心有余而力不足，设计能力还是欠佳。
- 字体没有好好的琢磨，采用了比较通用的方案。导致整体设计缺少精致感。
- 阅读体验不够好，比如没有目录等等。精力有限，后续可能会加上。
- ...


### 编码部分
**hexo主题的开发**
其实设计才是最难的部分，编码反而简单，只是有点“烦人”。因为开发hexo的主题，用的是以前的前端开发方式——写模版。对我来说，还是第一次写这种模版，而我已经习惯了基于vue、react的单页面开发模式。所以会感觉比较“烦人”。不过其中有很多思想也是相似的，例如，组件化的思想。

hexo主题的开发，网络上已经有很多相关的文章，我也没必要再说一遍。这里推荐一篇博客，几乎涵盖了所有开发相关的问题。
> [https://molunerfinn.com/make-a-hexo-theme/](https://molunerfinn.com/make-a-hexo-theme/)

**darkmode**
开启的地方在这：
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/20191214193636.png)
这里算是一个小彩蛋，具体的实现方式可以到代码里面去看，就几十行。
不过可以告知的是，**我并没有**修改页面中元素自身的css。例如字体颜色`color`，我并没有去修改这个属性。而是给全局加了个“滤镜”。

我个人认为这个方法还是比较巧妙的。其实就是一种偷懒的行为，因为我不想再去单独的针对darkmode设计多套配色。加一层“滤镜”可以在偷懒和效果之间达到一种比较好的平衡。效果肯定是比不上针对darkmode去重新搭配颜色的，但是也还过得去，不是吗。

其实关于编码部分，真的没有太多的感悟，就是照着自己的设计去一点点实现。

### btw
最后，如果你真的觉得paper不错，那还是欢迎使用，再过分一点还可以点赞。但是我要提醒你，它真的不太好“用”😂，后面有时间再优化吧。具体使用相关的信息可以在[github](https://github.com/OfficialYoungX/paper)上找到。

这篇文章除了介绍自己好不容易完成的主题以外，还是想告诉大家，下次找不到自己觉得好看的主题，不如试试自己的写一个。过程是挺烦的，但是最后完成了还是开心的。不管它有没有人用，别人觉得怎么样，自己看到都会很有成就感。毕竟就算是只有你一个人用你自己的主题，那你的博客主题就是独一无二的啊。

![tail](https://source-hosting.oss-cn-shanghai.aliyuncs.com/article-tail@3x.png)

