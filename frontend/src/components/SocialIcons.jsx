import React, { useState, useEffect } from 'react';
import "../styles/SocialIcons.css";
import {
  FaGithub,
  FaTwitter,
  FaFacebookF,
  FaLinkedin,
  FaYoutube,
  FaTwitch,
} from "react-icons/fa";
import {getEndpoint} from "../app/endpoints.jsx";


// make a map of the social icons
export const socialIconsImages = {
  twitter: FaTwitter,
  github: FaGithub,
  facebook: FaFacebookF,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  twitch: FaTwitch,
  email: FaTwitch
};




const Socialicons = () => {


  const [data, setData] = useState(null);

    useEffect(() => {
      getEndpoint('social')
        .then((res) => setData(res.social))
        .catch((err) => console.error(err));
        
    }, []);


  return (
    <div className="stick_follow_icon" >
      {data ? (
        <ul>
          {data.map((item, index) => {
            const Icon = socialIconsImages[item.name];
              return (
                <li key={index}>
                  <a href={item.href}>
                    <Icon />
                  </a>
                </li>
              );
          })}
        </ul>
      ) : null}
    </div>
  );
};


export default Socialicons;


