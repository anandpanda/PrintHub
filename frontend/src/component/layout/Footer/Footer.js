import React from "react";
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";
// import "../Footer/Footer.css";
const Footer = () => {
  return (
    <footer id="footer" className="mt-[10vmax] p-[2vmax] bg-[rgb(34,33,33)] text-white flex items-center">
      <div className="leftFooter w-1/5 flex flex-col items-center">
        <h4 className="font-['roboto'] text-[1vmax] my-2">DOWNLOAD OUR APP</h4>
        <p className="text-center text-[1.2vmax] font-lucida my-2">Download App for Android and IOS mobile phone</p>
        <img className="w-[10vmax] m-[1vmax] cursor-pointer" src={playstore} alt="playstore" />
        <img className="w-[10vmax] m-[1vmax] cursor-pointer" src={appstore} alt="Appstore" />
      </div>

      <div className="midFooter w-3/5 text-center">
        <h1 className="text-[4vmax] font-['roboto'] text-[#eb4034]">RAP</h1>
        <h3 className="w-3/5 mx-auto text-[1vmax] font-gill">TECHNOLOGY PVT LTD</h3>

        <p className="max-w-[60%] my-[1vmax] mx-auto">Copyrights 2021 &copy;</p>
      </div>

      <div className="rightFooter w-1/5 flex flex-col items-center">
        <h4 className="font-['roboto'] text-[1.4vmax] underline">Follow Us</h4>
        <a href="/#" className="no-underline text-[1.3vmax] font-gill text-white transition-all duration-500 m-[0.5vmax] hover:text-[#eb4034]">some_link</a>
      </div>
    </footer>
  );
};

export default Footer;
