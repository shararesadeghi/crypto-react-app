import { useEffect, useState } from "react"
import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../../services/cryptoApi";
import Pagination from "../modules/Pagination";


const HomePage = () => {

    const [coins, setCoins] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(()=>{
      setIsLoading(true);
        const getData = async ()=>{
            const res = await fetch(getCoinList(page));
            const data = await res.json();
            setCoins(data);
            setIsLoading(false);
        }
        getData();
    },[page])
  return (
    <div>
        <TableCoin coins={coins} isLoading={isLoading}/>
        <Pagination page={page} setPage={setPage}/>
    </div>
  )
}

export default HomePage