import React, {useState} from 'react'
import { Route, Routes } from 'react-router-dom'

import {
    Navbar,
    Feed,
    PinDetail,
    Search,
    CreatePin
} from '../components/index'


const pins = ({user}) => {

    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className='px-2 md:px-5'>
            <div className='bg-gray-100'>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
            </div>

            <div className='h-full'>
                <Routes>
                    <Route path='/' element={<Feed />} />
                    <Route path='/category/:categoryId' element={<Feed />} />
                    <Route path='/pin-detail/:pinID' element={<PinDetail user={user} />} />
                    <Route path='/create-pin' element={<CreatePin user={user} />} />
                    <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
                </Routes>
            </div>
        </div>
    )
}
export default pins
