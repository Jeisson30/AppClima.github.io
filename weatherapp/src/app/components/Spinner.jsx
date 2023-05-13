import React from "react";
import spinner from '../../../public/spinner.gif'

const Spinner = () => {
    return (
        <>
            <Image src={spinner} alt='Loading' />
              {/*<Image 
            src='https://images.unsplash.com/photo-1454789476662-53eb23ba5907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=452&q=80'
            layout="fill"
            className='object-cover'
          /> */}
        </>
    )
}
export default Spinner