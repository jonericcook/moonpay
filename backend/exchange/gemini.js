const axios = require('axios');
const Decimal = require('decimal.js');

const GeminiClient = axios.create({
    baseURL: 'https://api.gemini.com',
    timeout: 1000,
    headers: {
        'Accept': 'application/json'
    }
});

// Gemini API: https://docs.gemini.com/rest-api/#current-order-book
// Response shape
// {
//     "bids": [{
//               "price": "3607.85",
//               "amount": "6.643373",
//               "timestamp": "1547147541"
//              }
//              ...
//              ],
//     "asks": [{
//               "price": "3607.86",
//               "amount": "14.68205084",
//               "timestamp": "1547147541"
//              }
//              ...
//              ]
// }
const costToBuy = async (buyAmount) => {
    try {
        const response = await GeminiClient.get("/v1/book/btcusd?limit_asks=0&limit_bids=1");
        return findCostToBuy(response.data.asks, buyAmount)
    }
    catch (error) {
        return { error: error }
    }
}

const findCostToBuy = (asks, buyAmount) => {
    const amountToBuy = new Decimal(buyAmount)
    for (const ask of asks) {
        const askPrice = new Decimal(ask.price);
        const askAmount = new Decimal(ask.amount);
        if (askAmount.greaterThanOrEqualTo(amountToBuy)) {
            return { ok: { usdAmount: askPrice.toNumber(), exchange: "gemini", btcAmount: amountToBuy.toNumber() } };
        }
    }
    return { error: "not enough liquidity" }
}

module.exports = { costToBuy }