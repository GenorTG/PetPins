import React, {useState, useEffect} from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { clearUser } from  '../utils/fetchUser'

const randomImage = 'https://source.unsplash.com/800x450/?animal,cute'

const activeBtnStyles = 'bg-main text-white text-sm font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-primary mr-4 text-black text-sm font-bold p-2 rounded-full w-20 outline-none'

const userProfile = () => {

    const [user, setUser] = useState(null)
    const [pins, setPins] = useState(null)
    const [text, setText] = useState('Created') // saved
    const [activeBtn, setActiveBtn] = useState('created')
    const [imageLoaded, setImageLoaded] = useState(false)
    const { userId } = useParams()

    // Preload randomImage
    useEffect(() => {
        const preloadImage = new Image()
        preloadImage.src = randomImage
        preloadImage.onload = () => {
            setImageLoaded(true)
        }
    }, [])
        
    useEffect(() => {
        const query = userQuery(userId)

        client.fetch(query)
            .then((data) => {
                setUser(data[0])
            })
    }, [])

    useEffect(() => {
        if(text === 'Created') {
            const createdPinsQuery = userCreatedPinsQuery(userId)
            client.fetch(createdPinsQuery)
                .then((data) => {
                    setPins(data)
                })
        }
        if(text === 'Saved') {
            const savedPinsQuery = userSavedPinsQuery(userId)
            client.fetch(savedPinsQuery)
                .then((data) => {
                    setPins(data)
                })
        }
    }, [text, userId])


    const logout = () => {
        googleLogout()
        clearUser()
        setUser(null)
        window.location.reload()
    }
    
    if(!user || !imageLoaded) {
        return <Spinner message="Loading profile..." />
    }

    return (
        <div className='relative pb-2 h-full justify-center items-center'>
            <div className='flex flex-col pb-5'>
                <div className='relative flex flex-col mb-7'>
                    <div className='flex flex-col justify-center items-center'>
                        <img src={randomImage} alt="banner" 
                            className='w-full h-370 2xl:h-510 shadow-lg object-cover'
                        />
                        <img 
                            src={user.image}
                            rel='noreferrer'
                            alt="user-pic" 
                            className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
                        />
                        <h1 className='font-bold text-3xl text-center mt-3'>
                            {user.userName}
                        </h1>
                        <div className='absolute top-0 z-1 right-0 p-2'>
                            {userId === user._id && (
                                <button 
                                    type="button"
                                    onClick={() => logout()}
                                    className='bg-white p-2 cursor-pointer w-full h-full rounded-full shadow-md outline-none'
                                >
                                    <AiOutlineLogout color='black' />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='text-center mb-7'>
                        <button 
                            type="button"
                            onClick={(e) => {
                                setText(e.target.textContent)
                                setActiveBtn('created')
                            }}
                            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Created
                        </button>
                        <button 
                            type="button"
                            onClick={(e) => {
                                setText(e.target.textContent)
                                setActiveBtn('saved')
                            }}
                            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Saved
                        </button>
                    </div>
                    <div className='px-2'>
                        {pins?.length 
                            ? (<MasonryLayout pins={pins} />)
                            : (
                                <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
                            No pins found.
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default userProfile