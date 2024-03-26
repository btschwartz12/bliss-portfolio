import React, { useState, useEffect } from "react"
import { Container, Row } from "react-bootstrap";
import { Chrono } from "react-chrono";
import FallbackSpinner from "../components/FallbackSpinner.jsx";
import {getEndpoint} from "../app/endpoints.jsx";
import {
    Badge
} from 'react-bootstrap';

import PageTitle from "../components/PageTitle.jsx";

// https://github.com/prabhuignoto/react-chrono#theme


import { getRandomBgType } from '../components/Background.jsx';
import ParticlesBg from 'particles-bg';





const styles = {

    badgeStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 5,
    },
};


const badgeColors = {
    white: 'light',
    yellow: 'warning',
    green: 'success',
    blue: 'primary',
    cyan: 'info',
    red: 'danger',
    gray: 'secondary'
};


const Experience = () => {

    const [data, setData] = useState(null);

    const [cardBodies, setCardBodies] = useState(null);

    const { type, num } = getRandomBgType();


    useEffect(() => {

        getEndpoint('experiences')
            .then((res) => {

                setData(res)

                const cardBodyData = res.experiences.map((experience) => {
                    return (
                        <div>
                            <p 
                                style={{fontSize: 15}}
                            >{experience.cardDetailedText}</p>
                            {experience.tags.map((tag) => (
                                <Badge
                                    key={tag.text}
                                    pill
                                    bg={badgeColors[tag.color]}
                                    text='dark'
                                    style={styles.badgeStyle}
                                >
                                    {tag.text}
                                </Badge>
                            ))}
                        </div>
                    );
                });

                setCardBodies(cardBodyData);
            })
            .catch((err) => console.error(err));
        
        
    }, []);

    
    

    return (
        <>

        <ParticlesBg type={type} num={num} styles={{ backgroundColor: 'black'}} 
                bg={{position: "fixed",
                    zIndex: -1,
                    top: 0,
                    left: 0}} 
            />

        <style type="text/css">
            {`
            .my-card {
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                margin-bottom: 24px;
                padding: 24px;
            }
            
            .my-card-media {
                display: none;
            }
            
            .my-card-subtitle {
                color: #FFCB05;
                font-size: 16px;
                margin-bottom: 8px;
                margin-left: 5px;
            }
            .my-card-text {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 16px;
            }
            .my-card-title {
                color: white;
                font-size: 24px;
                margin-bottom: 8px;
                margin-left: 0;
            }
            .my-controls {
            display: none;
            }
            .my-title {
            color: white;
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 24px;
            text-align: center;
            }
            `}
        </style>


        
        <Container>
            <Row>
                <PageTitle title="Experience" />
            </Row>
            {data && cardBodies ? (
                <Row>
                <Chrono 
                    items={data.experiences} 
                    mode="VERTICAL" 
                    theme={{
                        primary:  '#00274C',
                        secondary: '#1E1E1E',
                        cardBgColor: '#1E1E1E',
                        cardForeColor: 'white',
                        titleColor: 'black',
                        titleColorActive: 'white',
                    }}
                    classNames={{
                        card: 'my-card',
                        cardMedia: 'my-card-media',
                        cardSubTitle: 'my-card-subtitle',
                        cardText: 'my-card-text',
                        cardTitle: 'my-card-title',
                        controls: 'my-controls',
                        title: 'my-title',
                    }}
                    
                >{cardBodies}</Chrono>
            </Row>
            ) : <FallbackSpinner />}
        </Container>
        </>
    )
};

export default Experience;


