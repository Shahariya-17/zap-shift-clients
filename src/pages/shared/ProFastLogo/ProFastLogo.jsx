import React from 'react';
import logo from '../../../assets/logo.png'

const ProFastLogo = () => {
    return (
        <div className='flex '>
            <img src={logo} alt="" />
            <p className='text-2xl mt-5'>Profast</p>
        </div>
    );
};

export default ProFastLogo;