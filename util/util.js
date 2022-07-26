const Decimal = require("decimal.js")

// asks is a list of lists
// index 0 is price
// index 1 is amount/quantity
// [
//     [
//     "4.00000200", price
//     "12.00000000" amount
//     ]
// ]
const costToBuy = (asks, buyAmount, exchange) => {
    const amountToBuy = new Decimal(buyAmount)
    let runningCost = new Decimal(0.0)
    let runningAmount = new Decimal(0.0)

    for (const ask of asks) {
        const askPrice = new Decimal(ask[0]);
        const askAmount = new Decimal(ask[1]);

        runningCost = runningCost.plus(askPrice.mul(askAmount))
        runningAmount = runningAmount.plus(askAmount)

        if (runningAmount.greaterThan(amountToBuy)) {
            const difference = runningAmount.sub(amountToBuy)
            runningCost = runningCost.sub(askPrice.mul(difference))
            return { ok: { usdAmount: runningCost.toNumber(), exchange: exchange, btcAmount: amountToBuy.toNumber() } };
        }
    }
    return { error: exchange + "'s order book can't support buying " + buyAmount + " BTC" }
}

// find the cheapest exchange based off the usdAmount
const findCheapest = (results) => {
    // separate the results into errors and oks lists
    let oks = [];
    let errors = [];
    for (const result of results) {
        if (result.ok) {
            oks.push(result.ok)
        } else if (result.error) {
            errors.push(result.error)
        }
    }
    // if we have no oks then return the errors
    if (oks.length == 0) {
        return { error: errors };
    }

    // find the cheapest one
    return {
        ok: oks.reduce((previous, current) => {
            return (new Decimal(previous.usdAmount).lt(new Decimal(current.usdAmount))) ? previous : current;
        })
    }
}

module.exports = { costToBuy, findCheapest }