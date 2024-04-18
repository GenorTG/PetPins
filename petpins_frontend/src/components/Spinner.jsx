import React from 'react'
import { ThreeCircles }  from 'react-loader-spinner'
import PropTypes from 'prop-types'

const Spinner = ({ message }) => {
    return (
        <div className='flex flex-col justify-center items-center w-full h-full p-5'>
            <ThreeCircles 
                type="Circles" 
                color="#00BFFF"
                height={50}
                width={200}
                className="m-5"
            />

            <p className='text-lg text-center px-2'>{message}</p>
        </div>
    )
}

Spinner.propTypes = {
    message: PropTypes.string.isRequired
}

export default Spinner