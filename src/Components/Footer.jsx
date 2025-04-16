import React from "react";
import {
  ExternalLink,
  Mail,
  MessageSquare,
  Share2,
  AtSign,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 py-4 bg-white w-full mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500">
            © {currentYear} TaskManager. All rights reserved.
          </div>

          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <a
              href="https://github.com/LakshitAgarwal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://x.com/lakshitagarwal7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600 transition-colors"
              aria-label="Twitter"
            >
              <FaSquareXTwitter size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/lakshit-agarwal-6082b9216/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="mailto:lakshit7811@gmail.com"
              className="text-gray-500 hover:text-indigo-600 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
