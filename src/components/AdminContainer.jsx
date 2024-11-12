// import React, { useState, useEffect } from "react";

// function AdminContainer() {
//   const [events, setEvents] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const cities = ["belgaum", "bangalore", "City 3"]; // Replace with actual city data
//   const [selectedCity, setSelectedCity] = useState("");

//   // Fetch events for the selected city
//   const fetchEvents = async (city) => {
//     if (!city) return;
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`http://localhost:8080/api/events/${city}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch events.");
//       }
//       const data = await response.json();
//       setEvents(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCityChange = (e) => {
//     const city = e.target.value;
//     setSelectedCity(city);
//     fetchEvents(city);
//   };

//   const handleToggleLive = async (eventId, currentStatus) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/events/${eventId}?isLive=${!currentStatus}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Check if the response content type is JSON
//       const contentType = response.headers.get("content-type");
//       let responseData;
//       if (contentType && contentType.includes("application/json")) {
//         responseData = await response.json();
//       } else {
//         responseData = await response.text(); // Fallback to text if not JSON
//       }

//       if (!response.ok) {
//         throw new Error(responseData.error || "Failed to update live status");
//       }

//       // Update state after successful response
//       setEvents((prevEvents) =>
//         prevEvents.map((event) =>
//           event.id === eventId ? { ...event, isLive: !currentStatus } : event
//         )
//       );

//       console.log("Server response:", responseData);
//     } catch (err) {
//       console.error("Error updating live status:", err);
//       alert("An error occurred while updating live status.");
//     }
//   };

//   const handleDeleteEvent = async (eventId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/events/${eventId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (response.ok) {
//         alert("Event deleted successfully");
//         fetchEvents(selectedCity); // Refresh events after deletion
//       } else {
//         alert("Failed to delete event");
//       }
//     } catch (err) {
//       console.error("Error deleting event:", err);
//       alert("An error occurred while deleting the event.");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-6 rounded shadow mt-10">
//       <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
//       <select
//         value={selectedCity}
//         onChange={handleCityChange}
//         className="border p-2 rounded mb-4"
//       >
//         <option value="">-- Select a City --</option>
//         {cities.map((city, index) => (
//           <option key={index} value={city}>
//             {city}
//           </option>
//         ))}
//       </select>

//       {error && <p className="text-red-500">{error}</p>}
//       {!isLoading && !error && events.length === 0 && (
//         <p>No events available for this city.</p>
//       )}

     
//       {/* Display events with options to toggle live or delete */}
//       <div>
//         {events.map((event) => (
//           <div key={event.id} className="bg-white p-4 shadow rounded mb-4">
//             <h3 className="text-xl font-bold">{event.eventName}</h3>
//             <p>{event.placeName}</p>
//             <p>{new Date(event.eventTiming).toLocaleString()}</p>
//             <p className={event.isLive ? "text-green-500" : "text-red-500"}>
//               {event.isLive ? "Live" : "Not Live"}
//             </p>

//             {/* Conditionally render the buttons based on the initial `isLive` status */}
//             {event.isLive ? (
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//                 onClick={() => handleToggleLive(event.id, true)}
//               >
//                 Set as Not Live
//               </button> 
//             ) : (
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//                 onClick={() => handleToggleLive(event.id, false)}
//               >
//                 Set as Live
//               </button>
//             )}

//             {/* Delete event button */}
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded"
//               onClick={() => handleDeleteEvent(event.id)}
//             >
//               Delete Event
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AdminContainer;

import React, { useState, useEffect } from "react";

function AdminContainer() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [selectedCity, setSelectedCity] = useState("");

  const cities = ["Adilabad", "Agartala", "Agra", "Ahmadabad", "Aizawl", "Ajmer", "Alappey", "Alappuzha", 
    "Aligarh", "Allahabad", "Aluva", "Amaravathi", "Ambala", "Amritsar", "Anand", "Anantapur", "Anantnag", 
    "Asansol", "Aurangabad", "Bagalkot", "Balharshah", "Baramulla", "Bareily", "Belagavi", "Bellary", 
    "Bengaluru", "Bhadravathi", "Bhatinda", "Bhilai", "Bhimavaram", "Bhiwani", "Bhopal", "Bhuj", "Bijapur",
     "Bijar", "Bikaner", "Bilaspur", "Bokaro", "Brahmapur", "Bubhaneshwar", "Chandigarh", "Chandrapur", 
     "Chennai", "Chirala", "Chittor", "Coimbatore", "Cuddapah", "Cuttack", "Daman", "Darbhanga", "Darjeeling", "Dehradun", "Dhanbad", "Dharmashala", "Dharwad", "Dhavangere", "Dibrugarh", "Dispur", "Durgapur", "Eluru", "Faizabad", "Faridabad", "Gandhinagar", "Gangtok", "Gaya", "Ghaziabad", "Gorakhpur","Goa", "Guntur", "Gurugram", "Guwahati", "Gwalior", "Haridwar", "Hassan", "Hindupur", "Hissar", "Howrah", "Hubli", "Hyderabad", "Imphal", "Indore", "Itanagar", "Itanagar", "Itarsi", "Jabalpur", "Jagdalpur", "Jaipur", "Jaisalmer", "Jallandhar", "Jammu", "Jamshedpur", "Jhamnagar", "Jhansi", "Jodhpuer", "Junagadh", "Kakinada", "Kalburgi", "Kalyan", "Kancheepuram", "Kanpur", "Kargil", "Kargil", "Karimnagar", "Karnal", "Kawaratti", "Khammam", "Kharagpur", "Kochi", "Kohima", "Kolhapur", "Kolkata", "Kollam", "Konark", "Kota", "Kothagudem", "Kottayam", "Kozicode", "Kullu", "Kurnool", "Kurukshetra", "Latur", "Leh", "Lucknow", "Ludhiana", "Machilipatnam", "Madhurai", "Mahboobnagar", "Malappuram", "Manali", "Mandi", "Mandya", "Mangaluru", "Manipal", "Mathura", "Meerut", "Mohali", "Moradabad", "Mumbai", "Muzaffarnagar", "Muzaffarpur", "Mysuru", "Nagpur", "Nainital", "Nalgonda", "Nanded", "Nandyal", "Narasaraopet", "Nasik", "Nellore", "New Delhi ", "Nizamabad", "Noida", "Ongole", "Panaji", "Panchkula", "Panipat", "Paradeep", "Pathankot", "Patiala", "Patna", "Pilani", "Pondicherry", "Port Blair", "Proddutur", "Pune", "Puri", "Raebareily", "Raichur", "Raigad", "Raigarh", "Raipur", "Rajamandry", "Rajkot", "Ramagundam", "Rameshwaram", "Ranchi", "Rayagad", "Rishikesh", "Rohtak", "Roorkee", "Salem", "Satna", "Secunderabad", "Shillong", "Shimla", "Shimoga", "Siliguri", "Silvassa", "Sivakasi", "Solapur", "Sonipat", "Srikakulam", "Srinagar", "Surat", "Tenali", "Thane", "Thrissur", "Tirunelveli", "Tirupati", "Tiruppur", "Tiruttani", "Tiruvananthapuram", "Trichy", "Tuljapur", "Tumkur", "Udaipur", "Udipi", "Vadodara", "Varanasi", "Vasco", "Vellore", "Vijayanagaram", "Vijayawada", "Visakhapatnam", "Warangal", "Wardha", "Yadgir"]


  // Fetch events for the selected city
  const fetchEvents = async (city) => {
    if (!city) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://ca0a-103-182-221-161.ngrok-free.app/api/events/${city}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch events.");
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change for search bar
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  // Handle city selection
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchQuery(city);
    fetchEvents(city);
    setSearchQuery("");
  };

  // Filter cities based on search query
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleLive = async (eventId, currentStatus) => {
    try {
      const response = await fetch(
        `https://ca0a-103-182-221-161.ngrok-free.app/api/events/${eventId}?isLive=${!currentStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const contentType = response.headers.get("content-type");
      let responseData;
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to update live status");
      }

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, isLive: !currentStatus } : event
        )
      );
    } catch (err) {
      console.error("Error updating live status:", err);
      alert("An error occurred while updating live status.");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(
        `https://ca0a-103-182-221-161.ngrok-free.app/api/events/${eventId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Event deleted successfully");
        fetchEvents(selectedCity);
      } else {
        alert("Failed to delete event");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("An error occurred while deleting the event.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Manage Events</h2>

      {/* Search and Select Input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        />
        {searchQuery && filteredCities.length > 0 && (
          <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow">
            {filteredCities.map((city, index) => (
              <div
                key={index}
                onClick={() => handleCitySelect(city)}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && events.length === 0 && (
        <p>No events available for this city.</p>
      )}

      {/* Display events with options to toggle live or delete */}
      <div>
        {events.map((event) => (
          <div key={event.id} className="bg-white p-4 shadow rounded mb-4">
            <h3 className="text-xl font-bold">{event.eventName}</h3>
            <p>{event.placeName}</p>
            <p>{new Date(event.eventTiming).toLocaleString()}</p>
            <p className={event.isLive ? "text-green-500" : "text-red-500"}>
              {event.isLive ? "Live" : "Not Live"}
            </p>

            {/* Conditionally render the buttons based on the initial `isLive` status */}
            {event.isLive ? (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleToggleLive(event.id, true)}
              >
                Set as Not Live
              </button>
            ) : (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleToggleLive(event.id, false)}
              >
                Set as Live
              </button>
            )}
            <br/><br/>
            {/* Delete event button */}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDeleteEvent(event.id)}
            >
              Delete Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminContainer;

