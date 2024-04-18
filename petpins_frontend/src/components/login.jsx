import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import shareVideo from '/assets/kitty.mp4'
import banner from '/assets/bannerwhite.png'
import { client } from '../client'
import { jwtDecode } from 'jwt-decode'

const Login = () => {

    const navigate = useNavigate()
    
    const responseGoogle = (response) => {
        const { name, sub, picture } = jwtDecode(response.credential)
        
        const userInfo = {
            name,
            sub,
            picture
        }
        
        const userJSON = JSON.stringify(userInfo)

        localStorage.setItem('user', userJSON)

        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture,
        }

        client.createIfNotExists(doc)
            .then(() => {
                navigate('/', {replace: true})
            })
    }

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                <div className="p-5">
                    <img src={banner} alt="banner" width="330px" />
                </div>

                <div className='shadows-2xl'>
                    <GoogleLogin
                        onSuccess={responseGoogle}
                        onError={responseGoogle}
                    />

                </div>
            </div>
        </div>
    )
}

export default Login
