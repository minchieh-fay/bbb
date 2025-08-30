export namespace main {
	
	export class SuggestiveTrade {
	    symbol: string;
	    direction: string;
	    price: number;
	    quote_volume: number;
	
	    static createFrom(source: any = {}) {
	        return new SuggestiveTrade(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.symbol = source["symbol"];
	        this.direction = source["direction"];
	        this.price = source["price"];
	        this.quote_volume = source["quote_volume"];
	    }
	}

}

