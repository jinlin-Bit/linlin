# 琳琳生日祝福网站

一个可爱灵动的生日祝福网站，为我的女朋友琳琳打造。

## 技术栈

- HTML5
- CSS3 (3D动画、Keyframe动画)
- JavaScript (Canvas星空、粒子效果)
- Google Fonts (马善政、ZCOOL快乐体)

## 功能特点

- 🌟 流动星空背景与北极星特效
- 🎂 0-19岁成长历程展示
- ✨ 动态蛋糕场景（花瓣飘落、星光闪烁）
- 📱 响应式设计，完美适配手机

## 本地运行

```bash
# 方法1：Python
python -m http.server 8000

# 方法2：Node.js
npm run dev
```

访问 http://localhost:8000

## 部署

### Vercel 部署

1. 访问 [vercel.com](https://vercel.com)
2. 点击 `New Project`
3. 选择本项目文件夹或连接 GitHub 仓库
4. 自动部署完成

### GitHub Pages 部署

1. 推送到 GitHub 仓库
2. 在仓库 Settings → Pages
3. Source 选择 `main` 分支，点击 Save

## 项目结构

```
├── index.html      # 主页面
├── styles.css      # 样式文件
├── script.js       # JavaScript逻辑
├── images/         # 图片资源
│   ├── cake-bg.jpg
│   └── *.jpg (各年龄段背景)
├── vercel.json     # Vercel配置
└── package.json    # 项目配置
```

## 许可证

MIT License