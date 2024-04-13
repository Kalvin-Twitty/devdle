import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa'; // Import icons from Font Awesome

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
        <p className="text-center md:text-left mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Codele. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center md:justify-end">
          <a
            href="https://github.com/your-github-url"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-gray-400 hover:text-white transition duration-300"
          >
            <FaGithub className="inline-block mr-1" /> GitHub
          </a>
          <a
            href="https://twitter.com/your-twitter-url"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-gray-400 hover:text-white transition duration-300"
          >
            <FaTwitter className="inline-block mr-1" /> Twitter
          </a>
          {/* Add more links as needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
