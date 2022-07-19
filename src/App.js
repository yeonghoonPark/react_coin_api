import { useState, useEffect } from "react";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coinsPrice, setCoinsPrice] = useState(Infinity)
  const [inputMoney, setInputMoney] = useState(0);
  const [resultNumber, setResultNumber] = useState("");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then(res => res.json())
      .then((data) => {
        setCoins(data)
        setLoading(false)
      });
  }, []);

  const choosePriceCoin = (event) => {
    const price = coins[event.target.selectedIndex].quotes.USD.price;
    setCoinsPrice(price);
  }

  const onChangeInputMoney = (event) => {
    setInputMoney(event.target.value);
  }

  const onCalculate = (event) => {
    event.preventDefault();
    setResultNumber(inputMoney / coinsPrice);
  }

  return (
    <div>
      <h1>Coins</h1>
      {
        loading ?
          <span>Lading.....</span> :
          <div>
            <select onChange={choosePriceCoin}>
              {
                coins.map((item) => {
                  return (
                    <option key={item.id}>
                      {item.name} : {item.symbol} $({item.quotes.USD.price})
                    </option>
                  );
                })
              }
            </select>
            <hr style={{ margin: '20px 0' }} />
            <form onSubmit={onCalculate}>
              <input
                style={{ width: '250px' }}
                type="number"
                placeholder="Fill in the price of the dollar you want"
                onChange={onChangeInputMoney}
              />
              <button
                style={{ margin: '0 5px' }}
                type="submit"
              >
                Calculate
              </button>
            </form>
            <hr style={{ margin: '20px 0' }} />
            <span>The coin you can buy with the dollar you filled in is...
              {
                resultNumber ?
                  ` = ${resultNumber}(Coin unit)` :
                  null
              }
            </span>
            <br />
          </div>
      }
    </div>
  );
}

export default App;
