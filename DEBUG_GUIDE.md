# 🐛 BBB 项目调试运行指南

## 🚀 快速开始

### 1. 开发模式（推荐）
```bash
# 启动开发服务器，支持热重载
wails dev

# 在浏览器中打开（推荐用于调试）
wails dev -browser
```

### 2. 生产模式
```bash
# 构建生产版本
wails build

# 运行构建后的应用
./build/bin/bbb
```

## 🔧 调试方法详解

### 方法一：Wails 开发模式
```bash
wails dev
```
**优点：**
- ✅ 热重载：修改代码后自动重新编译
- ✅ 前端开发服务器
- ✅ 实时错误提示
- ✅ 支持断点调试

**适用场景：**
- 日常开发调试
- 前后端联调
- 功能测试

### 方法二：浏览器调试模式
```bash
wails dev -browser
```
**优点：**
- ✅ 在浏览器中打开应用
- ✅ 使用浏览器开发者工具
- ✅ 方便调试前端代码
- ✅ 网络请求监控

**适用场景：**
- 前端代码调试
- UI 问题排查
- 网络请求调试

### 方法三：强制重新构建
```bash
wails dev -forcebuild
```
**适用场景：**
- 依赖更新后
- 缓存问题
- 构建错误

### 方法四：Go 原生调试
```bash
# 直接运行 Go 代码
go run main.go app.go

# 使用 delve 调试器（需要先安装）
go install github.com/go-delve/delve/cmd/dlv@latest
dlv debug main.go
```

## 🎯 调试技巧

### 1. 日志输出
在 `app.go` 中添加日志：
```go
import "log"

func (a *App) Greet(name string) string {
    log.Printf("Greet called with name: %s", name)
    result := fmt.Sprintf("Hello %s, It's show time!", name)
    log.Printf("Greet result: %s", result)
    return result
}
```

### 2. 前端调试
在 `frontend/src/main.ts` 中添加：
```typescript
console.log('App started');
console.log('Greet function:', window.greet);
```

### 3. 错误处理
```go
func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
    log.Println("Application started successfully")
}
```

## 🚨 常见问题解决

### 1. 端口冲突
```bash
# 检查端口占用
lsof -i :34115

# 使用自定义端口
wails dev -devserver :8080
```

### 2. 依赖问题
```bash
# 清理 Go 模块缓存
go clean -modcache

# 重新下载依赖
go mod tidy
```

### 3. 前端构建失败
```bash
# 清理前端依赖
cd frontend && rm -rf node_modules package-lock.json
npm install
```

## 📱 调试工具推荐

### 1. Go 调试
- **Delve**: Go 原生调试器
- **VS Code Go 扩展**: 集成调试支持

### 2. 前端调试
- **Chrome DevTools**: 浏览器开发者工具
- **VS Code**: 集成 TypeScript 调试

### 3. 网络调试
- **Charles Proxy**: 网络请求监控
- **Postman**: API 测试

## 🎮 调试流程示例

### 步骤 1：启动开发模式
```bash
wails dev -browser
```

### 步骤 2：修改代码
编辑 `app.go` 或 `frontend/src/main.ts`

### 步骤 3：查看实时更新
代码修改后会自动重新编译和加载

### 步骤 4：调试问题
使用浏览器开发者工具或 Go 调试器

## 📝 调试检查清单

- [ ] 开发服务器是否正常启动
- [ ] 前端是否在浏览器中打开
- [ ] 控制台是否有错误信息
- [ ] 网络请求是否正常
- [ ] 后端 API 是否响应
- [ ] 热重载是否工作

## 🔍 获取帮助

如果遇到问题：
1. 查看终端错误信息
2. 检查浏览器控制台
3. 查看 Wails 官方文档
4. 在 GitHub 上搜索相关问题

---

**提示：** 开发模式下，修改代码后应用会自动重新加载，这是最方便的调试方式！
