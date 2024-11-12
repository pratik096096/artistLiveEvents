import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-8 mt-12 text-center">
      <div className="container mx-auto px-4">
        <div>
          {/* Company Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Artist Live Events</h3>
            <p className="text-gray-400">
              Bringing you closer to your favorite artists through live events across India.
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-gray-500 text-sm">
          © 2024 Artist Live Events. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
