import React from 'react';
import homeImage from '../components/Images/home.png';
import { MapPin, UtensilsCrossed, Film } from 'lucide-react'; // Lifestyle icons

function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-10">
        {/* Text Section */}
        <section className="text-gray-800 text-center md:text-left md:w-1/2">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Welcome to <span className="text-blue-600">RS Blog</span>
          </h1>
          <p className="text-lg mb-4 text-gray-600">
            A digital diary of taste, travel, and unforgettable moments.
          </p>
          <p className="text-base mb-6 text-gray-500 mr-10">
            Join me on a journey through mouthwatering food spots, scenic travel escapes, local street life,
            and personal experiences that capture the joy of exploring the world — one memory at a time.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300">
            Start Exploring
          </button>
        </section>

        {/* Image Section */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src={homeImage}
            alt="Blog Intro"
            className="rounded-xl w-full h-auto shadow-xl"
          />
        </div>
      </div>

      {/* New Section: What's Inside RS Blog */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">What's Inside RS Blog?</h2>
          <p className="text-gray-600 mt-2 text-lg">A taste of the adventures you'll find here</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Travel */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <MapPin className="mx-auto text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Travel Diaries</h3>
            <p className="text-gray-600">Discover offbeat places, beautiful landscapes, and local adventures from my travels.</p>
          </div>

          {/* Card 2: Food */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <UtensilsCrossed className="mx-auto text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Food Experiences</h3>
            <p className="text-gray-600">From street food to fine dining — enjoy honest reviews, tasty photos, and local flavors.</p>
          </div>

          {/* Card 3: Entertainment & Life */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <Film className="mx-auto text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Stories & Entertainment</h3>
            <p className="text-gray-600">Movie talks, funny encounters, and personal stories that reflect real moments and fun times.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;





































// import React from 'react';

// export default function Home() {
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Hero Section */}
//       <section className="text-center py-20 bg-white text-gray-800">
//         <h1 className="text-5xl font-bold mb-4">Welcome to RS Blog</h1>
//         <p className="text-xl mb-6">A place to share knowledge, stories & passion.</p>
//         <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//           Start Reading
//         </button>
//       </section>

//       {/* Posts Preview */}
//       <section className="px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {[1, 2, 3].map((_, idx) => (
//           <div key={idx} className="bg-white p-5 shadow-md rounded-lg">
//             <h2 className="text-xl font-bold mb-2">Post Title {idx + 1}</h2>
//             <p className="text-gray-600 mb-4">This is a short summary of the blog post...</p>
//             <button className="text-blue-500 hover:underline">Read More</button>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }
// 