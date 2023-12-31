import { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoApi";

const Search = ({ currency, setCurrency }) => {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    if (!text) return;
    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.coins) {
          setCoins(data.coins);
        } else {
          alert(data.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
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
    </div>
  );
};

export default Search;
