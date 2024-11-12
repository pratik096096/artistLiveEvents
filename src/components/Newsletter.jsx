import React, { useState } from 'react';

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset the message

    try {
      const response = await fetch(`https://ca0a-103-182-221-161.ngrok-free.app/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Subscribed successfully!");
        setEmail("");
        
      } else {
        setMessage("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };


  return (
    <div className="bg-black text-white py-10 mt-12 rounded-lg shadow-lg mx-auto max-w-4xl md:mt-28 md:mb-32 px-4">
      <div className="px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-base md:text-lg mb-6">
          Get the latest updates on events directly to your inbox.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col md:flex-row gap-4 items-center justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-full text-gray-800 w-full md:w-auto flex-grow focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-200 ease-in-out w-full md:w-auto"
          >
            Subscribe
          </button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
}  
export default Newsletter;
