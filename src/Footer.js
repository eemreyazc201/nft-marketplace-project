import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-fixed bg-center bg-bottom dark:bg-gray-900 opacity-90" >
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://www.itublockchain.com/" className="flex items-center">
            <img src="/images/logo.png" alt="logo" className="h-8 me-3" alt="ITU BLOCKCHAINç Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ITU BLOCKCHAIN</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="it" className="hover:underline">itublockchain</a>
                </li>
                
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://github.com/itublockchain" className="hover:underline ">Github</a>
                </li>
                <li>
                  <a href="https://discord.gg/EewmY2xW" className="hover:underline">Discord</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            ©️ 2023 <a href="https://www.itublockchain.com/" className="hover:underline">ITU BLOCKCHAIN™️</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              {/* Facebook Icon */}
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              {/* Discord Icon */}
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              {/* Twitter Icon */}
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              {/* GitHub Icon */}
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              {/* Dribbble Icon */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

