import React from "react";

import {FaFacebook, FaLinkedin, FaTwitter, FaYoutube} from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-white flex items-center justify-between p-4 sticky bottom-0">
      <div>
        <a href="https://www.dieboldnixdorf.com" target="_blank" className="text-blue-500 hover:text-gray-800">
          <strong>www.DieboldNixdorf.com</strong>
        </a>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://twitter.com/dieboldnixdorf"
          target="_blank"
          className="text-blue-500 hover:text-gray-800"
        >
            <FaTwitter />
        </a>
        <a
          href="https://pt.linkedin.com/company/diebold"
          target="_blank"
          className="text-blue-500 hover:text-gray-800"
        >

            <FaLinkedin />
          
        </a>
        <a
          href="https://pt-br.facebook.com/DieboldNixdorf/"
          target="_blank"
          className="text-blue-500 hover:text-gray-800"
        >

            <FaFacebook />
          
        </a>
        <a
          href="https://www.youtube.com/DieboldNixdorf"
          target="_blank"
          className="text-blue-500 hover:text-gray-800"
        >
          
          <FaYoutube />
        </a>
      </div>
    </footer>
  );
}
