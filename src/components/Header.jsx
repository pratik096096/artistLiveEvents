import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
  return (
    <div className="bg-slate-950 text-white py-4">
      <div className="flex flex-row items-center justify-between container mx-auto px-6">
        <h1 className="text-2xl font-bold">Artist Live Events</h1>
        <div className="flex space-x-6 ml-auto  cursor-pointer">
          <h3 onClick={()=>navigate('/')}>Home</h3>
          <h3 className='btn bg-primary rounded px-1' onClick={()=>navigate('/select-city')}>Events</h3>
        </div>
      </div>
    </div>
  );
}

export default Header;
