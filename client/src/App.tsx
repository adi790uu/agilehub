//@ts-nocheck

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Ui/Navbar'
import Profile from './pages/Profile'
import ManageProjects from './pages/ManageProjects'
import Footer from './components/Ui/Footer'
import Project from './pages/Project'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import { trpc } from './utils/trpc'

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  )
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'https://agilehub-backend.onrender.com',

          async headers() {
            return {
              authorization: 'Bearer ' + localStorage.getItem('token') || '',
            }
          },
        }),
      ],
    }),
  )
  const token = localStorage.getItem('token')
  console.log(token)
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="h-screen w-screen">
          <BrowserRouter>
            {token && <Navbar />}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/"
                element={
                  token ? <Navigate to="/home" /> : <Navigate to="/signup" />
                }
              />
              <Route path="/home" element={<Outlet />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="manage" element={<ManageProjects />} />
                <Route path="project/:id" element={<Project />} />
              </Route>
            </Routes>
            {token && <Footer />}
          </BrowserRouter>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
