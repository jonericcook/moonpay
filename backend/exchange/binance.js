const axios = require('axios');
const util = require("../util/util");

const BinanceClient = axios.create({
    baseURL: 'https://api.binance.com',
    timeout: 1000,
    headers: {
        'Accept': 'application/json'
    }
});

// Binance API: https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#order-book
// Response shape
// {
//     "lastUpdateId": 1027024,
//     "bids": [
//       [
//         "4.00000000",     // PRICE
//         "431.00000000"    // QTY
//       ]
//     ],
//     "asks": [
//       [
//         "4.00000200",
//         "12.00000000"
//       ]
//     ]
// }
const costToBuy = async (buyAmount) => {
    try {
        const response = await BinanceClient.get("/api/v3/depth?symbol=BTCUSDT");
        return util.costToBuy(response.data.asks, buyAmount, "binance");
    }
    catch (error) {
        return { error: error }
    }

}

module.exports = { costToBuy }