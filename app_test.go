package main

import (
	"context"
	"fmt"
	"os"
	"testing"

	"github.com/adshao/go-binance/v2"
)

func TestB(t *testing.T) {
	//fc = binance.NewFuturesClient(os.Getenv("BINANCE_API_KEY"), os.Getenv("BINANCE_SECRET_KEY"))
	app := NewApp()
	st, err := app.GetSuggestiveTrade()
	if err != nil {
		t.Fatalf("Failed to get suggestive trade: %v", err)
	}
	fmt.Println(st)
	for _, s := range st {
		fmt.Printf("symbol: %s, direction: %s, price: %f, quote_volume: %f\n", s.Symbol, s.Direction, s.Price, s.QuoteVolume)
	}
}

func TestC(t *testing.T) {
	client := binance.NewFuturesClient(os.Getenv("BINANCE_API_KEY"), os.Getenv("BINANCE_SECRET_KEY"))
	prices, _ := client.NewListPricesService().Do(context.Background())
	fmt.Println(len(prices))

	symbols, _ := client.NewExchangeInfoService().Do(context.Background())
	fmt.Println(len(symbols.Symbols))
}
