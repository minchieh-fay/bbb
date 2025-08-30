package main

import (
	"context"
	"fmt"
	"os"
	"testing"

	"github.com/adshao/go-binance/v2"
	"github.com/adshao/go-binance/v2/futures"
)

func TestAaa(t *testing.T) {
	client := binance.NewFuturesClient(os.Getenv("BINANCE_API_KEY"), os.Getenv("BINANCE_SECRET_KEY"))
	symbols, err := client.NewExchangeInfoService().Do(context.Background())
	if err != nil {
		t.Fatalf("Failed to get exchange info: %v", err)
	}
	for _, symbol := range symbols.Symbols {
		if symbol.ContractType == futures.ContractTypePerpetual {
			fmt.Println(symbol.Symbol)
		}
	}
	fmt.Println(len(symbols.Symbols))
}
