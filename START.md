# OpenCut 项目启动指南

本文档说明如何在重启电脑后启动 OpenCut 项目（不使用 Docker）。

## 📋 前置条件

- ✅ Bun 已安装（位于 `~/.bun/bin/bun`）
- ✅ PostgreSQL 数据库已安装并运行
- ✅ Redis 已安装并运行
- ✅ 项目依赖已安装（`bun install` 已完成）
- ✅ 环境变量已配置（`apps/web/.env.local` 已存在）
- ✅ 数据库已创建并运行迁移

## 🗄️ 数据库和 Redis 设置（首次安装）

### 1. 安装 PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib
```

**启动 PostgreSQL 服务:**
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql  # 设置开机自启
```

### 2. 创建数据库和用户

```bash
# 切换到 postgres 用户
sudo -u postgres psql

# 在 PostgreSQL 命令行中执行：
CREATE USER opencut WITH PASSWORD 'opencutthegoat';
CREATE DATABASE opencut OWNER opencut;
GRANT ALL PRIVILEGES ON DATABASE opencut TO opencut;
\q
```

### 3. 安装 Redis

**Ubuntu/Debian:**
```bash
sudo apt-get install -y redis-server
```

**启动 Redis 服务:**
```bash
sudo systemctl start redis-server
sudo systemctl enable redis-server  # 设置开机自启
```

### 4. 运行数据库迁移

```bash
cd /home/devbox/project/OpenCut/apps/web
export PATH="$HOME/.bun/bin:$PATH"
bun run db:migrate
```

## 🚀 快速启动（推荐）

### 方法 1：直接启动

Bun 安装脚本已自动将 bun 添加到 `~/.bashrc`，重启后 PATH 应该已经包含 bun。

```bash
# 1. 进入项目目录
cd /home/devbox/project/OpenCut/apps/web

# 2. 启动开发服务器
bun run dev
```

如果提示 `bun: command not found`，请使用方法 2。

### 方法 2：手动加载 PATH 后启动

如果 bun 不在 PATH 中，需要先加载：

```bash
# 1. 加载 bun 到 PATH（每次新终端需要）
export PATH="$HOME/.bun/bin:$PATH"

# 2. 进入项目目录
cd /home/devbox/project/OpenCut/apps/web

# 3. 启动开发服务器
bun run dev
```

### 方法 3：使用启动脚本（可选）

在项目根目录创建启动脚本更方便：

创建文件 `/home/devbox/project/OpenCut/start.sh`：

```bash
#!/bin/bash
export PATH="$HOME/.bun/bin:$PATH"
cd "$(dirname "$0")/apps/web"
bun run dev
```

给脚本执行权限：

```bash
chmod +x /home/devbox/project/OpenCut/start.sh
```

运行脚本：

```bash
cd /home/devbox/project/OpenCut
./start.sh
```

## ✅ 完整启动步骤（重启后）

重启电脑后，按以下步骤启动所有服务：

### 步骤 1: 启动数据库服务

```bash
# 检查 PostgreSQL 是否运行
sudo systemctl status postgresql

# 如果没有运行，启动它
sudo systemctl start postgresql
```

### 步骤 2: 启动 Redis 服务

```bash
# 检查 Redis 是否运行
sudo systemctl status redis-server

# 如果没有运行，启动它
sudo systemctl start redis-server
```

### 步骤 3: 验证服务状态

```bash
# 检查 PostgreSQL 端口
sudo netstat -tulpn | grep 5432

# 检查 Redis 端口
sudo netstat -tulpn | grep 6379
```

### 步骤 4: 启动开发服务器

```bash
# 1. 检查 bun 是否可用
bun --version

# 如果找不到，加载 PATH
export PATH="$HOME/.bun/bin:$PATH"
bun --version

# 2. 进入项目目录
cd /home/devbox/project/OpenCut/apps/web

# 3. 启动开发服务器
bun run dev
```

服务器启动成功后，访问：**http://localhost:3000**

### 一键启动脚本（可选）

创建 `/home/devbox/project/OpenCut/start-all.sh`：

```bash
#!/bin/bash
export PATH="$HOME/.bun/bin:$PATH"

echo "启动 PostgreSQL..."
sudo systemctl start postgresql

echo "启动 Redis..."
sudo systemctl start redis-server

echo "等待服务启动..."
sleep 2

echo "启动开发服务器..."
cd "$(dirname "$0")/apps/web"
bun run dev
```

给脚本执行权限：
```bash
chmod +x /home/devbox/project/OpenCut/start-all.sh
```

运行：
```bash
cd /home/devbox/project/OpenCut
./start-all.sh
```

## 📝 重要提示

### ✅ 不需要重复操作

以下操作**不需要**每次都执行（除非特殊情况）：

- ❌ `bun install` - 只需在首次或更新依赖时运行
- ❌ 配置 `.env.local` - 文件已存在，无需重新配置（除非需要修改）
- ❌ 安装 bun/PostgreSQL/Redis - 已安装，重启后仍然可用
- ❌ 创建数据库和运行迁移 - 只需首次设置时执行

### ⚠️ 每次重启后需要做的

- ✅ 启动 PostgreSQL 服务（如果未设置开机自启）
- ✅ 启动 Redis 服务（如果未设置开机自启）
- ✅ 启动开发服务器

### ⚠️ 什么时候需要重新安装依赖

只有在以下情况下才需要运行 `bun install`：

- 更新了 `package.json` 或 `bun.lock`
- 删除了 `node_modules` 目录
- 添加了新的依赖包

### 🛑 停止服务

**停止开发服务器：**
在运行开发服务器的终端中按 `Ctrl+C` 即可停止。

**停止数据库和 Redis（可选）：**
```bash
sudo systemctl stop postgresql
sudo systemctl stop redis-server
```

## 🔧 故障排查

### 问题 1: `bun: command not found`

**解决方法：**
```bash
export PATH="$HOME/.bun/bin:$PATH"
```

如果希望永久生效，可以将这行添加到 `~/.bashrc`（通常 bun 安装脚本已自动添加）：
```bash
echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### 问题 2: 端口 3000 已被占用

**解决方法：**
```bash
# 查看占用端口的进程
lsof -i :3000

# 或使用
netstat -tulpn | grep 3000

# 终止进程
kill -9 <PID>
```

或使用其他端口启动：
```bash
PORT=3001 bun run dev
```

### 问题 3: 依赖缺失错误

**解决方法：**
```bash
cd /home/devbox/project/OpenCut
bun install
```

### 问题 4: 数据库连接错误

**解决方法：**
```bash
# 检查 PostgreSQL 是否运行
sudo systemctl status postgresql

# 如果没有运行，启动它
sudo systemctl start postgresql

# 测试数据库连接
psql -U opencut -d opencut -h localhost
# 密码: opencutthegoat
```

### 问题 5: Redis 连接错误

**解决方法：**
```bash
# 检查 Redis 是否运行
sudo systemctl status redis-server

# 如果没有运行，启动它
sudo systemctl start redis-server

# 测试 Redis 连接
redis-cli ping
# 应该返回: PONG
```

### 问题 6: 数据库迁移错误

**解决方法：**
```bash
cd /home/devbox/project/OpenCut/apps/web
export PATH="$HOME/.bun/bin:$PATH"

# 重新运行迁移
bun run db:migrate

# 或者使用 push（开发环境，会同步 schema）
bun run db:push:local
```

## 📍 项目目录结构

```
/home/devbox/project/OpenCut/
├── apps/
│   └── web/              # 主应用目录（在这里运行 bun run dev）
│       ├── .env.local    # 环境变量配置（已配置）
│       ├── migrations/   # 数据库迁移文件
│       └── ...
├── packages/             # 共享包
├── package.json
├── docker-compose.yaml   # Docker 配置（不使用）
└── README.md
```

## 🔧 服务配置信息

### PostgreSQL 配置
- **用户**: `opencut`
- **密码**: `opencutthegoat`
- **数据库**: `opencut`
- **端口**: `5432`
- **连接字符串**: `postgresql://opencut:opencutthegoat@localhost:5432/opencut`

### Redis 配置
- **端口**: `6379`
- **REST URL**: `http://localhost:8079` (需要 serverless-redis-http，可选)
- **REST Token**: `example_token` (如果使用 serverless-redis-http)

### 设置服务开机自启（推荐）

```bash
# PostgreSQL 开机自启
sudo systemctl enable postgresql

# Redis 开机自启
sudo systemctl enable redis-server

# 验证是否已启用
sudo systemctl is-enabled postgresql
sudo systemctl is-enabled redis-server
```

## 🔗 相关链接

- 项目仓库: https://github.com/shuishen49/OpenCut
- Bun 文档: https://bun.sh/docs
- Next.js 文档: https://nextjs.org/docs

---

**最后更新**: 2025年1月

