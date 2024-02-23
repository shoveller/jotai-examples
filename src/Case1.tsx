import { FC, useEffect, useState } from "react";
import { PokeData, getList } from "./api";
import { useSearchParams } from "react-router-dom";

type ListProps = {
    pokeData?: PokeData
}

const List: FC<ListProps> = ({ pokeData }) => {
    return (
        <ul>
        {pokeData?.results.map((item) => {
          return <li key={item.name}>{item.name}</li>;
        })}
      </ul>
    )
}

type PaginatorProps = {
    page: number;
    setPage: (page: number) => void
}

const Paginator: FC<PaginatorProps> = ({ page, setPage }) => {
    return (
        <>
            <button onClick={() => setPage(page - 1)}>-</button>
            <span>{page}</span>
            <button onClick={() => setPage(page + 1)}>+</button>
        </>
    )
}

const Case1 = () => {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get('page') || '0')
  const setPage = (page: number) => setParams({ page: page.toString() })
  
  // 어떤 그릇인가?
  const [pokeData, setPokeData] = useState<PokeData>();
  useEffect(() => {
    getList(page).then((data) => {
      setPokeData(data);
    });
  }, [page]);

  return (
    <>
      <List pokeData={pokeData} />
      <Paginator page={page} setPage={setPage} />
    </>
  );
};

export default Case1;
