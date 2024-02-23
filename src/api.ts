type Poke = {
    name: string;
    url: string;
}

export type PokeData = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Poke[]
}

export const getList = (page: number) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}`)
    .then<PokeData>((res) => res.json());
}