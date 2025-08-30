package main

// 布林带信息结构
type BollInfo struct {
	Up   float64 `json:"up"`
	Down float64 `json:"down"`
	Mid  float64 `json:"mid"`
}

// K线数据结构
type Kline struct {
	Open        float64 `json:"open"`
	High        float64 `json:"high"`
	Low         float64 `json:"low"`
	Close       float64 `json:"close"`
	QuoteVolume float64 `json:"quote_volume"`
	Boll        BollInfo
}

type SuggestiveTrade struct {
	Symbol      string  `json:"symbol"`
	Direction   string  `json:"direction"` // buy(做多),sell(做空)
	Price       float64 `json:"price"`
	QuoteVolume float64 `json:"quote_volume"`
}

type SymbolWithKlines struct {
	Symbol      string  `json:"symbol"`
	Klines      []Kline `json:"klines"`
	QuoteVolume float64 `json:"quote_volume"`
}
