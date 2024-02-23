import { Link, Outlet } from "react-router-dom"

const Layout = () => {
    return (
    <>
        <ul>
            <li>
                <Link to="case0">Case 0</Link>
            </li>
        </ul>
        <Outlet />
    </>
    )
}

export default Layout;