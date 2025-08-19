# Vue Dicts - 法语词典学习平台

一个基于 Vue 3 + TypeScript + Tailwind CSS 的现代化法语学习平台，集成词典查询、翻译和写作指导功能。

## 功能特性

- 🔍 **智能词典查询** - 支持法语/英语词汇查询，提供详细释义和例句
- 🌐 **多语言翻译** - 中法英三语互译，支持翻译历史记录
- ✍️ **AI写作指导** - 智能分析法语作文，提供语法和文体建议
- 👤 **用户认证系统** - JWT token认证，安全的用户登录注册
- 📱 **响应式设计** - 适配多种设备尺寸
- 🎨 **优雅UI设计** - 基于Tailwind CSS的现代化界面

## 技术栈

### 前端
- Vue 3 (Composition API)
- TypeScript
- Vue Router 4
- Tailwind CSS
- Axios
- @vueuse/core

### 后端
- FastAPI (Python)
- Tortoise ORM
- Redis
- JWT Authentication
- MySQL/SQLite

## 快速开始

### 环境要求
- Node.js 16+
- Python 3.8+
- Redis
- MySQL (可选，默认使用SQLite)

### 安装依赖

1. **前端依赖**
```bash
npm install
```

2. **后端依赖**
```bash
cd backend/dict-server
pip install -r requirements.txt
```

### 启动项目

#### 方法一：使用批处理文件（Windows）
```bash
# 启动后端
start-backend.bat

# 启动前端（新开命令窗口）
start-frontend.bat
```

#### 方法二：手动启动
```bash
# 启动后端
cd backend/dict-server
python main.py

# 启动前端（新开终端）
npm run dev
```

访问 http://localhost:5173 查看前端界面
后端API文档：http://localhost:8000/docs

## 项目结构

```
vue-dicts/
├── src/                    # 前端源码
│   ├── api/               # API客户端
│   ├── components/        # Vue组件
│   ├── composables/       # 组合式API
│   ├── router/           # 路由配置
│   ├── views/            # 页面组件
│   └── style.css         # 全局样式
├── backend/              # 后端源码
│   └── dict-server/      # FastAPI应用
├── models/               # 设计效果图
├── public/               # 静态资源
└── package.json          # 项目配置
```

## 主要页面

- **首页** (`/`) - 项目介绍和快速入口
- **词典查询** (`/dict`) - 法语词汇查询功能
- **翻译** (`/trans`) - 多语言翻译功能  
- **写作指导** (`/write`) - AI写作辅助功能
- **登录** (`/login`) - 用户认证页面

## API接口

### 用户认证
- `POST /users/login` - 用户登录
- `POST /users/register` - 用户注册
- `POST /users/logout` - 用户登出

### 词典查询
- `GET /search` - 搜索单词
  - 参数: `lang_pref` (语言偏好), `query_word` (查询词汇)

## 开发说明

### 前端开发
- 使用 Vue 3 Composition API
- TypeScript 提供类型安全
- Tailwind CSS 用于样式
- 响应式设计适配移动端

### 后端开发
- FastAPI 提供高性能API
- Tortoise ORM 数据库操作
- JWT 认证保护接口
- Redis 缓存提升性能

## 部署

### 前端部署
```bash
npm run build
# 将 dist/ 目录部署到静态服务器
```

### 后端部署
```bash
cd backend/dict-server
# 配置生产环境变量
# 启动 uvicorn 服务器
```

## 贡献

欢迎提交 Issue 和 Pull Request 来改进项目！

## 许可证

MIT License