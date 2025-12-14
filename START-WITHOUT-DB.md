# OpenCut 项目启动指南（无需数据库和 Redis）

本文档说明如何在**不启动数据库和 Redis** 的情况下运行 OpenCut 项目。

## 📋 适用场景

这种启动方式适用于：

- ✅ 仅需要**前端视频编辑功能**
- ✅ **不需要用户登录功能**
- ✅ **不需要 API 速率限制保护**
- ✅ 快速测试或开发前端功能
- ✅ 项目数据存储在浏览器本地（IndexedDB + OPFS）

## ⚠️ 功能限制

在没有数据库和 Redis 的情况下，以下功能**不可用**：

- ❌ 用户登录/注册
- ❌ 第三方登录（Google、GitHub 等）
- ❌ 需要数据库的 API 端点
- ❌ API 速率限制保护（可能导致某些 API 请求失败）
- ❌ 等待列表功能

以下功能**仍然可用**：

- ✅ 视频编辑器核心功能
- ✅ 项目创建和编辑（存储在浏览器本地）
- ✅ 视频/音频文件导入和处理（使用浏览器本地存储）
- ✅ 时间线编辑
- ✅ 本地预览和播放
- ✅ 前端 UI 和组件

## 🚀 快速启动

### 步骤 1: 确保 Bun 已安装

```bash
# 检查 bun 是否可用
bun --version

# 如果找不到，加载 PATH
export PATH="$HOME/.bun/bin:$PATH"
```

### 步骤 2: 配置最小环境变量

确保 `apps/web/.env.local` 存在，但不需要真实的数据库和 Redis 连接。

```bash
cd /home/devbox/project/OpenCut/apps/web

# 如果 .env.local 不存在，从示例文件复制
cp .env.example .env.local
```

**最小配置** (`.env.local`)：

```bash
# 开发环境
NODE_ENV=development

# 占位符数据库 URL（应用可能尝试连接，但会失败）
DATABASE_URL="postgresql://opencut:opencutthegoat@localhost:5432/opencut"

# Better Auth（占位符）
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=placeholder-secret-key-for-development-only

# Redis（占位符）
UPSTASH_REDIS_REST_URL=http://localhost:8079
UPSTASH_REDIS_REST_TOKEN=example_token

# Marble Blog（可选，用于博客功能）
MARBLE_WORKSPACE_KEY=cm6ytuq9x0000i803v0isidst
NEXT_PUBLIC_MARBLE_API_URL=https://api.marblecms.com

# 其他可选服务（占位符）
FREESOUND_CLIENT_ID=placeholder
FREESOUND_API_KEY=placeholder
CLOUDFLARE_ACCOUNT_ID=placeholder
R2_ACCESS_KEY_ID=placeholder
R2_SECRET_ACCESS_KEY=placeholder
R2_BUCKET_NAME=placeholder
MODAL_TRANSCRIPTION_URL=https://placeholder.modal.run
```

### 步骤 3: 安装依赖（如果还未安装）

```bash
cd /home/devbox/project/OpenCut
export PATH="$HOME/.bun/bin:$PATH"
bun install
```

### 步骤 4: 启动开发服务器

```bash
cd /home/devbox/project/OpenCut/apps/web
export PATH="$HOME/.bun/bin:$PATH"
bun run dev
```

服务器启动成功后，访问：**http://localhost:3000**

## 📝 一键启动脚本

创建 `/home/devbox/project/OpenCut/start-frontend-only.sh`：

```bash
#!/bin/bash
export PATH="$HOME/.bun/bin:$PATH"

echo "启动开发服务器（仅前端，无需数据库和 Redis）..."
cd "$(dirname "$0")/apps/web"
bun run dev
```

给脚本执行权限：

```bash
chmod +x /home/devbox/project/OpenCut/start-frontend-only.sh
```

运行：

```bash
cd /home/devbox/project/OpenCut
./start-frontend-only.sh
```

## ⚠️ 预期错误和警告

启动时可能会看到以下错误信息，这是**正常的**，不影响前端功能：

### 1. 数据库连接错误

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**说明**：应用尝试连接 PostgreSQL，但数据库未运行。这不会影响使用本地存储的功能。

### 2. Redis 连接错误

```
Error: connect ECONNREFUSED 127.0.0.1:6379
```

**说明**：应用尝试连接 Redis，但 Redis 未运行。这不会影响使用本地存储的功能。

### 3. 认证相关错误

访问需要认证的页面时，可能会看到认证错误。这是预期的，因为认证功能需要数据库。

## 🔍 如何确认是否正常工作

### ✅ 可以正常使用的功能：

1. **访问主页**：`http://localhost:3000`
2. **创建新项目**：点击"新建项目"按钮
3. **导入媒体文件**：可以导入视频、音频文件到本地
4. **时间线编辑**：可以编辑视频时间线
5. **预览播放**：可以在浏览器中预览编辑的视频

### ❌ 无法使用的功能：

1. **用户登录**：点击登录按钮会失败
2. **保存到云端**：项目只保存在浏览器本地
3. **某些 API**：需要数据库的 API 端点会失败

## 💾 数据存储说明

在这种模式下，所有项目数据存储在**浏览器的本地存储**中：

- **IndexedDB**：存储项目元数据、时间线配置
- **OPFS (Origin Private File System)**：存储视频、音频文件

**优点**：
- ✅ 数据完全本地化，隐私保护
- ✅ 不需要服务器存储
- ✅ 离线可用

**注意事项**：
- ⚠️ 清除浏览器数据会丢失项目
- ⚠️ 数据不会跨设备同步
- ⚠️ 每个浏览器都有独立的数据

## 🔧 故障排查

### 问题 1: 应用无法启动

**可能原因**：环境变量验证失败

**解决方法**：确保 `.env.local` 文件存在并包含所有必需的环境变量（即使使用占位符值）。

### 问题 2: 页面显示错误

**可能原因**：某些组件依赖数据库连接

**解决方法**：检查浏览器控制台错误，某些功能可能需要数据库。尝试访问不需要认证的页面。

### 问题 3: 项目无法保存

**解决方法**：检查浏览器是否允许本地存储。在浏览器设置中启用：
- Cookies 和站点数据
- IndexedDB
- 文件系统访问（对于 OPFS）

### 问题 4: 媒体文件无法导入

**解决方法**：
1. 检查浏览器控制台是否有错误
2. 确保文件大小不超过浏览器限制
3. 尝试使用支持的格式（MP4、WebM、MP3 等）

## 🔄 切换到完整模式

如果需要使用完整功能（包括用户登录），请参考 `START.md` 文档：

1. 启动 PostgreSQL 数据库
2. 启动 Redis
3. 运行数据库迁移
4. 使用真实的数据库连接字符串更新 `.env.local`

## 📍 与完整模式的对比

| 功能 | 无数据库模式 | 完整模式 |
|------|------------|---------|
| 视频编辑 | ✅ 可用 | ✅ 可用 |
| 项目保存 | ✅ 浏览器本地 | ✅ 浏览器本地 |
| 用户登录 | ❌ 不可用 | ✅ 可用 |
| API 速率限制 | ❌ 不可用 | ✅ 可用 |
| 数据持久化 | ⚠️ 仅浏览器 | ⚠️ 仅浏览器 |
| 跨设备同步 | ❌ 不可用 | ❌ 不可用 |

## 📝 总结

这种启动方式最适合：

- 🔨 前端开发和调试
- 🎨 UI/UX 开发和测试
- 🚀 快速原型验证
- 📱 测试视频编辑核心功能

**不适用于**：

- 👥 需要用户系统的场景
- 🔐 需要认证的功能
- 🌐 需要 API 集成的场景

---

**最后更新**: 2025年1月

