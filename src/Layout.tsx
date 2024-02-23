import { Link, Outlet } from "react-router-dom"

const Layout = () => {
    return (
    <>
        <ul>
            <li>
                <Link to="case0">ts + fetch</Link>
            </li>
            <li>
                <Link to="case1">ts + fetch + react-router-dom</Link>
            </li>
            <li>
                <Link to="case2">ts + fetch + jotai + loadable</Link>
            </li>
            <li>
                <Link to="case3">ts + fetch + jotai + suspense</Link>
            </li>
            <li>
                <Link to="case4">ts + fetch + jotai + suspense + react-router-dom + atomFamily</Link>
            </li>
            <li>
                <Link to="case5">ts + fetch + jotai + suspense + react-router-dom + atom in atom</Link>
            </li>
            <li>
                <Link to="case6">ts + fetch + react-query + loadable + react-router-dom</Link>
            </li>
            <li>
                <Link to="case7">ts + fetch + react-query + suspense + react-router-dom</Link>
            </li>
            <li>
                <Link to="case8">ts + fetch + react-query + suspense + react-router-dom + jotai + atom in atom</Link>
            </li>
        </ul>
        <Outlet/>
    </>
    )
}

export default Layout;
