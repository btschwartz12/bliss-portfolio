
import { useState, useEffect } from 'react';
import { getEndpoint } from '../app/endpoints.jsx';
import FallbackSpinner from '../components/FallbackSpinner.jsx';



import React from "react";
import CardView from '../components/CardView.jsx';
import { HelmetProvider } from 'react-helmet-async';
import MyHelmet from '../components/MyHelmet.jsx';


import { getRandomBgType } from '../components/Background.jsx';
import ParticlesBg from 'particles-bg';





const Projects = () => {

    const [data, setData] = useState(null);

    const { type, num } = getRandomBgType();

    useEffect(() => {
        getEndpoint('projects')
            .then((res) => setData(res))
            .catch((err) => console.error(err));
        
    }, []);

    const categories = ['Featured', 'School', 'Personal']
    const pageTitle = 'Projects'
    return (
        <HelmetProvider>
            <ParticlesBg type={type} num={num} styles={{ backgroundColor: 'black'}} 
                bg={{position: "fixed",
                    zIndex: -1,
                    top: 0,
                    left: 0}} 
            />
        {data ? (
            <>
            <MyHelmet 
                title={data.meta.title} 
                description={data.meta.description}
            />
            <CardView
                cards={data.projects}
                categories={categories}
                pageTitle={pageTitle}
                page="projects"
            />
            </>
        ): <FallbackSpinner />}
        
        </HelmetProvider>
        
    );
};

export default Projects;