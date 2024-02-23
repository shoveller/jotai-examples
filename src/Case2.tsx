import { getList } from "./api";
import { atom, useAtom } from "jotai";
import { loadable } from "jotai/utils"

const List = () => {
    const [pokeData] = useAtom(loadable(pokeDataAtom))

    if (pokeData.state === 'loading') {
        return <>로딩중</>
    }
    if (pokeData.state === 'hasError') {
        return <>에러 발생</>
    }

    return (
        <ul>
        {pokeData.data.results.map((item) => {
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

const Case2 = () => {
  return (
    <>
      <List />
      <Paginator />
    </>
  );
};

export default Case2;
