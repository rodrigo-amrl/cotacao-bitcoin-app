import { config } from 'dotenv'
import axios from 'axios'

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

readMarketPrice()