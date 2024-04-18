/**
 * Home component renders the main home page.
 *
 * Uses React hooks for state:
 * - toggleSidebar: state for sidebar open/close
 * - user: current logged in user data
 * - scrollRef: ref for scrolling container div
 *
 * Fetches current user data from backend on mount.
 * Renders sidebar, header, main content routes.
 * Handles sidebar open/close interactions.
 */
import React, { useState, useEffect, useRef } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom'
import { Sidebar, UserProfile } from '../components/index'
import Pins from './pins'
import { client } from '../client'
import banner from '/assets/banner.png'
import { userQuery } from '../utils/data'
import { fetchUser } from '../utils/fetchUser'
import { categories as originalCategories, pixabayCategoryImg } from '../utils/data'

const Home = () => {

    const [categories, setCategories] = useState(null)
    
    const assignCategories = () => {
        const promises = originalCategories.map(({ name, image }) => {
            return pixabayCategoryImg(image).then(img => ({ name, image: img }))
        })

        Promise.all(promises)
            .then(newCategories => setCategories(newCategories))
            .catch(error => console.error('Error fetching category images:', error))
    }

    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [user, setUser] = useState(null)
    const scrollRef = useRef(null)

    //store user info in local storage
    const userInfo = fetchUser()
    // query the backend for info with the current user
    useEffect(() => {
        const query = userQuery(userInfo?.sub)
        client.fetch(query).then((data) => {
            setUser(data[0])
        })
    }, [])

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
        assignCategories()
    }, [])

    return (
        <div className="flex bg-gray-100 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
            <div
                className="hidden md:flex h-screen flex-initial"
            >
                <Sidebar user={user && user} closeToggle={setToggleSidebar} categories={categories} />
            </div>

            {/* sidebar toggle and sidebar for medium devices */}
            <div className="flex md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu
                        fontSize={40}
                        className="cursor-pointer"
                        onClick={() => setToggleSidebar(true)}
                    />

                    <Link to="/">
                        <img src={banner} alt="banner" className="w-60" />
                    </Link>

                    <Link to={`user-profile/${user?._id}`}>
                        <img 
                            src={user?.image} 
                            rel='noreferrer'
                            alt="banner" 
                            className="w-28 rounded-full" />
                    </Link>
                </div>

                {toggleSidebar && (
                    <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                        <div className="absolute w-full flex justify-end items-center p-2">
                            <AiFillCloseCircle
                                fontSize={30}
                                className="cursor-pointer"
                                onClick={() => setToggleSidebar(false)}
                            />
                        </div>

                        <Sidebar user={user && user} closeToggle={setToggleSidebar} categories={categories}/>
                    </div>
                )}
            </div>

            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userId" element={<UserProfile />} />
                    <Route path="/*" element={<Pins user={user && user} />} />
                </Routes>
            </div>
        </div>
    )
}
export default Home
