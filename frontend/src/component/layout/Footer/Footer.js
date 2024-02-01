import React from "react";
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="flex items-center justify-between mt-10vmax p-2vmax bg-gray-800 text-white"
    >
      <div className="leftFooter w-1/3 flex flex-col items-center">
        <h4 className="font-roboto text-1.2vmax">DOWNLOAD OUR APP</h4>
        <p className="text-center text-1.2vmax">
          Download App for Android and IOS mobile phones
        </p>
        <img
          src={playstore}
          alt="playstore"
          className="w-10vmax m-1vmax cursor-pointer"
        />
        <img
          src={appstore}
          alt="Appstore"
          className="w-10vmax m-1vmax cursor-pointer"
        />
      </div>

      <div className="midFooter w-1/3 text-center">
        <h1 className="text-4vmax font-roboto text-red-500">RAP</h1>
        <h2 className="text-2vmax">TECHNOLOGY PVT LTD</h2>
        <p className="text-1.2vmax">Copyrights 2024 &copy;</p>
      </div>

      <div className="rightFooter w-1/3 flex flex-col items-center">
        <h4 className="font-roboto text-1.4vmax underline">Follow Us</h4>
      </div>
    </footer>
  );
};

export default Footer;
