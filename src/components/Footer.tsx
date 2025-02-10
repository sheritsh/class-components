import { FC } from 'react';
import rsLogo from '/rslogo.png';

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <span className="text-lg font-light">
            created by
            <a
              href="https://github.com/sheritsh"
              className="ml-2 font-medium hover:text-blue-400 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {'//'}sheritsh
            </a>
          </span>
        </div>

        <div className="flex items-center">
          <a
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src={rsLogo}
              alt="RS School"
              className="h-12 w-auto max-w-full object-contain invert"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
