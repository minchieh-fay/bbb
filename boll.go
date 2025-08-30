package main

import "math"

// 计算布林带（使用币安标准：21周期，2.0倍数）
func CalculateBoll(klines []Kline) []Kline {
	const period = 21      // 固定21周期
	const multiplier = 2.0 // 固定2.0倍数

	if len(klines) < period {
		return klines
	}

	result := make([]Kline, len(klines))

	// 复制原始数据
	for i := range klines {
		result[i] = klines[i]
	}

	// 计算移动平均线和标准差
	for i := period - 1; i < len(klines); i++ {
		// 计算移动平均线（中轨）
		sum := 0.0
		for j := i - period + 1; j <= i; j++ {
			sum += klines[j].Close
		}
		ma := sum / float64(period)

		// 计算标准差
		variance := 0.0
		for j := i - period + 1; j <= i; j++ {
			diff := klines[j].Close - ma
			variance += diff * diff
		}
		stdDev := math.Sqrt(variance / float64(period))

		// 设置布林带值
		result[i].Boll.Up = ma + multiplier*stdDev   // 上轨
		result[i].Boll.Mid = ma                      // 中轨
		result[i].Boll.Down = ma - multiplier*stdDev // 下轨
	}

	return result
}
