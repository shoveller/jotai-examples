import { useSearchParams } from "react-router-dom";
import { getList } from "./api";
import { useAtom, atom } from "jotai";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { atomWithSuspenseQuery } from "jotai-tanstack-query"

const createPokeDataAtom = (page: number) => {
  const pokeDataAtom = atomWithSuspenseQuery(() => {
    return {
      queryKey: ["pokeData", page],
      queryFn: () => getList(page),
    }
  })

  return pokeDataAtom;
}

const pokeDataAtomAtom = atom(createPokeDataAtom(0));

const List = () => {
  // data 가 promise 입니다.
  const [dataAtom] = useAtom(pokeDataAtomAtom);
  const [data] = useAtom(dataAtom);

  return (
    <ul>
      {data?.data.results.map((item) => {
        return <li key={item.name}>{item.name}</li>;
      })}
    </ul>
  );
};

const Paginator = () => {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || "0");
  const [_, setPokeDataAtomAtom] = useAtom(pokeDataAtomAtom)

  useEffect(() => {
    setPokeDataAtomAtom(createPokeDataAtom(page))
  }, [page, setPokeDataAtomAtom])

  return (
    <>
      <button onClick={() => setParams({ page: `${page - 1}` })}>-</button>
      <span>{page}</span>
      <button onClick={() => setParams({ page: `${page + 1}` })}>+</button>
    </>
  );
};

const Case8 = () => {
  return (
    <>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback="로딩중">
          <List />
        </Suspense>
      </ErrorBoundary>
      <Paginator />
    </>
  );
};

export default Case8;
