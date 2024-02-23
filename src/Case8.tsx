import { useSearchParams } from "react-router-dom";
import { getList } from "./api";
import { useAtom } from "jotai";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { atomFamily } from 'jotai/utils'
import { atomWithSuspenseQuery } from "jotai-tanstack-query"

const pokeDataAtomFamily = atomFamily((page: number) => {
  const pokeDataAtom = atomWithSuspenseQuery(() => {
    return {
      queryKey: ["pokeData", page],
      queryFn: () => getList(page),
    }
  })

  return pokeDataAtom;
});

const List = () => {
  const [params] = useSearchParams();
  const page = Number(params.get("page") || "0");
  // data 가 promise 입니다.
  const [data] = useAtom(pokeDataAtomFamily(page));

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
