'use strict'

const coinbase = require('./exchange/coinbase')
const binance = require('./exchange/binance')
const gemini = require('./exchange/gemini')
const util = require('./util/util')

const express = require('express')
const app = express()
const port = 4000

app.set("query parser", (queryString) => {
    return new URLSearchParams(queryString);
});

app.get('/exchange-routing', (req, res) => {
    if (req.query.has("amount")) {
        (async () => {
            Promise.all([coinbase.costToBuy(req.query.get("amount")), binance.costToBuy(req.query.get("amount")), gemini.costToBuy(req.query.get("amount"))]).then(results => {
                const result = util.findCheapest(results)
                if (result.ok) {
                    res.json(result.ok);
                } else if (result.error) {
                    res.status(500).json({ error: result.error });
                } else {
                    res.status(500).json({ error: "something went wrong" });
                }
            })
        })()
    }
    else {
        res.status(400).json({ error: "'amount' expected as query parameter" });
    }
})



app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

