import React from 'react';

function Gallery() {
  return (
    <div className="py-12 bg-gradient-to-r from-gray-200 to-gray-400 text-center">
      <h1 className="text-3xl font-bold mb-8">Showcase</h1>
      <div className="grid grid-cols-4 gap-4 mx-auto max-w-screen-lg">
        <img src="https://media.istockphoto.com/id/1319479588/photo/the-musicians-were-playing-rock-music-on-stage-there-was-an-audience-full-of-people-watching.jpg?s=612x612&w=0&k=20&c=OrGoVzFYygF904aMkM38N_v53yyBI5D_aWkpZZhTvEY=" alt="Event 1" className="col-span-2 row-span-2 rounded-lg object-cover w-full h-full" />
        <img src="https://static.vecteezy.com/system/resources/thumbnails/027/104/127/small_2x/cheering-crowd-illuminated-by-vibrant-stage-lights-at-concert-photo.jpg" alt="Event 2" className="rounded-lg object-cover w-full h-full" />
        <img src="https://images.unsplash.com/photo-1575285113814-f770cb8c796e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWMlMjB2ZW51ZXxlbnwwfHwwfHx8MA%3D%3D" alt="Event 3" className="rounded-lg object-cover w-full h-full" />
        <img src="https://img.freepik.com/premium-photo/dj-mixing-music-stage-concert_886350-729.jpg" alt="Event 4" className="rounded-lg object-cover w-full h-full" />
        <img src="https://img.freepik.com/premium-photo/silhouettes-dancing-people-music-festival-concert-background-dj-night-club-party-rave-with-crowd-music-festival-ai-generated_538213-5887.jpg" alt="Event 5" className="rounded-lg object-cover w-full h-full" />
        
      </div>
    </div>
  );
}

export default Gallery;
