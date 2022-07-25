const axios = require('axios');
const util = require("../util/util");

const CoinbaseClient = axios.create({
    baseURL: 'https://api.exchange.coinbase.com',
    timeout: 1000,
    headers: {
        'Accept': 'application/json'
    }
});

// Coinbase API: https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproductbook
// Response shape
// {
//     "sequence": 13051505638,
//     "bids": [
//       [
//         "6247.58",
//         "6.3578146",
//         2
//       ]
//     ],
//     "asks": [
//       [
//         "6251.52",
//         "2",
//         1
//       ]
//     ]
// }
const costToBuy = async (buyAmount) => {
    try {
        const response = await CoinbaseClient.get("/products/BTC-USD/book?level=2");
        return util.costToBuy(response.data.asks, buyAmount, "coinbase");
    }
    catch (error) {
        return { error: error }
    }
}
module.exports = { costToBuy }