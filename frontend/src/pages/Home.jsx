import React, { useState, useEffect, useContext } from "react";
import "../styles/Home.css";
import { HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import {getEndpoint, preloadEndpoints} from "../app/endpoints.jsx";
import MyHelmet from "../components/MyHelmet.jsx";
import { useLocation } from 'react-router-dom';
import ParticlesBg from "particles-bg";

import Loader from "../components/Preloader.jsx";

import AnimationContext from "../components/AnimationContext.jsx";

import { getRandomBgType } from "../components/Background.jsx";

import "animate.css";






const styles = {
  bodyStyle: {
    fontFamily: "Arial",
    color: "white",
    marginBottom: "30px",
    
  },
};



const Home = () => {
  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const { hasAnimated, setHasAnimated } = useContext(AnimationContext);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [loaderFinished, setLoaderFinished] = useState(false);

  

  useEffect(() => {
    if (isLoading) {
      return;
    }
    handleExternalLinks();
  }, [isLoading, location]);

  const finishLoading = (source) => {
    if (source === 'loader') {
      setLoaderFinished(true);
    } else if (source === 'image') {
      setImageLoaded(true);
    }
  };

  useEffect(() => {

    if (loaderFinished && imageLoaded) {
      setIsLoading(false);
    }
  }, [loaderFinished, imageLoaded]); 

  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  

  useEffect(() => {
    getEndpoint('home')
      .then((res) => {
        setData(res);

        const img = new Image();
        img.onload = () => finishLoading('image');
        img.src = res.img_url;

        preloadEndpoints('home');
      })
      .catch((err) => console.error(err));
  }, []);

  const button_animations = [
    "animate__animated animate__fadeInTopRight",
    "animate__animated animate__fadeInTopLeft",
    "animate__animated animate__fadeInTopRight",
    "animate__animated animate__fadeInBottomLeft",
    "animate__animated animate__fadeInBottomRight",
  ]

  const bullet_animations = [
    "animate__animated animate__lightSpeedInRight",
    "animate__animated animate__lightSpeedInLeft",
    "animate__animated animate__lightSpeedInRight",
    "animate__animated animate__lightSpeedInLeft",
  ]

  const { type, num } = getRandomBgType();

  const handleLoaderFinished = () => finishLoading('loader');

  return (
    <>
    {isLoading && !hasAnimated ? (
        <Loader finishLoading={handleLoaderFinished} />
      ) : (
        <HelmetProvider>
          <section id="home" className="home">
            {data ? (
              <div>
                
                <MyHelmet title={data.meta.title} description={data.meta.description} />
                <div className="intro_sec d-block d-lg-flex align-items-center ">
                  <div
                    className="h_bg-image order-1 order-lg-2 h-100 animate__animated animate__fadeIn"
                    style={{
                      backgroundImage: `url(${data.img_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                  </div>
                  <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
                    
                    <ParticlesBg className="animate__animated animate__flipInX animate__delay" type={type} num={num} style={{ backgroundColor: 'black'}} 
                      bg={{position: "absolute",
                          zIndex: -1,
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%"}} 
                    />
                    <div className="align-self-center">
                      <div className="intro mx-auto" style={{marginTop: "20px"}}>
                      
                        <div className="animate__animated animate__fadeInTopLeft" style={{marginBottom: "3rem"}}>
                          <h2 className="mb-1x" style={{fontSize: 40, fontWeight: 'bold'}} >{data.greetings}</h2>
                        </div>

                        <div style={{ ...styles.bodyStyle}}>
                            {data.about.map((sentence, index) => (
                              <p className={bullet_animations[index % bullet_animations.length] + " animate__delay"}>{'» ' + sentence}</p>
                            ))}
                        </div>

                        

                        <div style={{ marginBottom: 20}}>
                          {data.buttons.map((item, index) => (
                            <div className={button_animations[index % button_animations.length] + " animate__delay"}>
                            <Link
                              to={item.route}
                              key={item.name}
                              target={item.type === "link" ? "_blank" : "_self"}
                              className="text_2"
                            >
                              <div id={item.id} className="ac_btn btn ">
                                {item.name}
                                <div className="ring one"></div>
                                <div className="ring two"></div>
                                <div className="ring three"></div>
                              </div>
                            </Link>
                            </div>
                          ))}
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </HelmetProvider>
      )}
    </>
  );
};




export default Home;



{/* <Fade triggerOnce delay={5800}>
                      <h1 className="fluidz-48 mb-1x" >
                        <Typewriter
                          options={{
                            strings: data.animated_text,
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 5,
                            pauseFor: 3000,
                          }}
                        />
                      </h1>
                    </Fade> */}