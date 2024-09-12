import Candle from "@/models/Candle";
import axios from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

const http = axios.create({ baseURL: process.env.VUE_APP_CANDLES_API })

@Module({ name: 'CandleStore' })
export default class CandleStore extends VuexModule {

    private _candles: Candle[] = []

    get candles() {
        console.log(this._candles.map(c => { return { x: c.finalDateTime.getTime(), y: [c.open, c.high, c.low, c.close] } }))
        return this._candles.length > 0
            ? this._candles.map(c => { return { x: c.finalDateTime.getTime(), y: [c.open, c.high, c.low, c.close] } })
            : []
    }
    @Action
    addCandle(candle: Candle) {
        this.context.commit('_appendNewCandle', candle)
    }
    @Action
    async loadInitialCandles() {
        const result = await http.get(`${process.env.VUE_APP_CANDLES_API_ENDPOINT}/10`)
        const candlesObj = result.data

        const candles = candlesObj.map((c: any) => new Candle(c))

        this.context.commit('_initializeCandles', candles.reverse())
    }

    @Mutation
    private _initializeCandles(candles: Candle[]) {
        this._candles = candles
    }
    @Mutation
    private _appendNewCandle(candle: Candle) {
        this._candles.push(candle)
    }



}