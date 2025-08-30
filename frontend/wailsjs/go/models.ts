export namespace main {
	
	export class SymbolInfo {
	    symbol: string;
	    baseAsset: string;
	    quoteAsset: string;
	    status: string;
	    contractType: string;
	    deliveryDate: number;
	    onboardDate: number;
	    pricePrecision: number;
	    quantityPrecision: number;
	    baseAssetPrecision: number;
	    quotePrecision: number;
	    orderTypes: string;
	    timeInForce: string;
	    liquidationFee: string;
	    marketTakeBound: string;
	    maxPrice: string;
	    minPrice: string;
	    maxQty: string;
	    minQty: string;
	    maxNotional: string;
	    minNotional: string;
	    underlyingType: string;
	    underlyingSubType: string;
	    settlePlan: number;
	    triggerProtect: string;
	    maintMarginPercent: string;
	    requiredMarginPercent: string;
	
	    static createFrom(source: any = {}) {
	        return new SymbolInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.symbol = source["symbol"];
	        this.baseAsset = source["baseAsset"];
	        this.quoteAsset = source["quoteAsset"];
	        this.status = source["status"];
	        this.contractType = source["contractType"];
	        this.deliveryDate = source["deliveryDate"];
	        this.onboardDate = source["onboardDate"];
	        this.pricePrecision = source["pricePrecision"];
	        this.quantityPrecision = source["quantityPrecision"];
	        this.baseAssetPrecision = source["baseAssetPrecision"];
	        this.quotePrecision = source["quotePrecision"];
	        this.orderTypes = source["orderTypes"];
	        this.timeInForce = source["timeInForce"];
	        this.liquidationFee = source["liquidationFee"];
	        this.marketTakeBound = source["marketTakeBound"];
	        this.maxPrice = source["maxPrice"];
	        this.minPrice = source["minPrice"];
	        this.maxQty = source["maxQty"];
	        this.minQty = source["minQty"];
	        this.maxNotional = source["maxNotional"];
	        this.minNotional = source["minNotional"];
	        this.underlyingType = source["underlyingType"];
	        this.underlyingSubType = source["underlyingSubType"];
	        this.settlePlan = source["settlePlan"];
	        this.triggerProtect = source["triggerProtect"];
	        this.maintMarginPercent = source["maintMarginPercent"];
	        this.requiredMarginPercent = source["requiredMarginPercent"];
	    }
	}

}

