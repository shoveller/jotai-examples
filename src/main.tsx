import React, { FC, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { queryClientAtom } from 'jotai-tanstack-query'
import Layout from './Layout.tsx'
import Case0 from './Case0.tsx'
import Case1 from './Case1.tsx'
import Case2 from './Case2.tsx'
import Case3 from './Case3.tsx'
import Case4 from './Case4.tsx'
import Case5 from './Case5.tsx'
import Case6 from './Case6.tsx'
import Case7 from './Case7.tsx'
import Case8 from './Case8.tsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index path="case0" element={<Case0 />} />
    <Route path="case1" element={<Case1 />} />
    <Route path="case2" element={<Case2/>} />
    <Route path="case3" element={<Case3/>} />
    <Route path="case4" element={<Case4/>} />
    <Route path="case5" element={<Case5/>} />
    <Route path="case6" element={<Case6/>} />
    <Route path="case7" element={<Case7/>} />
    <Route path="case8" element={<Case8/>} />
  </Route>
))

// react query 는 QueryClient 가 본체!
const client = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime === 유통기한
      staleTime: 0 // 이 부분을 알잘딱갈센하게 설정하면 됩니다.
    }
  }
});

const HydrateAtoms: FC<PropsWithChildren> = ({ children }) => {
  useHydrateAtoms([[queryClientAtom, client]])
  return children
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Provider>
        <HydrateAtoms>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </HydrateAtoms>  
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
