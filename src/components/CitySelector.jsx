
import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function CitySelector() {
  const [selectedCity, setSelectedCity] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // const cities = ["belgaum", "bangalore", "City3"]; // Replace with actual city names
  const cities = ["Adilabad", "Agartala", "Agra", "Ahmadabad", "Aizawl", "Ajmer", "Alappey", "Alappuzha", 
    "Aligarh", "Allahabad", "Aluva", "Amaravathi", "Ambala", "Amritsar", "Anand", "Anantapur", "Anantnag", 
    "Asansol", "Aurangabad", "Bagalkot", "Balharshah", "Baramulla", "Bareily", "Belagavi", "Bellary", 
    "Bengaluru", "Bhadravathi", "Bhatinda", "Bhilai", "Bhimavaram", "Bhiwani", "Bhopal", "Bhuj", "Bijapur",
     "Bijar", "Bikaner", "Bilaspur", "Bokaro", "Brahmapur", "Bubhaneshwar", "Chandigarh", "Chandrapur", 
     "Chennai", "Chirala", "Chittor", "Coimbatore", "Cuddapah", "Cuttack", "Daman", "Darbhanga", "Darjeeling", "Dehradun", "Dhanbad", "Dharmashala", "Dharwad", "Dhavangere", "Dibrugarh", "Dispur", "Durgapur", "Eluru", "Faizabad", "Faridabad", "Gandhinagar", "Gangtok", "Gaya", "Ghaziabad", "Gorakhpur","Goa", "Guntur", "Gurugram", "Guwahati", "Gwalior", "Haridwar", "Hassan", "Hindupur", "Hissar", "Howrah", "Hubli", "Hyderabad", "Imphal", "Indore", "Itanagar", "Itanagar", "Itarsi", "Jabalpur", "Jagdalpur", "Jaipur", "Jaisalmer", "Jallandhar", "Jammu", "Jamshedpur", "Jhamnagar", "Jhansi", "Jodhpuer", "Junagadh", "Kakinada", "Kalburgi", "Kalyan", "Kancheepuram", "Kanpur", "Kargil", "Kargil", "Karimnagar", "Karnal", "Kawaratti", "Khammam", "Kharagpur", "Kochi", "Kohima", "Kolhapur", "Kolkata", "Kollam", "Konark", "Kota", "Kothagudem", "Kottayam", "Kozicode", "Kullu", "Kurnool", "Kurukshetra", "Latur", "Leh", "Lucknow", "Ludhiana", "Machilipatnam", "Madhurai", "Mahboobnagar", "Malappuram", "Manali", "Mandi", "Mandya", "Mangaluru", "Manipal", "Mathura", "Meerut", "Mohali", "Moradabad", "Mumbai", "Muzaffarnagar", "Muzaffarpur", "Mysuru", "Nagpur", "Nainital", "Nalgonda", "Nanded", "Nandyal", "Narasaraopet", "Nasik", "Nellore", "New Delhi ", "Nizamabad", "Noida", "Ongole", "Panaji", "Panchkula", "Panipat", "Paradeep", "Pathankot", "Patiala", "Patna", "Pilani", "Pondicherry", "Port Blair", "Proddutur", "Pune", "Puri", "Raebareily", "Raichur", "Raigad", "Raigarh", "Raipur", "Rajamandry", "Rajkot", "Ramagundam", "Rameshwaram", "Ranchi", "Rayagad", "Rishikesh", "Rohtak", "Roorkee", "Salem", "Satna", "Secunderabad", "Shillong", "Shimla", "Shimoga", "Siliguri", "Silvassa", "Sivakasi", "Solapur", "Sonipat", "Srikakulam", "Srinagar", "Surat", "Tenali", "Thane", "Thrissur", "Tirunelveli", "Tirupati", "Tiruppur", "Tiruttani", "Tiruvananthapuram", "Trichy", "Tuljapur", "Tumkur", "Udaipur", "Udipi", "Vadodara", "Varanasi", "Vasco", "Vellore", "Vijayanagaram", "Vijayawada", "Visakhapatnam", "Warangal", "Wardha", "Yadgir"]

  // Filter cities based on search query
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to fetch events for the selected city
  const fetchEvents = async (city) => {
    if (!city) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/api/events/${city}`);
      if (!response.ok) {
        throw new Error("Failed to fetch events.");
      }
      const data = await response.json();
      console.log("Fetched Data:", data); // Debugging line
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle city selection
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchQuery(city); // Update input value with the selected city
    fetchEvents(city);
    setSearchQuery("");
  };

  useEffect(() => {
    if (!selectedCity) return; // Don't open WebSocket connection until a city is selected

    // Create a SockJS WebSocket connection
    const socket = new SockJS(`http://localhost:8080/ws`); // WebSocket URL

    // Create a Stomp client instance
    const stompClient = new Client({
      webSocketFactory: () => socket, // Use SockJS for WebSocket connection
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe(`/topic/events/${selectedCity}`, (message) => {
          const event = JSON.parse(message.body);
          console.log("Event update received:", event);

          // Handle event update based on the type of message (new, update, or delete)
          if (event.deleted) {
            // Remove event from state (this will remove it from UI)
            setEvents((prevEvents) =>
              prevEvents.filter((e) => e.id !== event.id)
            );
          } else {
            // Add or update the event in state (this will update the UI)
            setEvents((prevEvents) => {
              const updatedEvents = prevEvents.filter((e) => e.id !== event.id);
              return [...updatedEvents, event]; // Either add new or update existing
            });
          }
        });
      },
      onStompError: (error) => {
        console.error("STOMP error", error);
      },
    });

    // Activate the WebSocket connection
    stompClient.activate();

    return () => {
      stompClient.deactivate(); // Deactivate connection on component unmount
    };
  }, [selectedCity]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Select a City</h1>
  
      {/* Searchable input styled like a dropdown */}
      <div className="relative mb-4 w-64">
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          style={{ maxWidth: "250px" }}
        />
        {searchQuery && filteredCities.length > 0 && (
          <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow bg-gradient-to-l from-sky-300 to-sky-50">
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
  
      {isLoading && <p>Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && events.length === 0 && (
        <p>No events available for this city.</p>
      )}
  
      {/* Display events in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out"
          >
            {event.eventImage && (
              <img
                src={`data:image/jpeg;base64,${event.eventImage}`}
                alt={event.eventName}
                className="w-full h-72 object-cover rounded-t-lg"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-1">{event.eventName}</h2>
              <p className="text-gray-700 font-bold mb-1">{event.placeName}</p>
              <p className="text-gray-600 font-bold text-sm mb-2">
                Time: {new Date(event.eventTiming).toLocaleString()}
              </p>
              <p
                className={`text-sm ${
                  event.live ? "text-green-500" : "text-red-500"
                } mb-2`}
              >
                <strong>{event.live ? "Live" : "Not Live"}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  export default CitySelector;
  

