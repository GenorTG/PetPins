import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill} from'react-icons/ri'
// import { IoIosArrowForward } from 'react-icons/io'

import banner from '/assets/bannerwhite.png'



function sidebar({user, closeToggle, categories}) {

    const isNotActiveStyle = 'justify-start flex items-center px-5 py-1 gap-3 text-light1 hover:text-secondary transition-all duration-200 ease-in-out capitalize hover:shadow-md'
    const isActiveStyle = 'justify-start flex items-center px-5 py-1 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize hover:shadow-md'

    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false)
    }

    return (
        <div className='flex flex-col justify-between bg-main text-secondary h-full overflow-y-scroll min-w-210 hide-scrollbar'>

            <div className='flex flex-col'>
                <Link to="/"
                    className='flex px-5 gap-2 my-5 pt-1 w-275 items-center'
                    onClick={handleCloseSidebar}>

                    <img src={banner} alt='banner' className='w-full' />
                </Link>

                <div className='flex flex-col gap-5'>
                    <NavLink 
                        to="/"
                        onClick={handleCloseSidebar}
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
                        <RiHomeFill />
                        Home
                    </NavLink>

                    <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover categories</h3>

                    {categories &&
                         categories.slice(0, categories.length).map((category) => (
                             <NavLink 
                                 to={`/category/${category.name}`} 
                                 key={category.name}
                                 onClick={handleCloseSidebar}
                                 className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
                                 <div className="w-14 h-14 overflow-hidden rounded-full flex items-center justify-center">
                                     <img src={category.image} alt="" className="object-cover w-full h-full border-2 border-light1 rounded-full shadow-md"/>
                                 </div>
                                 {category.name}
                             </NavLink>
                         ))}
                </div>
            </div>

            {user && (
                <Link to={`user-profile/${user._id}`}
                    className='flex my-5 mb-3 gap-2 p-2 items-center rounded-lg shadow-lg mx-3 border-2 border-secondary'
                    onClick={handleCloseSidebar}>
                    <img 
                        referrerPolicy='no-referrer'
                        src={user.image} alt="userimg" className='w-10 h-10 rounded-full' />
                    <p>{user.userName}</p>
                </Link>
            )
            }
        </div>
    )
}
export default sidebar