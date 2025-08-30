# BBB - Go + Wails 项目

这是一个使用 Go 和 Wails 框架创建的桌面应用程序。

## 项目结构

- `main.go` - 应用程序入口点
- `app.go` - 应用程序逻辑和API绑定
- `frontend/` - 前端代码（TypeScript + Vite）
- `build/` - 构建输出目录

## 功能特性

- 简单的 Hello World 示例
- 前后端通信演示
- 跨平台桌面应用支持

## 开发环境要求

- Go 1.21+
- Node.js 18+
- Wails CLI

## 快速开始

### 安装依赖
```bash
# 安装前端依赖
cd frontend && npm install

# 或者使用 Wails 命令
wails dev
```

### 开发模式
```bash
wails dev
```

### 构建应用
```bash
wails build
```

### 运行应用
```bash
./build/bin/bbb
```

## 项目说明

这是一个基础的 Wails 项目模板，展示了：
- Go 后端与 TypeScript 前端的集成
- 前后端函数调用示例
- 基本的桌面应用界面

## 许可证

MIT License
