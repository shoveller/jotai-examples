import { useSearchParams } from "react-router-dom";
import { getList } from "./api";
import { useQuery } from '@tanstack/react-query'

const List = () => {
    const [params] = useSearchParams();
    const page = Number(params.get('page') || '0')
    const { isError, isLoading, data } = useQuery({
      queryKey: ["pokeData", page],
      queryFn: () => getList(page)
    })

    if (isLoading) {
        return <>로딩중</>
    }
    if (isError) {
        return <>에러 발생</>
    }

    return (
        <ul>
        {data?.results.map((item) => {
          return <li key={item.name}>{item.name}</li>;
        })}
      </ul>
    )
}

const Paginator = () => {
    const [params, setParams] = useSearchParams();
    const page = Number(params.get('page') || '0')

    return (
        <>
            <button onClick={() => setParams({ page: `${page -1}` })}>-</button>
            <span>{page}</span>
            <button onClick={() => setParams({ page: `${page +1}` })}>+</button>
        </>
    )
}

const Case6 = () => {
  return (
    <>
      <List />
      <Paginator />
    </>
  );
};

export default Case6;
