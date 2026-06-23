# Vue3 登录注册系统 - GitHub Pages 部署指南

## 项目概述

这是一个基于 Vue3 + TypeScript + Tailwind CSS 构建的现代化登录注册系统，包含以下功能：

- 用户注册（用户名、邮箱、密码）
- 用户登录（邮箱、密码）
- 登录状态管理（localStorage 持久化）
- 退出登录
- 响应式设计

## 部署步骤

### 第一步：创建 GitHub 仓库

1. 打开 [GitHub](https://github.com/) 并登录
2. 点击右上角的 **New** 按钮创建新仓库
3. 填写仓库名称（建议使用 `login-system`）
4. 选择 **Public**（公开仓库，免费使用 GitHub Pages）
5. 点击 **Create repository**

### 第二步：配置本地项目

确保 `vite.config.ts` 已正确配置：

```typescript
// vite.config.ts
export default defineConfig({
  base: './', // 重要：设置为相对路径
  // ... 其他配置
})
```

### 第三步：构建项目

在项目根目录运行以下命令构建生产版本：

```bash
npm run build
```

构建成功后会生成 `dist` 目录。

### 第四步：安装 gh-pages 工具

```bash
npm install -g gh-pages
```

或作为开发依赖安装：

```bash
npm install --save-dev gh-pages
```

### 第五步：添加部署脚本

在 `package.json` 中添加以下脚本：

```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

### 第六步：部署到 GitHub Pages

运行部署命令：

```bash
npm run deploy
```

首次部署会在 GitHub 仓库中创建一个 `gh-pages` 分支，用于存放静态文件。

### 第七步：配置 GitHub Pages 设置

1. 打开 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单选择 **Pages**
4. 在 **Source** 部分：
   - 选择 **Branch**: `gh-pages`
   - 选择 **Folder**: `/ (root)`
5. 点击 **Save**

### 第八步：访问网站

部署完成后，GitHub 会显示网站地址，格式为：

```
https://<你的用户名>.github.io/<仓库名>/
```

例如：`https://username.github.io/login-system/`

## 注意事项

1. **路由模式**：由于 GitHub Pages 使用静态文件托管，路由必须使用 `createWebHistory()` 模式。项目已正确配置。

2. **base 路径**：`vite.config.ts` 中的 `base: './'` 确保所有资源路径都是相对路径，避免部署后资源加载失败。

3. **数据存储**：当前项目使用浏览器 localStorage 存储用户数据，刷新页面后会自动恢复登录状态。但数据只存储在本地浏览器中，换设备或清除浏览器数据后需要重新登录。

4. **更新部署**：每次修改代码后，重新运行 `npm run build && npm run deploy` 即可更新网站。

## 常见问题

### Q: 部署后页面空白？

A: 检查 `vite.config.ts` 是否设置了 `base: './'`，并确保构建过程没有报错。

### Q: 路由跳转后 404？

A: 这是 GitHub Pages 静态托管的常见问题。由于使用了 History 模式，直接访问子路由会返回 404。当前项目已通过配置 `base: './'` 和 Vue Router 的 History 模式解决。

### Q: 如何自定义域名？

A: 在 GitHub Pages 设置中，找到 **Custom domain** 输入框，输入你的域名，并在域名 DNS 解析中添加 CNAME 记录指向 `<你的用户名>.github.io`。

## 技术栈

- Vue 3.4+
- TypeScript
- Vue Router 4
- Tailwind CSS 3
- Lucide Vue Next（图标库）
- Vite 5

## 项目结构

```
src/
├── composables/
│   └── useAuth.ts        # 用户认证状态管理
├── pages/
│   ├── HomePage.vue      # 首页
│   ├── LoginPage.vue     # 登录页
│   └── RegisterPage.vue  # 注册页
├── router/
│   └── index.ts          # 路由配置
├── App.vue               # 根组件
├── main.ts               # 入口文件
└── style.css             # 全局样式
```