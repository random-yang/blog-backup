---
title: Design Web in the Web
date: 2020-05-23 00:03:42
top: true
photos: 
- https://source-hosting.oss-cn-shanghai.aliyuncs.com/design-web-in-the-web-figma.png
tags:
- UI设计
- 设计工具
- design
---

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/design-web-in-the-web-figma.png)

> Q：为什么一篇全中文的文章要用英文标题？
>
> A：因为“在web中设计web”，“在网页中设计网页”、“基于网页的设计工具”、“在网页中做设计”、“在浏览器中设计网页”等等都显得这篇文章将要讲一个古老的东西，而事实上我想讲的东西应该并不古老。

这篇文章主要讲解，在2020年，基于web的UI设计工具[Figma](https://www.figma.com/blog/)到底能做到什么程度(在我的认识里Figma是基于web的UI设计工具中的佼佼者，如果有比这更强的，请务必告知)。

## 同类产品——大名鼎鼎的sketch

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/design-web-in-the-web-sketch-figma.png)

在我发现Figma之前一直使用的是macOS独有的UI设计工具[Sketch](https://www.sketch.com)，Sketch也是一个很棒的UI设计工具，它专注于UI设计(而非像photoshop一样的图形处理)。Sketch还提出了symbol的概念，这类似于前端开发中“组件”思想，基于symbol你可以构建可复用的设计素材甚至是设计系统、设计规范。例如，很多有名的组件库，国内的antd，google的material design等等都提供了Sketch格式的组件库，这给基于相关组件库设计的设计师提供了便捷。

总之Sketch大概有这些优点：专注于UI设计、矢量绘制、symbol功能、丰富的插件生态。

说完了这些优点，再讲一讲Sketch的缺点。

1. 插件开发不友好。如果你是一个开发过Sketch插件的前端工程师，那我觉得你应该会赞同这个观点。不友好体现在几个方面：
   * 插件开发文档写得烂。官方虽然提供了js的api但是单纯的js能做的事情非常有限，要想开发比较复杂的插件，仅仅是js就不行了。
   * 开发插件要你“全栈”。这里不是指前后端那种全栈，而是你可能需要横跨几种开发语言，你可能需要用到Cocoscript、Objective-c或者是Swift。
   * api变动大。有些著名的sketch插件项目因为官方更新api变化过大，而放弃维护。
2. 性能差。当一个画布中，建立了比较多的画板时(和Figma比是很差的)，整个画布的操作就会变得很卡顿。有时候偶尔还会因为内存占用过大(也就十几个G？)而崩溃。
3. 前后版本文件可能不兼容。新版的Sketch创建的文件，有可能就在老一点版本的Sketch中无法打开。
4. 分享设计不方便。在不使用什么插件的情况下，你需要将你的sketch文件保存下来，然后发送给你要分享的对象。
5. 不支持跨平台。截止到本文，Sketch只支持macOS，win的设计师同学是只能用Adobe XD或者是其他的同类产品。
6. ...(等等由于比较久没用Sketch了，它新出的缺点暂时不了解)

花了不小的篇幅来介绍Sketch是因为无对比无伤害，下面回到Figma。

## Figma做到了及格

第一次看到Figma的时候我还在美滋滋地使用Sketch，心想，你一个基于web的东西还能不卡？你一个基于web的东西功能还能不阉割？你一个基于web的东西能解决本地字体的调用问题？可是现实就是Figma反手给了我3个耳光。Figma不仅消除了我提到的这几个顾虑而且还解决得很好。

**先说，性能**

这一点是我以及很多人怀疑的一点，我本人也是主前端方向的，一直也都觉得基于web的应用不可能做得了什么“重”的工具。对于web来说，一个完整的UI设计工具已经称得上是“重”了。

Figma的性能出乎意料的好。下面是随手做的缩放测试，测试素材来自[Material Design 2.0 Theming kit](https://www.figma.com/resources/assets/material-design-themeing-ui-kit/)的Figma版本。(需要说明的是，由于录屏和转换gif的原因，实际的效果要比你看到的gif流畅得多)

components页面的32个画板，每一个画板上面都是有很多元素的：
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/design-web-in-the-web-suofangyanshi-1.gif)

全选32个画板，复制得到64画板：
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/design-web-in-the-web-suofangyanshi-2.gif)

居然还不卡，然后全选64个画板复制得到128个画板：
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/design-web-in-the-web-suofangyanshi-3.gif)

可以看到缩放仍然流畅。虽然仅仅测试缩放并不能完全体现性能的方方面面，但是足以说明问题。

**再说，功能**

前面讲的Sketch的所有的功能和优点Figma同样都有，只不过是名字不同罢了。例如symbol、矢量绘制、插件生态等等。所以说，功能上丝毫没有因为基于web而阉割。

**本地字体调用**

对于桌面软件来说，调用本本地的字体应该不算什么难事，但是对于基于web的应用，在浏览器中调用本地字体就没那么直接了。所以Figma专门为此开发了[Figma Font Helper](https://help.Figma.com/hc/en-us/articles/360039956894-Use-Local-Fonts-with-Figma-Font-Helper)插件，可以让运行在浏览器的Figma直接调用本地字体。

至此，我所担忧的几个问题，似乎都被Figma解决了。但是仅仅解决我所担忧的只能证明他做到了“及格”，要想评价为“优秀”，这些是不够的。

## Figma称得上优秀
Figma做到了及格是因为它满足了目前UI设计的基本需求。下面我们从与Sketch的对比中看看Figma为什么称得上优秀。

前文吐槽的Sketch的几个缺点，插件开发不友好、性能差、前后版本文件可能不兼容、分享设计不方便、不支持跨平台，Figma似乎都不存在这些缺点。这些也就自然而然成为了Figma的优点。

1. 插件开发友好。[Figma的插件开发文档](Design-Web-in-the-Web.md)写得非常的完备，而且能够让开发者通过js-api拥有控制绝大多数功能的能力。我只花费了大概10分钟就根据官方的引导，搭建好了开发Figma插件的所需的开发环境。
2. 性能好。这一点前文已经证明。
3. 不存在文件的兼容性问题。由于Figma是基于web的，所以更新是动态化的。可能你下一次刷新网页，就更新了东西，弱化了版本的概念，从感觉上就没有新旧版本。事实上Figma也从来都没出现过文件不兼容的问题。
4. 便捷地分享你的设计。想要分享你的设计，只需要直接点击右上角的share->copy link，Figma就会生成一个[链接](https://www.figma.com/file/NvPXAjKtujHV0q3DMhz0mA/Material-Design-Theme-Kit-Copy?node-id=0%3A1)，拿着这个链接任何人可以在任何浏览器打开并查看你的设计(任何浏览器当然也包括移动端)。需要指出的是，当你打开这个链接的时候，你打开的是一个可以缩放不失真的无限大的画布，而不是一张图片。当原作者更新设计的时候，链接的内容会自动更新。
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/design-web-in-the-web-fenxiang-1.jpg)
5. 天生跨平台。为什么说是天生，因为Figma基于web浏览器，浏览器是跨平台的，那么自然而然的Figma就自动跨平台了。无论你是mac设计师还是win设计师，甚至是linux都可以直接在你的浏览器中使用Figma(配合最新地ipadOS的鼠标，你甚至可以在ipad上设计UI)。

除了改正了Sketch的一些缺点以外，Figma还有一下自身的优点：
1. 协同编辑。Figma允许你和你的设计师小伙伴一起同时编辑同一个文件，这类似于Google docs或者是国内的腾讯文档。
2. 不用下载，也就不用管版本更新的问题。
2. 个人基础版本直接免费使用，且功能上没有任何阉割。升级到Professional或者是Organization才需要付费。

## Figma的不足

1. Figma本身的UI设计，个人认为是不如Sketch做得好的，还有提升空间。不过这个其实无伤大雅，后续Figma也许会在Figma中重新设计他们自己的UI。
2. 截止到本文，墙内无法直接访问Figma。
2. 暂时还没想出来其他的...

## Framer

既然说到了设计，仅仅是UI设计是不够的，至少还有交互设计。所以这里也不得不提到的另一个原型工具[Framer](https://www.framer.com)。恰好，Framer在前不久也发布了它的web版本。但是这篇文章不打算介绍它了，可以告知的是桌面版的Framer是一个很好的原型交互设计工具，web版的Framer也同样优秀。
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/design-web-in-the-web-figma-framer.png)
Figma和Framer之间也可以无缝的配合，只需要在Figma中授权Framer，然后在Framer中粘贴Figma项目链接，之后就可以将你的设计导入到Framer中，继续进行下一步的交互设计工作。

## 最后

如果你对构建Figma的技术细节感兴趣，可以访问他们的[技术Blog](https://www.figma.com/blog/section/engineering/)，里面有很多和Figma相关的技术文章。由于作者被技术掐住了命运的咽喉，所以本文就暂时不再从技术层面进行分析了。

至此，基本的设计工具(我知道设计肯定不只是UI和交互)在web端算是完整了。设计师可以完全在浏览器中实现**Design Web in the Web**的目标，想一想觉得还是很有意思。基于文章的分析和对比，我认为未来Sketch是会被类似于Figma这样的基于web的设计工具所取代的，因为我完全找不到任何理由再继续使用Sketch。

目前有很多国内的公司还没使用Figma，原因我认为有下：
1. 设计资源需要上传到Figma的服务器里，有些公司是不会将设计资源放在公司外网的。
2. 体量稍大的公司内部有依赖Sketch开发的插件和自建资产管理系统，迁移的成本相对较高。

还记得我在第一次使用Figma的时候，它给我的感受是很惊艳的，倒不是说视觉设计惊艳，而是一个基于web的设计工具能做到这样的体验，甚至超越了基于桌面端的同类产品。作为一个前端开发者来说，我深知做出这样产品难度有多大。

如果你尝试过了Sketch、Adobe XD等一系列桌面端工具觉得还没找到最顺手的UI设计工具，不妨试试Figma！(Figma打钱！)

> 文章同发于知乎专栏[前端艺术](https://zhuanlan.zhihu.com/c_1109036567154388992)(我认为这也是艺术，工程实现的艺术！)，©️转载请注明出处，谢谢～

![tail](https://source-hosting.oss-cn-shanghai.aliyuncs.com/article-tail@3x.png)