---
title: '[译]使用Three.js制作有粘稠感的图像悬停效果'
date: 2019-11-02 22:40:02
photos:
- https://source-hosting.oss-cn-shanghai.aliyuncs.com/ThumbnailGooeyHoverEffect.jpg
top: true
tags:
- glsl
- webGL
- Graphic
---

# [译]使用Three.js制作有粘稠感的图像悬停效果

> 原文链接：https://tympanus.net/codrops/2019/10/23/making-gooey-image-hover-effects-with-three-js/

**学习如何使用噪声在着色器中创建粘稠的悬停效果。**

![ThumbnailGooeyHoverEffect](https://source-hosting.oss-cn-shanghai.aliyuncs.com/ThumbnailGooeyHoverEffect.jpg)

[查看在线演示](https://tympanus.net/Tutorials/GooeyImageHoverEffects/)or[下载源码](https://github.com/Aqro/gooey-hover-codrops)

作为Flash的替代者webGL在近几年随着像Three.js, PIXI.js, OGL.js这样的库而变得越来越火。它们对于创建*空白板*非常有用，唯一的限制只有你的想象力。我们看到越来越多的WebGL创建的效果微妙地集成到交互界面中，以进行悬停，滚动或显示效果。比如 [Hello Monday](https://www.hellomonday.com/) 或者是 [cobosrl.co](https://www.cobosrl.co/).

在本教程中，我们将使用Three.js创建特殊的粘稠纹理，将其用于在悬停时显示另一幅图像。你现在就可以点击演示链接，去看看真实的效果！对于演示本身，我创建了一个更实际的示例，该示例显示了带有图像的水平可滚动布局，其中每个图像都有不同的效果。你可以单击图像，它将变换为更大的版本，同时显示一些其他内容（Mock出的内容）。我们将会带你了解这个效果最有趣的部分，这样你就可以知道它是如何工作的，并且可以自己创建更多的效果！

我假设你对Javascript, Three.js以及着色器有一定的了解。如果你不了解，那么你可以先看看 [Three.js documentation](https://threejs.org/docs/), [The Book of Shaders](https://thebookofshaders.com/), [Three.js Fundamentals](https://threejsfundamentals.org/) 或者 [Discover Three.js](https://discoverthreejs.com/book/contents/).

> **注意:**本教程涵盖了许多部分。如果愿意，可以跳过HTML / CSS / JavaScript部分，直接转到着色器部分。

## 在 DOM 中创建场景(scene)

在我们创建有趣的东西之前，需要在HTML中插入图片。在HTML / CSS中设置初始位置和尺寸，比在JavaScript中定位所有内容更容易处理场景大小。此外，样式部分应该只在CSS中定义，而不要在Javascript中。例如，如果我们的图片在桌面端的比例为16：9，而在移动设备上的比例为4：3，我们只应该使用CSS来处理。 JavaScript将仅用于请求更新数据。

```html
// index.html

<section class="container">
	<article class="tile">
		<figure class="tile__figure">
			<img data-src="path/to/my/image.jpg" data-hover="path/to/my/hover-image.jpg" class="tile__image" alt="My image" width="400" height="300" />
		</figure>
	</article>
</section>

<canvas id="stage"></canvas>
```

```css
// style.css

.container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
	z-index: 10;
}

.tile {
	width: 35vw;
	flex: 0 0 auto;
}

.tile__image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}

canvas {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	z-index: 9;
}
```

正如你在上面看到的，我们已经创建了一个位于在屏幕居中的图像。稍后我们将利用data-src和data-hover属性，通过延迟加载在脚本中加载这两个图像。

[![标签用法](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/step-00-xhkcr)

## 在 JavaScript 中创建场景(scene)

让我们从不那么容易但也不算难的部分开始吧！首先，我们将创建场景，灯光和渲染器。

```js
// Scene.js

import * as THREE from 'three'

export default class Scene {
	constructor() {
		this.container = document.getElementById('stage')

		this.scene = new THREE.Scene()
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.container,
			alpha: true,
	  })

		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.setPixelRatio(window.devicePixelRatio)

		this.initLights()
	}

	initLights() {
		const ambientlight = new THREE.AmbientLight(0xffffff, 2)
		this.scene.add(ambientlight)
	}
}
```

这是一个非常基本的场景。但是我们在场景中还需要一个基本的元素：相机。我们有两种可以供选择的相机：正射或透视。如果我们想让图片保持形状不变，我们可以选择第一种。但是对于旋转效果，我们希望在移动鼠标时具有一定的透视效果。

在带有透视相机的Three.js（或者其他用于WebGL的库）中，屏幕上的10个单位值并不等于10px。因此，这里的技巧是使用一些数学运算将1单位转换为1px，并更改视角以增加或减少失真效果。

```js
// Scene.js

const perspective = 800

constructor() {
	// ...
	this.initCamera()
}

initCamera() {
	const fov = (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI

	this.camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1000)
	this.camera.position.set(0, 0, perspective)
}
```

我们将透视值设置为800，以便在旋转平面时不会产生太大的变形。我们增加的视角越大，我们对扭曲的感知就越少，反之亦然。然后，我们需要做的最后一件事是在每一帧中渲染场景。

```js
// Scene.js

constructor() {
	// ...
	this.update()
}

update() {
	requestAnimationFrame(this.update.bind(this))
	
	this.renderer.render(this.scene, this.camera)
}
```

如果你的屏幕不是黑色的，则说明方法正确！

## 用正确的尺寸创建平面

如上所述，我们必须从DOM中的图像上检索一些其他信息，例如其尺寸和在页面上的位置。

```js
// Scene.js

import Figure from './Figure'

constructor() {
	// ...
	this.figure = new Figure(this.scene)
}
```

```js
// Figure.js

export default class Figure {
	constructor(scene) {
		this.$image = document.querySelector('.tile__image')
		this.scene = scene

		this.loader = new THREE.TextureLoader()

		this.image = this.loader.load(this.$image.dataset.src)
		this.hoverImage = this.loader.load(this.$image.dataset.hover)
		this.sizes = new THREE.Vector2(0, 0)
		this.offset = new THREE.Vector2(0, 0)

		this.getSizes()

		this.createMesh()
	}
}
```

首先，我们创建另一个类，将场景作为属性传递给该类。我们设置了两个新的矢量，尺寸和偏移，用于存储DOM图像的尺寸和位置。

此外，我们将使用TextureLoader来“加载”图像并将其转换为纹理。我们需要这样做，因为我们想在着色器中使用这些图片。

我们需要在类中创建一个方法来处理图像的加载并等待回调。我们可以使用异步功能来实现这一目标，但对于本教程而言，我们将其保持简单。请记住，您可能需要出于自身目的对它进行一些重构。

```js
// Figure.js

// ...
	getSizes() {
		const { width, height, top, left } = this.$image.getBoundingClientRect()

		this.sizes.set(width, height)
		this.offset.set(left - window.innerWidth / 2 + width / 2, -(top - window.innerHeight / 2 + height / 2))
	}
// ...
```

我们在getBoundingClientRect对象中获取图像信息。然后，将它们传递给两个变量。这里的偏移量用于计算屏幕中心与页面上的对象之间的距离。(译者：可以补充解释)

```js
// Figure.js

// ...
	createMesh() {
		this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
		this.material = new THREE.MeshBasicMaterial({
			map: this.image
		})

		this.mesh = new THREE.Mesh(this.geometry, this.material)

		this.mesh.position.set(this.offset.x, this.offset.y, 0)
		this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)

		this.scene.add(this.mesh)
	}
// ...
```

之后，我们将在平面上设置值。如您所见，我们在1px上创建了一个平面，该平面上有1行1列。由于我们*不想*使平面变形，所以我们不需要很多面或顶点。因此，让我们保持简单。

既然我们可以直接设置网格的大小，为什么要用缩放的方式来实现？

其实这么做主要是为了更加便于调整网格的大小。如果我们之后要更改网格的大小，除了用scale没有什么更好的方法。虽然更改网格的比例更容易直接实现，但是用来调整尺寸并不太方便。（译者：作者这里其实是一个很巧妙的做法：直接将原来的大小设置为1x1，然后采用缩放API来让网格变换为实际大小，这样缩放的比例也就等于实际的长宽值）

目前，我们设置了MeshBasicMaterial，看来一切正常。

## 获取鼠标坐标

现在，我们已经使用网格构建了场景，我们想要获取鼠标坐标，并且为了使事情变得简单，我们将其**归一化**。为什么要归一化？看看着色器的坐标系统你就明白了。

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/coordinate-system.jpg)

如上图所示，我们已经将两个着色器的值标准化了。为简单起见，我们将转化鼠标坐标以匹配顶点着色器坐标。

如果你在这里觉得理解有困难, 我建议你去看一看 [Book of Shaders](https://thebookofshaders.com/) 和 [Three.js Fundamentals](https://threejsfundamentals.org/)的各个章节。 两者都有很好的建议，并提供了许多示例来帮助你理解。

```js
// Figure.js

// ...

this.mouse = new THREE.Vector2(0, 0)
window.addEventListener('mousemove', (ev) => { this.onMouseMove(ev) })

// ...

onMouseMove(event) {
	TweenMax.to(this.mouse, 0.5, {
		x: (event.clientX / window.innerWidth) * 2 - 1,
		y: -(event.clientY / window.innerHeight) * 2 + 1,
	})

	TweenMax.to(this.mesh.rotation, 0.5, {
		x: -this.mouse.y * 0.3,
		y: this.mouse.x * (Math.PI / 6)
	})
}
```

对于补间部分，我将使用GreenSock的TweenMax。这是有史以来最好的库。而且非常适合我们想要达到的目的。我们不需要处理两个状态之间的转换，TweenMax会为我们完成。每次移动鼠标时，TweenMax都会平滑更新位置坐标和旋转角度。

[![标签用法](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/step-01-uozmf?from-embed)

在进行后面的步骤之前还有一件事：我们将材质从MeshBasicMaterial更新为ShaderMaterial，并传递一些值（均匀值）和着色器代码。

```js
// Figure.js

// ...

this.uniforms = {
	u_image: { type: 't', value: this.image },
	u_imagehover: { type: 't', value: this.hover },
	u_mouse: { value: this.mouse },
	u_time: { value: 0 },
	u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
}

this.material = new THREE.ShaderMaterial({
	uniforms: this.uniforms,
	vertexShader: vertexShader,
	fragmentShader: fragmentShader
})

update() {
	this.uniforms.u_time.value += 0.01
}
```

我们传递了两个纹理，以及鼠标的位置，屏幕的大小和一个名为`u_time`的变量，该变量将在每一帧进行递增。

但是请记住，这不是最好的方法。我们只需要当我们将鼠标悬停在图形上时增加，而不必在每一帧上增加。出于性能，最好仅在需要时更新着色器。

## 技巧背后的原理及如何使用噪声

我不会解释什么是噪声以及噪声的来源。如果你有兴趣，请探究《 The Shader of Shaders》中的[相关章节](https://thebookofshaders.com/11/)，它进行了很好的解释。

长话短说，噪声是一个函数，它根据传递的值为我们提供介于-1和1之间的值。它将输出随机但却又相关的值。

多亏了噪声，我们才能生成许多不同的形状，例如地图，随机图案等。

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/noise-example1-e1570735927299.jpg)
![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/noise-example2-e1570735958909.jpg)

让我们从2D噪声开始。仅通过传递纹理的坐标，我们就可以得到类似云的纹理。

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/noise-result1.jpg)

但事实上有好几种噪声函数。我们使用3D噪声，再给一个参数，例如…时间？噪声图形将随着时间的流逝而变化。通过更改频率和幅度，我们可以进行一些变化并增加对比度。

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/noise-result2.jpg)

其次，我们将创建一个圆。在片段着色器中构建像圆形这样的简单形状非常容易。我们只是采用了《 The Shader of Shaders：Shapes》中的功能来创建一个模糊的圆，增加对比度和视觉效果！

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/noise-result3.jpg)

最后，我们将这两个加在一起，使用一些变量，让它对纹理进行“切片”：

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/noise-result4-e1570736096227.jpg)

这个混合之后的结果是不是很让人兴奋，让我们深入到代码层面继续探究！

## 着色器

我们这里确实不需要顶点着色器，这是我们的代码：

```glsl
 // vertexShader.glsl
varying vec2 v_uv;

void main() {
	v_uv = uv;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

Three.js的ShaderMaterial提供了一些有用的默认变量，便于初学者使用：

- 位置（vec3）：网格每个顶点的坐标
- uv（vec2）：纹理的坐标
- 法线（vec3）：网格中每个顶点的法线。

在这里，我们只是将UV坐标从顶点着色器传递到片段着色器。

## 创建圆形

让我们使用 [The Book of Shaders](https://thebookofshaders.com/07/)中的函数来构建圆并添加一个变量来控制边缘的模糊性。

此外，我们将用鼠标位置来同步圆心坐标。这样，只要我们将鼠标移到图像上，圆就会跟随鼠标移动。

```glsl
// fragmentShader.glsl
uniform vec2 u_mouse;
uniform vec2 u_res;

float circle(in vec2 _st, in float _radius, in float blurriness){
	vec2 dist = _st;
	return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
}

void main() {
	vec2 st = gl_FragCoord.xy / u_res.xy - vec2(1.);
	// tip: use the following formula to keep the good ratio of your coordinates
	st.y *= u_res.y / u_res.x;

	vec2 mouse = u_mouse;
	// tip2: do the same for your mouse
	mouse.y *= u_res.y / u_res.x;
	mouse *= -1.;
	
	vec2 circlePos = st + mouse;
	float c = circle(circlePos, .03, 2.);

	gl_FragColor = vec4(vec3(c), 1.);
}
```

[![标签用法](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/step-02-engiv)


## 创建一些噪噪噪噪声声声～～

正如我们在上面看到的，噪声函数具有多个参数，并为我们生成了逼真的云图案。那么我们是如何得到的呢？

对于这一部分，我将使用[glslify](https://www.npmjs.com/package/glslify)和[glsl-noise](https://www.npmjs.com/package/glsl-noise)，以及两个npm包来包含其他功能。它使我们的着色器更具可读性，并且隐藏了很多我们根本不会使用的显示函数。

```glsl
// fragmentShader.glsl
#pragma glslify: snoise2 = require('glsl-noise/simplex/2d')

//...

varying vec2 v_uv;

uniform float u_time;

void main() {
	// ...

	float n = snoise2(vec2(v_uv.x, v_uv.y));

	gl_FragColor = vec4(vec3(n), 1.);
}
```



![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/noise-result5.jpg)

通过更改噪声的幅度和频率（比如于sin / cos函数），我们可以更改渲染。

```glsl
// fragmentShader.glsl

float offx = v_uv.x + sin(v_uv.y + u_time * .1);
float offy = v_uv.y - u_time * 0.1 - cos(u_time * .001) * .01;

float n = snoise2(vec2(offx, offy) * 5.) * 1.;
```

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/noise-result6.jpg)

但这并时间的函数！它失真了，我们想要出色的效果。因此，我们将改为使用noise3d并传递第三个参数：时间。

```glsl
float n = snoise3(vec3(offx, offy, u_time * .1) * 4.) * .5;
```

## 合并纹理

只要将它们叠加在一起，我们就可以看到随时间变化的有趣的形状。

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/noise-result7.jpg)

为了解释其背后的原理，让我们假设噪声就像是在-1和1之间浮动的值。但是我们的屏幕无法显示负值或大于1（纯白色）的像素，因此我们只能看到0到1之间的值。

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/explanation-noise1.jpg)

我们的圆形则像这样：

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/explanation-noise2.jpg)

相加之后的近似结果：

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/explanation-noise3.jpg)

我们非常白的像素是可见光谱之外的像素。

如果我们减小噪声并减去少量噪声，它将逐渐沿波浪向下移动，直到其消失在可见颜色的范围之内。

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/noise-result8.jpg)

```glsl
float n = snoise(vec3(offx, offy, u_time * .1) * 4.) - 1.;
```

我们的圆形仍然存在，只是可见度比较低。如果我们增加乘以它的值，它将形成更大的对比。

```glsl
float c = circle(circlePos, 0.3, 0.3) * 2.5;
```

![](https://source-hosting.oss-cn-shanghai.aliyuncs.com/noise-result9.jpg)

我们就实现我们最想要的效果了！但是正如你看到的，仍然缺少一些细节。而且我们的边缘一点也不锐利。

为了解决这个问题，我们将使用 [built-in smoothstep function](https://thebookofshaders.com/glossary/?search=smoothstep)。

```glsl
float finalMask = smoothstep(0.4, 0.5, n + c);

gl_FragColor = vec4(vec3(finalMask), 1.);
```

借助此功能，我们将在0.4到0.5之间切出一部分图案。这些值之间的间隔越短，边缘越锐利。

[![标签用法](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/step-03-xpfc8)

最后，我们可以将混合两个纹理用作遮罩。

```glsl
uniform sampler2D u_image;
uniform sampler2D u_imagehover;

// ...

vec4 image = texture2D(u_image, uv);
vec4 hover = texture2D(u_imagehover, uv);

vec4 finalImage = mix(image, hover, finalMask);

gl_FragColor = finalImage;
```

我们可以更改一些变量以产生更强的粘稠效果：

```glsl
// ...

float c = circle(circlePos, 0.3, 2.) * 2.5;

float n = snoise3(vec3(offx, offy, u_time * .1) * 8.) - 1.;

float finalMask = smoothstep(0.4, 0.5, n + pow(c, 2.));

// ...
```

[![标签用法](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/step-04-9gyz8)

在这里可以找到[完整的源码](https://github.com/Aqro/gooey-hover-codrops)

## 最后
很高兴你能读到这。这篇教程并不完美，我可能忽略了一些细节，但是我希望你仍然喜欢本教程。基于此，你可以尽情的使用更多变量，尝试其他噪声函数，并尝试使用鼠标方向或滚动发挥你的想象力来实现其他效果！

## 参考以及感谢

- [Images from Unsplash](https://unsplash.com/)
- [Three.js](https://threejs.org/docs/)
- [GSAP from GreenSock](https://greensock.com/)
- [Smooth Scrollbar](https://idiotwu.github.io/smooth-scrollbar/)
- [glslify](https://github.com/glslify/glslify)
- [glsl-noise](https://www.npmjs.com/package/glsl-noise)


![tail](https://source-hosting.oss-cn-shanghai.aliyuncs.com/article-tail@3x.png)

