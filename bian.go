package main

import (
	"context"
	"strconv"
	"strings"
	"time"

	"github.com/adshao/go-binance/v2/futures"
)

func GetSymbolsList() ([]string, error) {
	symbols, err := fc.NewExchangeInfoService().Do(context.Background())
	if err != nil {
		return nil, err
	}
	var symbolsList []string
	for _, symbol := range symbols.Symbols {
		if symbol.ContractType == futures.ContractTypePerpetual {
			// 过滤掉结尾不是usdt结尾的
			if !strings.HasSuffix(symbol.Symbol, "USDT") {
				continue
			}
			symbolsList = append(symbolsList, symbol.Symbol)
		}
	}
	return symbolsList, nil
}

func GetSymbolsWithKlines(symbols []string) []*SymbolWithKlines {
	var symbolsWithKlines []*SymbolWithKlines
	var limit = 50
	for _, symbol := range symbols {
		time.Sleep(20 * time.Millisecond)
		klines, err := fc.NewKlinesService().
			Symbol(symbol).Interval("1d").
			Limit(limit).Do(context.Background())
		if err != nil {
			continue
		}
		if len(klines) < limit {
			continue
		}
		// 转换为Kline结构
		klinesWithKline := make([]Kline, len(klines))
		for i, kline := range klines {
			k := Kline{}
			k.Open, _ = strconv.ParseFloat(string(kline.Open), 64)
			k.High, _ = strconv.ParseFloat(string(kline.High), 64)
			k.Low, _ = strconv.ParseFloat(string(kline.Low), 64)
			k.Close, _ = strconv.ParseFloat(string(kline.Close), 64)
			k.QuoteVolume, _ = strconv.ParseFloat(string(kline.QuoteAssetVolume), 64)
			klinesWithKline[i] = k
		}
		symbolsWithKlines = append(symbolsWithKlines, &SymbolWithKlines{
			Symbol: symbol,
			Klines: klinesWithKline,
		})
	}
	return symbolsWithKlines
}

func GetSymbolsWithKlinesWithBoll(symbolsWithKlines []*SymbolWithKlines) {
	for _, symbolWithKlines := range symbolsWithKlines {
		symbolWithKlines.Klines = CalculateBoll(symbolWithKlines.Klines)
		for _, kline := range symbolWithKlines.Klines {
			symbolWithKlines.QuoteVolume += kline.QuoteVolume
		}
	}
}

// 从SymbolWithKlines数组中过滤出符合规则的
// 1. 前面4条kline压在布林上/下轨上，后3条离开轨道
func FilterSymbolsWithKlines(symbolsWithKlines []*SymbolWithKlines) []*SuggestiveTrade {
	var filteredSymbolsWithKlines []*SuggestiveTrade
	for _, symbolWithKlines := range symbolsWithKlines {
		if len(symbolWithKlines.Klines) < 7 {
			continue
		}
		// 取最后7条kline
		k := symbolWithKlines.Klines[len(symbolWithKlines.Klines)-7:]
		if FilterSymbolsWithKlines_up(k) {
			filteredSymbolsWithKlines = append(filteredSymbolsWithKlines, &SuggestiveTrade{
				Symbol:      symbolWithKlines.Symbol,
				Direction:   "sell",
				Price:       k[0].Boll.Mid * 1.001,
				QuoteVolume: symbolWithKlines.QuoteVolume,
			})
			continue
		}
		if FilterSymbolsWithKlines_down(k) {
			filteredSymbolsWithKlines = append(filteredSymbolsWithKlines, &SuggestiveTrade{
				Symbol:      symbolWithKlines.Symbol,
				Direction:   "buy",
				Price:       k[0].Boll.Mid * 0.999,
				QuoteVolume: symbolWithKlines.QuoteVolume,
			})
			continue
		}
	}
	return filteredSymbolsWithKlines
}

// return false = 不符合，true = 符合
func FilterSymbolsWithKlines_up(k []Kline) bool {
	var ontimes = 4
	var offtimes = 3
	// 前ontimes压线上
	for i := 0; i < ontimes; i++ {
		if k[i].Boll.Up > k[i].High {
			return false
		}
	}
	// 后offtimes离开线上
	for i := 0; i < offtimes; i++ {
		if k[i+ontimes].Boll.Up < k[i+ontimes].High {
			return false
		}
	}
	return true
}

// return false = 不符合，true = 符合
func FilterSymbolsWithKlines_down(k []Kline) bool {
	var ontimes = 4
	var offtimes = 3
	// 前ontimes压线上
	for i := 0; i < ontimes; i++ {
		if k[i].Boll.Down < k[i].Low {
			return false
		}
	}
	// 后offtimes离开线上
	for i := 0; i < offtimes; i++ {
		if k[i+ontimes].Boll.Down > k[i+ontimes].Low {
			return false
		}
	}
	return true
}
