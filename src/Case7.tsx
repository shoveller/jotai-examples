import { useSearchParams } from "react-router-dom";
import { getList } from "./api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const List = () => {
  const [params] = useSearchParams();
  const page = Number(params.get("page") || "0");
  // data 가 promise 입니다.
  const { data } = useSuspenseQuery({
    queryKey: ["pokeData", page],
    queryFn: () => getList(page),
  });

  return (
    <ul>
      {data?.results.map((item) => {
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

const Case7 = () => {
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

export default Case7;
