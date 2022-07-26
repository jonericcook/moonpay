const Decimal = require("decimal.js")

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
    return { error: exchange + " does not have enough liquidity to buy " + buyAmount + " BTC" }
}

const findCheapest = (results) => {
    let oks = [];
    let errors = [];
    for (const result of results) {
        if (result.ok) {
            oks.push(result.ok)
        } else if (result.error) {
            errors.push(result.error)
        }
    }
    if (oks.length == 0) {
        return { error: errors };
    }

    return {
        ok: oks.reduce((previous, current) => {
            return (new Decimal(previous.usdAmount).lt(new Decimal(current.usdAmount))) ? previous : current;
        })
    }
}

module.exports = { costToBuy, findCheapest }