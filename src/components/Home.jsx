import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();
  return (
    <div className="text-center  h-96 mt-56">
      <h1 className="text-4xl font-bold mb-6">Welcome to Artist Live Events</h1>
      <p className="text-xl mb-8">Discover amazing live events happening across India!</p>
      <button
        className="text-lg px-8 py-3 bg-slate-950 text-white rounded-lg shadow-md hover:bg-sky-600 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
        onClick={() => navigate('/select-city')}
      >
        Find Events Near You
      </button>
      {/* <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Events</h2>
 
        <p className="text-gray-600">Check back soon for featured events!</p>
      </div> */}
    </div>
  );
}

export default Home;