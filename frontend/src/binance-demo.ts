// 币安期货接口使用示例
import { GetBinanceSymbols, GetBinanceSymbolsByBaseAsset, GetBinanceSymbolsByQuoteAsset, GetBinanceSymbolInfo } from '../wailsjs/go/main/App';

// 交易对信息接口
interface SymbolInfo {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    status: string;
    contractType: string;
    pricePrecision: number;
    quantityPrecision: number;
    maxPrice: string;
    minPrice: string;
    maxQty: string;
    minQty: string;
    maxNotional: string;
    minNotional: string;
    liquidationFee: string;
    maintMarginPercent: string;
    requiredMarginPercent: string;
}

// 币安期货服务类
export class BinanceFuturesService {
    
    /**
     * 获取所有交易对
     */
    static async getAllSymbols(): Promise<SymbolInfo[]> {
        try {
            console.log('正在获取所有币安期货交易对...');
            const symbols = await GetBinanceSymbols();
            console.log(`成功获取 ${symbols.length} 个交易对`);
            return symbols;
        } catch (error) {
            console.error('获取交易对失败:', error);
            throw error;
        }
    }

    /**
     * 根据基础资产获取交易对
     */
    static async getSymbolsByBaseAsset(baseAsset: string): Promise<SymbolInfo[]> {
        try {
            console.log(`正在获取 ${baseAsset} 相关交易对...`);
            const symbols = await GetBinanceSymbolsByBaseAsset(baseAsset);
            console.log(`找到 ${symbols.length} 个 ${baseAsset} 相关交易对`);
            return symbols;
        } catch (error) {
            console.error(`获取 ${baseAsset} 交易对失败:`, error);
            throw error;
        }
    }

    /**
     * 根据报价资产获取交易对
     */
    static async getSymbolsByQuoteAsset(quoteAsset: string): Promise<SymbolInfo[]> {
        try {
            console.log(`正在获取 ${quoteAsset} 计价交易对...`);
            const symbols = await GetBinanceSymbolsByQuoteAsset(quoteAsset);
            console.log(`找到 ${symbols.length} 个 ${quoteAsset} 计价交易对`);
            return symbols;
        } catch (error) {
            console.error(`获取 ${quoteAsset} 计价交易对失败:`, error);
            throw error;
        }
    }

    /**
     * 获取特定交易对信息
     */
    static async getSymbolInfo(symbol: string): Promise<SymbolInfo> {
        try {
            console.log(`正在获取 ${symbol} 详细信息...`);
            const symbolInfo = await GetBinanceSymbolInfo(symbol);
            console.log(`${symbol} 信息获取成功`);
            return symbolInfo;
        } catch (error) {
            console.error(`获取 ${symbol} 信息失败:`, error);
            throw error;
        }
    }

    /**
     * 显示交易对信息
     */
    static displaySymbolInfo(symbol: SymbolInfo): void {
        console.log('交易对信息:');
        console.log(`  名称: ${symbol.symbol}`);
        console.log(`  基础资产: ${symbol.baseAsset}`);
        console.log(`  报价资产: ${symbol.quoteAsset}`);
        console.log(`  状态: ${symbol.status}`);
        console.log(`  合约类型: ${symbol.contractType}`);
        console.log(`  价格精度: ${symbol.pricePrecision}`);
        console.log(`  数量精度: ${symbol.quantityPrecision}`);
        console.log(`  最大价格: ${symbol.maxPrice}`);
        console.log(`  最小价格: ${symbol.minPrice}`);
        console.log(`  最大数量: ${symbol.maxQty}`);
        console.log(`  最小数量: ${symbol.minQty}`);
        console.log(`  最大名义价值: ${symbol.maxNotional}`);
        console.log(`  最小名义价值: ${symbol.minNotional}`);
        console.log(`  清算费用: ${symbol.liquidationFee}`);
        console.log(`  维持保证金: ${symbol.maintMarginPercent}%`);
        console.log(`  所需保证金: ${symbol.requiredMarginPercent}%`);
    }

    /**
     * 显示交易对列表
     */
    static displaySymbolList(symbols: SymbolInfo[], title: string): void {
        console.log(`\n${title}:`);
        console.log(`总共 ${symbols.length} 个交易对`);
        
        symbols.slice(0, 10).forEach((symbol, index) => {
            console.log(`${index + 1}. ${symbol.symbol} (${symbol.baseAsset}/${symbol.quoteAsset})`);
        });
        
        if (symbols.length > 10) {
            console.log(`... 还有 ${symbols.length - 10} 个交易对`);
        }
    }

    /**
     * 搜索交易对
     */
    static searchSymbols(symbols: SymbolInfo[], keyword: string): SymbolInfo[] {
        const lowerKeyword = keyword.toLowerCase();
        return symbols.filter(symbol => 
            symbol.symbol.toLowerCase().includes(lowerKeyword) ||
            symbol.baseAsset.toLowerCase().includes(lowerKeyword) ||
            symbol.quoteAsset.toLowerCase().includes(lowerKeyword)
        );
    }

    /**
     * 按状态过滤交易对
     */
    static filterByStatus(symbols: SymbolInfo[], status: string): SymbolInfo[] {
        return symbols.filter(symbol => symbol.status === status);
    }

    /**
     * 获取活跃交易对（状态为TRADING）
     */
    static getActiveSymbols(symbols: SymbolInfo[]): SymbolInfo[] {
        return this.filterByStatus(symbols, 'TRADING');
    }
}

// 使用示例
export async function demoBinanceAPI() {
    try {
        const service = BinanceFuturesService;
        
        // 1. 获取所有交易对
        console.log('=== 币安期货API演示 ===');
        const allSymbols = await service.getAllSymbols();
        service.displaySymbolList(allSymbols, '所有交易对');
        
        // 2. 获取BTC相关交易对
        const btcSymbols = await service.getSymbolsByBaseAsset('BTC');
        service.displaySymbolList(btcSymbols, 'BTC相关交易对');
        
        // 3. 获取USDT计价交易对
        const usdtSymbols = await service.getSymbolsByQuoteAsset('USDT');
        service.displaySymbolList(usdtSymbols, 'USDT计价交易对');
        
        // 4. 获取BTCUSDT详细信息
        const btcUsdtInfo = await service.getSymbolInfo('BTCUSDT');
        service.displaySymbolInfo(btcUsdtInfo);
        
        // 5. 搜索包含"ETH"的交易对
        const ethSymbols = service.searchSymbols(allSymbols, 'ETH');
        service.displaySymbolList(ethSymbols, '包含ETH的交易对');
        
        // 6. 获取活跃交易对
        const activeSymbols = service.getActiveSymbols(allSymbols);
        service.displaySymbolList(activeSymbols, '活跃交易对');
        
        console.log('\n=== 演示完成 ===');
        
    } catch (error) {
        console.error('演示过程中出现错误:', error);
    }
}

// 导出到全局，方便在浏览器控制台中使用
declare global {
    interface Window {
        BinanceFuturesService: typeof BinanceFuturesService;
        demoBinanceAPI: typeof demoBinanceAPI;
    }
}

window.BinanceFuturesService = BinanceFuturesService;
window.demoBinanceAPI = demoBinanceAPI;
