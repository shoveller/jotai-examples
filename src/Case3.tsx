import { Suspense } from "react";
import { getList } from "./api";
import { atom, useAtom } from "jotai";
import { ErrorBoundary } from "react-error-boundary";

const List = () => {
    // throw new Error('에러 발생');
    const [pokeData] = useAtom(pokeDataAtom)

    return (
        <ul>
        {pokeData.results.map((item) => {
          return <li key={item.name}>{item.name}</li>;
        })}
      </ul>
    )
}

const Paginator = () => {
    const [page, setPage] = useAtom(pageAtom)

    return (
        <>
            <button onClick={() => setPage(page - 1)}>-</button>
            <span>{page}</span>
            <button onClick={() => setPage(page + 1)}>+</button>
        </>
    )
}

const pageAtom = atom(0);
// 타입스크립트를 쓰실때 반환값을 명시하지 마세요. 타입스크립트의 추론을 믿으세요.
const pokeDataAtom = atom(async (get) => {
  const page = get(pageAtom);
  // 비동기 처리
  const data = await getList(page);

  return data;
});

const Case3 = () => {
  // ErrorBoundary 는 error 를 try ~ catch 한다
  // suspense 는 promise 를 try ~ catch 한다
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

export default Case3;
