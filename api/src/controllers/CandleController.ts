import { Candle, CandleModel } from "../models/CandleModel";

export default class CandleController {

    async save(candle: Candle): Promise<Candle> {
        return await CandleModel.create(candle)
    }
    async findLastCandles(quantity: number): Promise<Candle[]> {

        const n = quantity > 0 ? quantity : 10;
        const lastCandles: Candle[] =
            await CandleModel.find().sort({ _id: -1 }).limit(n)

        return lastCandles;
    }
}