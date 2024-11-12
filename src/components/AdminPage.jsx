import React, { useState } from 'react';
import AdminContainer from './AdminContainer';

function AdminPage() {
  const [eventName, setEventName] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [eventTiming, setEventTiming] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [eventImage, setEventImage] = useState(null);

  const cities = ["Adilabad", "Agartala", "Agra", "Ahmadabad", "Aizawl", "Ajmer", "Alappey", "Alappuzha", 
    "Aligarh", "Allahabad", "Aluva", "Amaravathi", "Ambala", "Amritsar", "Anand", "Anantapur", "Anantnag", 
    "Asansol", "Aurangabad", "Bagalkot", "Balharshah", "Baramulla", "Bareily", "Belagavi", "Bellary", 
    "Bengaluru", "Bhadravathi", "Bhatinda", "Bhilai", "Bhimavaram", "Bhiwani", "Bhopal", "Bhuj", "Bijapur",
     "Bijar", "Bikaner", "Bilaspur", "Bokaro", "Brahmapur", "Bubhaneshwar", "Chandigarh", "Chandrapur", 
     "Chennai", "Chirala", "Chittor", "Coimbatore", "Cuddapah", "Cuttack", "Daman", "Darbhanga", "Darjeeling", "Dehradun", "Dhanbad", "Dharmashala", "Dharwad", "Dhavangere", "Dibrugarh", "Dispur", "Durgapur", "Eluru", "Faizabad", "Faridabad", "Gandhinagar", "Gangtok", "Gaya", "Ghaziabad", "Gorakhpur","Goa", "Guntur", "Gurugram", "Guwahati", "Gwalior", "Haridwar", "Hassan", "Hindupur", "Hissar", "Howrah", "Hubli", "Hyderabad", "Imphal", "Indore", "Itanagar", "Itanagar", "Itarsi", "Jabalpur", "Jagdalpur", "Jaipur", "Jaisalmer", "Jallandhar", "Jammu", "Jamshedpur", "Jhamnagar", "Jhansi", "Jodhpuer", "Junagadh", "Kakinada", "Kalburgi", "Kalyan", "Kancheepuram", "Kanpur", "Kargil", "Kargil", "Karimnagar", "Karnal", "Kawaratti", "Khammam", "Kharagpur", "Kochi", "Kohima", "Kolhapur", "Kolkata", "Kollam", "Konark", "Kota", "Kothagudem", "Kottayam", "Kozicode", "Kullu", "Kurnool", "Kurukshetra", "Latur", "Leh", "Lucknow", "Ludhiana", "Machilipatnam", "Madhurai", "Mahboobnagar", "Malappuram", "Manali", "Mandi", "Mandya", "Mangaluru", "Manipal", "Mathura", "Meerut", "Mohali", "Moradabad", "Mumbai", "Muzaffarnagar", "Muzaffarpur", "Mysuru", "Nagpur", "Nainital", "Nalgonda", "Nanded", "Nandyal", "Narasaraopet", "Nasik", "Nellore", "New Delhi ", "Nizamabad", "Noida", "Ongole", "Panaji", "Panchkula", "Panipat", "Paradeep", "Pathankot", "Patiala", "Patna", "Pilani", "Pondicherry", "Port Blair", "Proddutur", "Pune", "Puri", "Raebareily", "Raichur", "Raigad", "Raigarh", "Raipur", "Rajamandry", "Rajkot", "Ramagundam", "Rameshwaram", "Ranchi", "Rayagad", "Rishikesh", "Rohtak", "Roorkee", "Salem", "Satna", "Secunderabad", "Shillong", "Shimla", "Shimoga", "Siliguri", "Silvassa", "Sivakasi", "Solapur", "Sonipat", "Srikakulam", "Srinagar", "Surat", "Tenali", "Thane", "Thrissur", "Tirunelveli", "Tirupati", "Tiruppur", "Tiruttani", "Tiruvananthapuram", "Trichy", "Tuljapur", "Tumkur", "Udaipur", "Udipi", "Vadodara", "Varanasi", "Vasco", "Vellore", "Vijayanagaram", "Vijayawada", "Visakhapatnam", "Warangal", "Wardha", "Yadgir"]


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data to be sent
    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('placeName', placeName);
    formData.append('eventTiming', eventTiming);
    formData.append('isLive', isLive);
    formData.append('city', selectedCity);
    if (eventImage) {
      formData.append('eventImage', eventImage);
    }

    // Make a POST request to store the data
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/${selectedCity}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Event details successfully submitted!');
        // Clear form
        setEventName('');
        setPlaceName('');
        setEventTiming('');
        setIsLive(false);
        setSelectedCity('');
        setEventImage(null);
      } else {
        alert('Failed to submit event details. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow mt-10 flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Add Event Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
  
          <div className="mb-4">
            <label className="block font-medium mb-1">Place Name</label>
            <input
              type="text"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
  
          <div className="mb-4">
            <label className="block font-medium mb-1">Event Timing</label>
            <input
              type="datetime-local"
              value={eventTiming}
              onChange={(e) => setEventTiming(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
  
          <div className="mb-4">
            <label className="block font-medium mb-1">Is Live?</label>
            <input
              type="checkbox"
              checked={isLive}
              onChange={(e) => setIsLive(e.target.checked)}
              className="ml-2"
            />
          </div>
  
          <div className="mb-4">
            <label className="block font-medium mb-1">City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select a City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
  
          <div className="mb-4">
            <label className="block font-medium mb-1">Event Image</label>
            <input
              type="file"
              onChange={(e) => setEventImage(e.target.files[0])}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
  
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>
      </div>
  
      {/* Right Side - AdminContainer */}
      <div className="w-full md:w-1/3 p-4">
        <AdminContainer />
      </div>
    </div>
  );
  
}

export default AdminPage;

