export default class Candle {
    currency: string
    finalDateTime: Date
    open: number
    close: number
    high: number
    low: number
    color: string

    constructor(candleObj: any) {
        this.currency = candleObj.currency
        this.finalDateTime = new Date()
        this.open = candleObj.open
        this.close = candleObj.close
        this.high = candleObj.high
        this.low = candleObj.low
        this.color = candleObj.color
    }
}
