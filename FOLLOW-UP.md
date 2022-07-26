# Implementation:

### Q) What libraries did you add to the backend? What are they used for?

- `axios`: make http requests to the exchanges
- `decimal.js`: convert string numbers into actual numbers, do math operations and do comparison operations
- `express`: server up the endpoint

### Q) What's the command to start the backend application locally?

Both of the commands below require that you are in the root directory

- To run locally on your machine do `npm run start`
- To run with docker do `docker compose up`

### Q) Any other comments we should read before evaluating your solution?

I haven't written JavaScript for some time and I'm sure my style or "way of doing things" is off base from how things should be done. You may notice how I opted to return things either as { ok: "success stuff goes here" } or as { error: "error stuff goes here" } and that is due to my time using Elixir.

I am more than willing and happy to dive into courses/books/training to sharpen my JavaScript skills.

---

# General:

### Q) If you had more time, what further improvements or new features would you add?

When [calling Binance](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#order-book) one can set the `limit` for how many items they want back. The more one wants the higher the request weight. I didn't want to get my IP banned so I opted to only ask for 100 items from their order book. The limit is [1,200 request weights per minute](https://www.binance.com/en/support/faq/360004492232). I'm not sure if one can pay for a higher limit.

With Gemini one is able to [get all the asks](https://docs.gemini.com/rest-api/#current-order-book). This can be done by setting `limit_asks` to 0.

Coinbase, by default, sends you everything.

I say all the above to say that if I had more time I would look into adding "retries" for Binance. Retires in the sense that I would start by calling Binance with the default limit of 100 and then experiment with retying with limits of maybe 100 or 300 all the way up to the max of 5000.

Since I am able to get the entire order book from coinbase and gemini it would be nice to get it from binance too - even if it takes three tries, for example (1 call at default 100, 1 call at 2500 and then the final one at 5000). Not getting Binance's full order book short changes it as an option to buy the desired BTC amount.

If I had more time I would also like to add more error handling if a request to an exchange times out, returns an error or something else. I would also like to add tests and bring in typescript to add types.

### Q) Which parts are you most proud of? And why?

I'm most proud of how I opted to separate out the tasks into different modules. With how it's laid out it would be relatively easy to add another exchange.

### Q) Which parts did you spend the most time with? What did you find most difficult?

Getting back up to speed with async/await and Promises.

### Q) How did you find the test overall? Did you have any issues or have difficulties completing? If you have any suggestions on how we can improve the test, we'd love to hear them.

I enjoyed it 🤙 and think it did a good job resembling a real world challenge.
