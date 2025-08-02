import HorizontalLine from "@/components/HorizontalLine";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 | RandomYang",
  description: "关于 RandomYang",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">关于</h1>
      </header>
      
      <HorizontalLine />
      
      <div className="post-content">
        <h2>Hi, 我是 RandomYang</h2>
        
        <p>
          一个热爱编程和设计的开发者，致力于探索技术与美学的结合点。
        </p>
        
        <p>
          在这个博客中，我会分享关于前端开发、创意编程、设计思考等方面的内容。
          希望通过分享，能够与更多志同道合的朋友交流学习。
        </p>
        
        <h3>技术栈</h3>
        <ul>
          <li>前端：React, Vue, Next.js, TypeScript</li>
          <li>创意编程：p5.js, Three.js, WebGL</li>
          <li>设计工具：Figma, Sketch, Adobe Creative Suite</li>
        </ul>
        
        <h3>联系方式</h3>
        <ul>
          <li>GitHub: <a href="https://github.com/random-yang" target="_blank" rel="noopener noreferrer">@random-yang</a></li>
          <li>CodePen: <a href="https://codepen.io/randomyang" target="_blank" rel="noopener noreferrer">@randomyang</a></li>
          <li>Email: <a href="mailto:randomyang@example.com">randomyang@example.com</a></li>
        </ul>
        
        <p>
          感谢你的访问！如果你对我的文章有任何想法或建议，欢迎通过上述方式与我联系。
        </p>
      </div>
    </div>
  );
}