// eslint-disable-next-line no-unused-vars
import React, { useEffect,  } from 'react'
import { Routes, Route, useNavigate } from'react-router-dom'
import Login from './components/login.jsx'
import Home from './container/home.jsx'
import { fetchUser } from './utils/fetchUser.js'
import { QueryClient, QueryClientProvider } from 'react-query'


const App = () => {

    const navigate = useNavigate()
    const userFetch = fetchUser()

    const queryClient = new QueryClient()
    
    useEffect(() => {
        if(!userFetch) {
            navigate('/login')
        }
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <div className='text-2xl hide-scrollbar'>
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route path='login' element={<Login />} />
                </Routes>
            </div>
        </QueryClientProvider>
    )
}

export default App