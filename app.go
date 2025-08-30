package main

import (
	"context"
	"errors"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
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
	ss, err := GetSymbolsList()
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
