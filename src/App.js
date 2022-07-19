import { useState, useEffect } from "react";

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then(res => res.json())
      .then(data => setCoins(data));
  }, [])

  return (
    <div>
      <h1>Coins</h1>
      <ul>
      {
        coins.map((item)=>{
          return <li key={item.id}>{item.name} : {item.symbol} $({item.quotes.USD.price})</li>
        })
      }
      </ul>
    </div>
  );
}

export default App;
