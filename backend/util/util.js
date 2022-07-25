const Decimal = require("decimal.js")

const costToBuy = (asks, buyAmount, exchange) => {
    const amountToBuy = new Decimal(buyAmount)
    let runningCost = new Decimal(0.0)
    let runningAmount = new Decimal(0.0)
    for (const ask of asks) {
        const askPrice = new Decimal(ask[0]);
        const askAmount = new Decimal(ask[1]);

        if (askAmount.greaterThanOrEqualTo(amountToBuy)) {
            return { ok: { usdAmount: askPrice.toNumber(), exchange: exchange, btcAmount: amountToBuy.toNumber() } };
        } else {
            runningCost.plus(askPrice.mul(askAmount))
            runningAmount.plus(askAmount)
        }
    }
    return { error: "not enough liquidity" }
}

module.exports = { costToBuy }