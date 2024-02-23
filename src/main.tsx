import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import Layout from './Layout.tsx'
import Case0 from './Case0.tsx'
import Case1 from './Case1.tsx'
import Case2 from './Case2.tsx'
import Case3 from './Case3.tsx'
import Case4 from './Case4.tsx'
import Case5 from './Case5.tsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index path="case0" element={<Case0 />} />
    <Route path="case1" element={<Case1 />} />
    <Route path="case2" element={<Case2/>} />
    <Route path="case3" element={<Case3/>} />
    <Route path="case4" element={<Case4/>} />
    <Route path="case5" element={<Case5/>} />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
