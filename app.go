package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"os"

	"github.com/adshao/go-binance/v2"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	if fc == nil {
		// 从环境变量获取代理设置
		proxyEnv := os.Getenv("baproxy")
		if proxyEnv != "" {
			// 如果设置了代理环境变量，则使用代理
			proxyURL, err := url.Parse(proxyEnv)
			if err == nil {
				http.DefaultTransport = &http.Transport{
					Proxy: http.ProxyURL(proxyURL),
				}
				fmt.Printf("使用代理: %s\n", proxyEnv)
			} else {
				fmt.Printf("代理地址解析失败: %s, 错误: %v\n", proxyEnv, err)
			}
		} else {
			fmt.Println("未设置代理，使用直连")
		}

		fc = binance.NewFuturesClient(os.Getenv("BINANCE_API_KEY"), os.Getenv("BINANCE_SECRET_KEY"))
	}
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// GetSuggestiveTrade 获取建议交易的币，包括做空或者做多，以及建议的价格
func (a *App) GetSuggestiveTrade() ([]*SuggestiveTrade, error) {
	ss, err := GetSymbolsList1()
	if err != nil {
		return []*SuggestiveTrade{}, errors.New("no symbols list")
	}
	sks := GetSymbolsWithKlines(ss)
	if len(sks) == 0 {
		return []*SuggestiveTrade{}, errors.New("no symbols with klines")
	}
	GetSymbolsWithKlinesWithBoll(sks)
	st := FilterSymbolsWithKlines(sks)
	return st, nil
}
