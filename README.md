# Take Home Test (Backend)

## Backend

For the backend portion of the test we'd like you to write some code that achieves the following:

1. Create a JSON API (REST or GraphQL) using Node.js which will return which cryptocurrency exchange we should use to
   buy a given amount of Bitcoin to minimize the amount of USD or USDT we'll spend on this trade.

Example API call (for 1 BTC):

```
curl http://localhost:4000/exchange-routing?amount=1
```

Example API response (if Coinbase price of \$10,000 / BTC is the cheapest):

```
{
  "btcAmount": 1,
  "usdAmount": 10000,
  "exchange": "coinbase"
}
```

2. You'll need to compare Binance and Coinbase [order books](https://www.investopedia.com/terms/o/order-book.asp) and compute
   the best execution price for the given amount of Bitcoin we want to buy. (You can assume that 1 USDT = 1 USD at all time.)
3. [Bonus] Add a third exchange to compare with Binance and Coinbase.

Feel free to structure the code however you prefer and use third-party libraries at your discretion.

NOTE: Please make the server listen on port `:4000`.

### API Information & Documentation

- **[Crypto Trading 101: How to Read an Exchange Order Book](https://www.coindesk.com/crypto-trading-101-how-to-read-an-exchange-order-book)**
- **[Binance Order Book API Endpoint](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#order-book)**
- **[Coinbase Order Book API Endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproductbook)**

_Note that both APIs above are public and don't require any authentication._

## Follow-up

Answer the questions in the [FOLLOW-UP.md](./FOLLOW-UP.md) file.

## Docker

The test contains a basic `docker-compose.yml` file. It uses the latest official NodeJS
Docker image and creates a container for the backend service.

The respective folder is mounted in `/app` directory inside the container.

It isn't a requirement to use it, but may be convenient.

NOTE: We WILL run your code inside this container.

## Submitting Your Code

Once you've completed the test, please compress your files (via zip or tar) and
return them as a link or email attachment in reply to your test invite. We'd like the
code in your submission to remain private, so please avoid committing or pushing
the code publicly.

**Do not include node_modules or .git in your submission**

Once we receive it, a member of our team will review and we'll get back to you
as soon as possible.

Thanks!
