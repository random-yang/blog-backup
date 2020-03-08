---
title: '[译]使用WebGL创建伪3D图像效果'
date: 2020-03-08 13:18:32
top: true
tags:
  - WebGL
  - 3D
  - Graphic
  - glsl
photos:
  - https://source-hosting.oss-cn-shanghai.aliyuncs.com/Fake3dEffect_featured.jpg
---

> 原文：https://tympanus.net/codrops/2019/02/20/how-to-create-a-fake-3d-image-effect-with-webgl/

学习如何用原生 WebGL 为具有深度映射的图像创建交互式伪 3D 效果。

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/Fake3dEffect_featured.jpg)

> demo: http://tympanus.net/Tutorials/Fake3DEffect/[译者注：强烈建议你点进去看看！]
> Get 源代码: http://tympanus.net/Tutorials/Fake3DEffect/Fake3DEffect.zip

如今，WebGL 变得非常流行，因为它让我们能够为 Web 创建独特的交互式图形。您可能已经看到使用[Blotter.js 创建文字失真效果](https://tympanus.net/codrops/2019/02/06/text-distortion-effects-using-blotter-js/)或使用[THREE.MeshLine 库创建的 WebGL 动画曲线](https://tympanus.net/codrops/2019/01/08/animated-mesh-lines/)。今天，您将了解如何直接使用原生 WebGL 快速为图像创建交互式的伪 3D 效果。

如果使用 Facebook，则可能会看到[新闻源和 VR 的 3D 照片](https://facebook360.fb.com/2018/10/11/3d-photos-now-rolling-out-on-facebook-and-in-vr/)更新。借助特殊的电话摄像头，可以捕捉前景中的对象与背景之间的距离，从而使 3D 照片通过景深和微小位移使场景栩栩如生。我们可以使用**任何**照片，一些图像编辑和一点点编码来重新创建这种效果。

通常，这类效果将依赖 Three.js 或 Pixi.js，这两个都是功能强大的库，在编码时具有许多有用且便捷的功能。今天，我们将不使用任何库，而是直接用原生的 WebGL API。

所以，赶快开始吧！

## 画一个平面

所以，为了实现这种效果，我们使用原生的 WebGL API. 这里有个让你入门 WebGL 的好地方 [webglfundamentals.org](https://webglfundamentals.org/). WebGL 通常因其冗长而遭到开发者的抱怨，其实，这是有原因的。所有全屏着色器效果（即使它们是 2D 效果）的基础是某种平面或网格，即所谓的四边形，它在整个屏幕上延伸。通常我们在 Three.js 中编写`THREE.PlaneGeometry(1,1)`来创建 1×1 平面，而我们在原生 WebGL 中需要写：

```js
let vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
let buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
```

现在我们有了平面，我们可以对其应用顶点和片段着色器。

## 准备图像

为了创建 3D 效果，我们需要创建图像的深度图。制作深度图的主要原理是，我们必须根据图像中对象的 Z 坐标来分离图像由近到远的不同部分，从而将前景与背景分隔开。

为此，我们可以通过以下方式在 Photoshop 中打开图像并在原始照片上绘制灰色区域：
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/fake3d_01.gif)
[译者注：其实这里的图片处理非常重要，将会直接影响到最后的效果。这里，我找到了一个[如何在 photoshop 中创建图像的深度图](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=2ahUKEwjXkpWAroroAhVLL6YKHftmBMkQwqsBMAB6BAgKEAQ&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLQ0RuWf-J1k&usg=AOvVaw2aUR2TWSNuh9NvqC3xLrML)的简易教程]

此图显示了一些山脉，在这些山脉中您可以看到图中对象离相机越近，深度图中的区域绘制得越亮。在接下来的一部分中，让我们看看为什么这种阴影很有意义。

## 编写着色器

渲染逻辑主要发生在着色器中。如 MDN 网站文档所述：

> 着色器是使用 OpenGL ES 着色语言(GLSL)编写的程序，该程序获取有关构成形状的顶点的信息，并生成将像素渲染到屏幕上所需的数据：即像素的位置及其像素颜色。绘制 WebGL 内容时，有两个着色器功能运行：顶点着色器和片段着色器。

了解着色器的一个很好的资源是 [The Book Of Shaders](https://thebookofshaders.com/)。

顶点着色器的作用在这并不复杂。它只显示顶点：

```glsl
attribute vec2 position;
    void main() {
    gl_Position = vec4(position, 0, 1);
}
```

最有趣的部分将发生在片段着色器中。我们将在片段着色器中加载两张图片：

```glsl
void main(){
    vec4 depth = texture2D(depthImage, uv);
    gl_FragColor = texture2D(originalImage, uv); // 只是显示原图
}
```

需要指明的是，深度图图像是黑白的。对于着色器，颜色只是一个数字：1 是白色，0 是深黑色。uv 变量是一个二维映射，用于存储有关要显示哪个像素的信息。通过这两件事，我们可以使用深度信息稍微移动原始照片的像素。

让我们从鼠标移动开始：

```glsl
vec4 depth = texture2D(depthImage, uv);
gl_FragColor = texture2D(originalImage, uv + mouse); // 译者注：这里每一个顶点的位移都是完全相同的
```

[译者注：[关于 uv](http://wiki.winamp.com/wiki/Pixel_Shader_Basics#UV_Coordinates)]
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/fake3d_002.gif)

现在让我们添加深度信息：

```glsl
vec4 depth = texture2D(depthImage, uv);
gl_FragColor = texture2D(originalImage, uv + mouse*depth.r);
```

该见证奇迹了：
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/fake3d_03.gif)

因为 depth 纹理是黑白的，所以我们可以采用红色通道`depth.r`，并将其乘以屏幕上的鼠标位置值。这意味着像素越亮，跟随鼠标移动的像素就越多。另一方面，暗色像素只会保留在原位。它的原理是如此简单[译者注：真的简单易懂！]，但是却可以产生令人印象深刻的 3D 图像错觉。

当然，着色器能够能够做的远远不止这，但是我希望你喜欢这个「伪造」的 3D 效果小实验。让我知道您对此有何想法，并希望借此来看看你的创作！

## 参考和鸣谢

- [Gyronorm](https://github.com/dorukeker/gyronorm.js/) library by [Doruk Eker](http://dorukeker.com/)
- Photo by [Cosmic Timetraveler](https://unsplash.com/photos/YK_8mABhrtc)
- Photo by [Chelsea Ferenando](https://unsplash.com/photos/WJRZNL7rDF8)
- Photo by [Rio Syhputra](https://unsplash.com/photos/JnOHvMgw_Jo)
- Photo by [Jonatan Pie](https://unsplash.com/photos/3l3RwQdHRHg)

[在 github 上找到完整的项目](https://github.com/akella/fake3d)

译者说：

这篇文章是继[[译]使用 Three.js 制作有粘稠感的图像悬停效果](http://www.randomyang.top/2019/11/02/译-使用Three-js制作Gooey图像悬停效果/)的又一篇有意思的同类文章。翻译不是目的，因为有了 google translate 文章的英语不在话下，而且该文表达很简单直接，目的是分享我看到的值得分享的好的内容，我个人还是觉得这些东西很有意思的。

该文涉及到的 shader 代码并不复杂，可是思路非常巧妙，进而达到了不错的效果。而且最重要的是，只要你能制作出图像对应的深度图，那么就可以模拟出伪 3D 的效果。如果你能够将图中对象的前后关系颗粒度划分得越细，那么最终得到的效果应该是会越好。

文章首发于个人[blog](http://randomyang.top/2020/03/08/译-使用WebGL创建伪3D图像效果/)，同收录于知乎专栏[前端艺术](https://zhuanlan.zhihu.com/c_1109036567154388992)，如果你对于相关内容感兴趣，欢迎关注订阅。

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/article-tail@3x.png)
