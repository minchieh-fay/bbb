import './style.css';
import './app.css';
import { GetSuggestiveTrade } from '../wailsjs/go/main/App';

// 交易建议数据接口
interface SuggestiveTrade {
    symbol: string;
    direction: string;
    price: number;
    quote_volume: number;
}

// 全局变量
let progressInterval: number | null = null;
let countdownInterval: number | null = null;

// 主函数
async function main() {
    console.log('应用启动，开始获取交易建议数据...');
    
    // 显示进度条界面
    showProgressUI();
    
    try {
        // 调用后端接口
        const trades = await GetSuggestiveTrade();
        console.log('获取到交易建议数据:', trades);
        
        // 隐藏进度条，显示数据表格
        hideProgressUI();
        showTradesTable(trades);
        
    } catch (error) {
        console.error('获取交易建议数据失败:', error);
        hideProgressUI();
        showErrorUI(error as Error);
    }
}

// 显示进度条界面
function showProgressUI() {
    const app = document.querySelector('#app')!;
    app.innerHTML = `
        <div class="progress-container">
            <h2>数据正在计算中...</h2>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <div class="countdown" id="countdown">剩余 20 秒</div>
            <div class="loading-text">正在分析币安期货数据，请稍候...</div>
        </div>
    `;
    
    // 启动进度条动画
    startProgressAnimation();
}

// 启动进度条动画
function startProgressAnimation() {
    let timeLeft = 20;
    const progressFill = document.getElementById('progressFill') as HTMLElement;
    const countdownElement = document.getElementById('countdown') as HTMLElement;
    
    // 进度条动画
    progressInterval = setInterval(() => {
        const progress = ((20 - timeLeft) / 20) * 100;
        progressFill.style.width = `${progress}%`;
    }, 1000);
    
    // 倒计时
    countdownInterval = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = `剩余 ${timeLeft} 秒`;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval!);
            countdownElement.textContent = '即将完成...';
        }
    }, 1000);
}

// 隐藏进度条界面
function hideProgressUI() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

// 显示交易建议表格
function showTradesTable(trades: SuggestiveTrade[]) {
    // 按quote_volume排序，值大的排前面
    const sortedTrades = trades.sort((a, b) => b.quote_volume - a.quote_volume);
    
    const app = document.querySelector('#app')!;
    app.innerHTML = `
        <div class="trades-container">
            <h2>交易建议</h2>
            <div class="table-container">
                <table class="trades-table">
                    <thead>
                        <tr>
                            <th>交易对</th>
                            <th>方向</th>
                            <th>建议价格</th>
                            <th>交易量</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sortedTrades.map(trade => `
                            <tr class="trade-row ${trade.direction === 'buy' ? 'buy-row' : 'sell-row'}">
                                <td class="symbol">${trade.symbol}</td>
                                <td class="direction ${trade.direction === 'buy' ? 'buy' : 'sell'}">
                                    ${trade.direction === 'buy' ? '🟢 做多' : '🔴 做空'}
                                </td>
                                <td class="price">$${trade.price.toFixed(6)}</td>
                                <td class="volume">${formatVolume(trade.quote_volume)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="refresh-section">
                <button class="refresh-btn" onclick="location.reload()">🔄 刷新数据</button>
            </div>
        </div>
    `;
}

// 显示错误界面
function showErrorUI(error: Error) {
    const app = document.querySelector('#app')!;
    app.innerHTML = `
        <div class="error-container">
            <h2>❌ 获取数据失败</h2>
            <p class="error-message">${error.message}</p>
            <button class="retry-btn" onclick="location.reload()">🔄 重试</button>
        </div>
    `;
}

// 格式化交易量
function formatVolume(volume: number): string {
    if (volume >= 1e9) {
        return `${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
        return `${(volume / 1e6).toFixed(2)}M`;
    } else if (volume >= 1e3) {
        return `${(volume / 1e3).toFixed(2)}K`;
    } else {
        return volume.toFixed(2);
    }
}

// 页面加载完成后启动应用
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成，启动应用...');
    main();
});

// 导出到全局，方便调试
declare global {
    interface Window {
        main: typeof main;
        showTradesTable: typeof showTradesTable;
        formatVolume: typeof formatVolume;
    }
}

window.main = main;
window.showTradesTable = showTradesTable;
window.formatVolume = formatVolume;
