import { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoApi";
import { RotatingLines } from "react-loader-spinner";

const Search = ({ currency, setCurrency }) => {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }
    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.coins) {
          setCoins(data.coins);
          setIsLoading(false);
        } else {
          alert(data.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setIsLoading(true);
    search();
    return () => controller.abort();
  }, [text]);
  return (
    <div>
      <input
        placeholder="Search"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select vlaue={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option vlaue="usd">USD</option>
        <option vlaue="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      <div>
        {isLoading && <RotatingLines strokeWidth="2" strokeColor="#3874ff" />}
        <ul>
          {coins.map((coin) => (
            <li key={coin.id}>
              <img src={coin.thumb} alt={coin.name} />
              <p>{coin.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
