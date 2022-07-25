'use strict'

const express = require('express')
const app = express()
const port = 4000

const coinbase = require('./exchange/coinbase')
const binance = require('./exchange/binance')
const gemini = require('./exchange/gemini')


app.set("query parser", (queryString) => {
    return new URLSearchParams(queryString);
});

app.get('/exchange-routing', (req, res) => {
    if (req.query.has("amount")) {
        (async () => {
            const coinbase_cost = await gemini.costToBuy(req.query.get("amount"));
            res.json(coinbase_cost)
            // if (results.ok) {
            //     res.json(results.ok);
            // } else if (results.error) {
            //     res.status(500).json({ error: results.error });
            // } else {
            //     res.status(500).json({ error: "something went wrong" });
            // }
        })()
    }
    else {
        res.status(400).json({ error: "'name' expected as query parameter" });
    }
})



app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

