const axios = require('axios');

const CoinbaseClient = axios.create({
    baseURL: 'https://api.exchange.coinbase.com',
    timeout: 1000,
    headers: {
        'Accept': 'application/json'
    }
})

const getKnownCurrencies = async () => {
    try {
        const response = await CoinbaseClient.get("/currencies");
        return response.data;
    }
    catch (error) {
        console.log(error)
    }

}

module.exports = { getKnownCurrencies }