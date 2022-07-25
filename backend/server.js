'use strict'

const express = require('express')
const app = express()
const port = 4000

app.set("query parser", (queryString) => {
    return new URLSearchParams(queryString);
});

app.get('/exchange-routing', (req, res) => {
    if (req.query.has("amount")) {
        res.json({ name: req.query.get("amount") })
    }
    else {
        res.status(400).json({ error: "'name' expected as query parameter" });
    }
}
)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
