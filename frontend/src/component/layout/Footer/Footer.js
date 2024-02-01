import React from "react";
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";
import "../Footer/Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt="playstore" />
        <img src={appstore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>RAP</h1>
        <h3>TECHNOLOGY PVT LTD</h3>

        <p>Copyrights 2021 &copy;</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
      </div>
    </footer>
  );
};

export default Footer;
