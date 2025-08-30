# 🚀 币安期货API接口使用说明

## 📋 功能概述

`bian.go` 文件提供了完整的币安期货平台接口，可以获取所有合约交易对信息。

## 🔧 主要功能

### 1. **获取所有交易对**
```go
binanceService := NewBinanceService()
symbols, err := binanceService.GetAllSymbols()
```

**返回数据：**
- 所有永续合约交易对
- 包含价格精度、数量精度、保证金要求等详细信息
- 自动过滤出永续合约（PERPETUAL）

### 2. **按基础资产过滤**
```go
btcSymbols, err := binanceService.GetSymbolsByBaseAsset("BTC")
```

**功能：**
- 获取指定基础资产的所有交易对
- 例如：获取所有BTC相关的合约

### 3. **按报价资产过滤**
```go
usdtSymbols, err := binanceService.GetSymbolsByQuoteAsset("USDT")
```

**功能：**
- 获取指定报价资产的所有交易对
- 例如：获取所有USDT计价的合约

### 4. **获取特定交易对信息**
```go
btcUsdtInfo, err := binanceService.GetSymbolInfo("BTCUSDT")
```

**功能：**
- 获取指定交易对的详细信息
- 包含所有配置参数和限制

## 📊 数据结构

### SymbolInfo 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| Symbol | string | 交易对名称（如：BTCUSDT） |
| BaseAsset | string | 基础资产（如：BTC） |
| QuoteAsset | string | 报价资产（如：USDT） |
| Status | string | 交易对状态 |
| ContractType | string | 合约类型（PERPETUAL） |
| PricePrecision | int | 价格精度 |
| QuantityPrecision | int | 数量精度 |
| MaxPrice | string | 最大价格 |
| MinPrice | string | 最小价格 |
| MaxQty | string | 最大数量 |
| MinQty | string | 最小数量 |
| MaxNotional | string | 最大名义价值 |
| MinNotional | string | 最小名义价值 |
| LiquidationFee | string | 清算费用 |
| MaintMarginPercent | string | 维持保证金百分比 |
| RequiredMarginPercent | string | 所需保证金百分比 |

## 🎯 使用示例

### 在Wails应用中使用

```go
// 在 app.go 中添加方法
func (a *App) GetBinanceSymbols() ([]SymbolInfo, error) {
    binanceService := NewBinanceService()
    return binanceService.GetAllSymbols()
}

func (a *App) GetBinanceSymbolsByAsset(asset string) ([]SymbolInfo, error) {
    binanceService := NewBinanceService()
    return binanceService.GetSymbolsByBaseAsset(asset)
}
```

### 前端调用示例

```typescript
// 获取所有交易对
const symbols = await GetBinanceSymbols();
console.log('交易对数量:', symbols.length);

// 获取BTC相关交易对
const btcSymbols = await GetBinanceSymbolsByAsset('BTC');
console.log('BTC交易对:', btcSymbols);
```

## ⚠️ 注意事项

1. **API限制**
   - 使用公共API，无需API密钥
   - 有请求频率限制
   - 建议在生产环境中添加缓存机制

2. **错误处理**
   - 网络请求可能失败
   - 币安服务器可能不可用
   - 建议添加重试机制

3. **数据更新**
   - 交易对信息会定期更新
   - 建议定期刷新数据
   - 注意处理新增和删除的交易对

## 🔍 调试技巧

### 1. 启用日志
```go
// 在代码中查看详细日志
log.Printf("成功获取 %d 个永续合约交易对", len(symbols))
```

### 2. 测试连接
```go
// 先测试基本连接
symbols, err := binanceService.GetAllSymbols()
if err != nil {
    log.Printf("连接失败: %v", err)
    return
}
```

### 3. 数据验证
```go
// 验证返回的数据
for _, symbol := range symbols {
    if symbol.Symbol == "" {
        log.Printf("发现无效交易对: %+v", symbol)
    }
}
```

## 🚀 扩展功能

可以基于现有接口扩展更多功能：

1. **价格监控**
   - 获取实时价格
   - 设置价格提醒

2. **交易统计**
   - 获取24小时交易量
   - 计算价格变化

3. **风险管理**
   - 监控保证金要求
   - 计算清算价格

## 📞 技术支持

如果遇到问题：
1. 检查网络连接
2. 查看币安API状态
3. 验证请求参数
4. 查看错误日志

---

**提示：** 这个接口提供了币安期货平台的完整交易对信息，可以用于构建交易应用、风险管理工具或市场分析系统。
