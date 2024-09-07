import { config } from 'dotenv'
import axios from 'axios'
import Period from './enums/Period'
import Candle from './models/Candle'
import { createMessageChannel } from './messages/MessageChanel'
import { error } from 'console'

config()
const readMarketPrice = async (): Promise<number> => {
    const options = {
        method: 'GET',
        url: process.env.COINGECKO_API_URL,
        headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY }
    }
    const result = await axios.request(options);
    const data = result.data
    const price = data.bitcoin.usd
    console.log(price)
    return price

}

const generateCandles = async () => {
    const messageChannel = await createMessageChannel()

    if (!messageChannel) return;

    while (true) {
        const loopTimes = Period.ONE_MINUTE / Period.TEN_SECONDS;
        const candle = new Candle("BTC", new Date())
        for (let i = 0; i < loopTimes; i++) {
            const price = await readMarketPrice()
            candle.addValue(price)
            console.log(`Market price #${i + 1} of ${loopTimes}`);
            await new Promise(r => setTimeout(r, Period.TEN_SECONDS))
        }
        candle.closeCandle()
        console.log("candle closed")
        const candleObj = candle.toSimpleObject()
        console.log(candleObj)
        const candleJson = JSON.stringify(candleObj)
        messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleJson))
        console.log("Candle enqueued")
    }
}
generateCandles()