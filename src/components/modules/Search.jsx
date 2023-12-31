

const Search = ({currency, setCurrency}) => {
  return (
    <div>
        <input type="text"/>
      <select onChange={e=>setCurrency(e.target.value)}>
        <option vlaue="usd">USD</option>
        <option vlaue="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
    </div>
  );
}

export default Search