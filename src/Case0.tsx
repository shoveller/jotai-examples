import { useEffect, useState } from "react";
import { PokeData, getList } from "./api";

const Case0 = () => {
    // 타입스크립트는 결과를 보고 원인을 파악할 수 있다 === 추론
    // 타입스크립트는 원인을 보고 결과를 파악할 수 있다 === 추론
  const [page, setPage] = useState(0);  
  // 어떤 그릇인가?
  const [pokeData, setPokeData] = useState<PokeData>();
  useEffect(() => {
    getList(page).then((data) => {
      setPokeData(data);
    });
  }, [page]);

  return (
    <>
      <ul>
        {pokeData?.results.map((item) => {
          return <li key={item.name}>{item.name}</li>;
        })}
      </ul>
      <button onClick={() => setPage(page - 1)}>-</button>
      <span>{page}</span>
      <button onClick={() => setPage(page + 1)}>+</button>
    </>
  );
};

export default Case0;
