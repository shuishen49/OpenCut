<table width="100%">
  <tr>
    <td align="left" width="120">
      <img src="apps/web/public/logo.png" alt="OpenCut Logo" width="100" />
    </td>
    <td align="right">
      <h1>OpenCut 中文版</span></h1>
      <h3 style="margin-top: -10px;">免费、开源的网页端、桌面端和移动端视频编辑器（中文汉化版）</h3>
    </td>
  </tr>
</table>

---

[![加入QQ群](https://img.shields.io/badge/QQ群-点击加入-blue.svg)](https://qm.qq.com/cgi-bin/qm/qr?k=kSKwz-HRqrddrALgfLqCp7C2-aGZqPlv&jump_from=webapi&authKey=KUwPZ1lgzoIXjwIf/AfQ0UFFhRcUAO8VAdZk2kVdrGHQhxyhlgn30vX1SCX5Lu8d) (群号: 83958598)


## 📢 关于本项目

本项目是 **[OpenCut](https://github.com/OpenCut-app/OpenCut)** 的中文汉化版本。

**汉化目的：**
- 为中文用户提供更友好的使用体验
- 降低中文用户的使用门槛
- 推广开源视频编辑解决方案在中文社区的应用
- 保持与原项目同步更新

**原项目地址：** https://github.com/OpenCut-app/OpenCut

---

## 为什么选择 OpenCut？

- **隐私保护**：视频完全保存在本地设备，不会上传到云端
- **完全免费**：所有功能免费使用，没有付费墙限制（不像剪映的很多功能需要付费）
- **简单易用**：注重用户体验，操作简单直观

## 功能特性

- ✨ 基于时间轴的编辑功能
- 🎬 多轨道支持
- ⚡ 实时预览
- 🚫 无水印、无订阅
- 📊 由 [Databuddy](https://www.databuddy.cc?utm_source=opencut) 提供匿名化分析
- 📝 博客功能由 [Marble](https://marblecms.com?utm_source=opencut) 无头 CMS 驱动

## 项目结构

- `apps/web/` – 主要的 Next.js Web 应用
- `src/components/` – UI 和编辑器组件
- `src/hooks/` – 自定义 React Hooks
- `src/lib/` – 工具函数和 API 逻辑
- `src/stores/` – 状态管理（Zustand 等）
- `src/types/` – TypeScript 类型定义

## 快速开始

### 环境要求

在开始之前，请确保你的系统已安装以下工具：

- [Node.js](https://nodejs.org/zh-cn/) (v18 或更高版本)
- [Bun](https://bun.sh/docs/installation) (npm 的替代方案)
- [Docker](https://docs.docker.com/get-docker/) 和 [Docker Compose](https://docs.docker.com/compose/install/)

> **注意：** Docker 是可选的，但对于运行本地数据库和 Redis 服务是必需的。如果你只是想运行前端或贡献前端功能，可以跳过 Docker 设置。

### 安装步骤

1. Fork 本仓库
2. 克隆到本地
3. 进入 Web 应用目录：`cd apps/web`
4. 复制环境配置文件 `.env.example` 到 `.env.local`：

   ```bash
   # Unix/Linux/Mac
   cp .env.example .env.local

   # Windows 命令提示符
   copy .env.example .env.local

   # Windows PowerShell
   Copy-Item .env.example .env.local
   ```

5. 安装依赖：`bun install`
6. 启动开发服务器：`bun dev`

## 开发环境设置

### 本地开发

1. 启动数据库和 Redis 服务：

   ```bash
   # 在项目根目录
   docker-compose up -d
   ```

2. 进入 Web 应用目录：

   ```bash
   cd apps/web
   ```

3. 复制环境配置文件：

   ```bash
   # Unix/Linux/Mac
   cp .env.example .env.local

   # Windows 命令提示符
   copy .env.example .env.local

   # Windows PowerShell
   Copy-Item .env.example .env.local
   ```

4. 在 `.env.local` 中配置必需的环境变量：

   **必需变量：**

   ```bash
   # 数据库配置（与 docker-compose.yaml 一致）
   DATABASE_URL="postgresql://opencut:opencutthegoat@localhost:5432/opencut"

   # 生成一个安全密钥用于 Better Auth
   BETTER_AUTH_SECRET="your-generated-secret-here"
   BETTER_AUTH_URL="http://localhost:3000"

   # Redis 配置（与 docker-compose.yaml 一致）
   UPSTASH_REDIS_REST_URL="http://localhost:8079"
   UPSTASH_REDIS_REST_TOKEN="example_token"

   # Marble 博客配置
   MARBLE_WORKSPACE_KEY=cm6ytuq9x0000i803v0isidst # 示例组织密钥
   NEXT_PUBLIC_MARBLE_API_URL=https://api.marblecms.com

   # 开发环境
   NODE_ENV="development"
   ```

   **生成 BETTER_AUTH_SECRET：**

   ```bash
   # Unix/Linux/Mac
   openssl rand -base64 32

   # Windows PowerShell
   [System.Web.Security.Membership]::GeneratePassword(32, 0)

   # 跨平台方式（使用 Node.js）
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

   # 或使用在线生成器：https://generate-secret.vercel.app/32
   ```

5. 运行数据库迁移：`bun run db:migrate`（在 apps/web 目录内）
6. 启动开发服务器：`bun run dev`（在 apps/web 目录内）

应用将在 [http://localhost:3000](http://localhost:3000) 上运行。

## 参与贡献

我们欢迎各种形式的贡献！目前我们正在积极开发和重构某些功能模块。

**🎯 重点贡献方向：** 时间轴功能、项目管理、性能优化、Bug 修复以及预览面板之外的 UI 改进。

**⚠️ 暂时避免：** 预览面板增强功能（字体、贴纸、特效）和导出功能 - 我们正在使用新的二进制渲染方法重构这些功能。

查看我们的 [贡献指南](.github/CONTRIBUTING.md) 了解详细的设置说明、开发指南和完整的贡献方向。

**贡献者快速入门：**

- Fork 本仓库并克隆到本地
- 按照 CONTRIBUTING.md 中的设置说明操作
- 创建功能分支并提交 PR

## 汉化贡献

如果你想为汉化工作做出贡献，欢迎：

- 改进现有翻译
- 翻译新增功能
- 修正翻译错误
- 优化用户界面的中文表达

## 赞助商

<a href="https://fal.ai">
  <img alt="Powered by fal.ai" src="https://img.shields.io/badge/Powered%20by-fal.ai-000000?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCAxMEwxMy4wOSAxNS43NEwxMiAyMkwxMC45MSAxNS43NEw0IDEwTDEwLjkxIDguMjZMMTIgMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" />
</a>

---

[![使用 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FOpenCut-app%2FOpenCut&project-name=opencut&repository-name=opencut)

## 开源协议

[MIT LICENSE](LICENSE)

## 联系方式

如有问题或建议，欢迎：
- 提交 Issue
- 发起 Pull Request
- 参与讨论

**让我们一起让 OpenCut 在中文社区更好用！** 🎉
