import React from 'react';
import MovingComponent from 'react-moving-text';

import { AttentionSeeker } from 'react-awesome-reveal';
// import { useMediaQuery } from 'usehooks-ts';


const getRandomEffect = () => {   
    const effects = ['bounce', 'jello', 'rubberBand', 'swing', 'tada'];
    const randomIndex = Math.floor(Math.random() * effects.length);
    const effect = effects[randomIndex] || 'rubberBand';
    return effect;
};


const AnimatedWord = ({ word, style }) => {
    const letters = word.split('');

    return (
        <div style={{textAlign: 'center'}}>
            {letters.map((letter, index) =>
                letter === ' ' ? '\u00A0\u00A0\u00A0' :
                <MovingComponent
                    key={index}
                    type="effect3D"
                    duration="2500ms"
                    delay="5000ms"
                    direction="normal"
                    timing="ease"
                    iteration="infinite"
                    fillMode="none"
                    style={style}
                    >
                    {letter}
                </MovingComponent>
            )}
        </div>
    );
}

const styles = {     
    titleLetterStyle: {       
        display: 'inline-block',
        fontSize: '3em',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        textAlign: 'center',
    },
    subtitleLetterStyle: {
        display: 'inline-block',
        fontSize: '1.0em',
        fontFamily: 'Arial, sans-serif',
        color: 'white'
    },
    stackedTitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
};


const PageTitle = ({ title, subtitle, random = true }) => {
    // const bigEnough = useMediaQuery('(min-width: 1000px)');


    const randomEffect = random ? getRandomEffect() : 'bounce';

    return (
        <>
        {/* <AttentionSeeker effect={randomEffect}> */}
            <div style={styles.stackedTitle}>
                <AnimatedWord word={title} style={styles.titleLetterStyle} />
                {/* {subtitle &&
                    <div style={styles.subtitleLetterStyle}>{subtitle}</div>
                } */}
            </div>
            
        {/* </AttentionSeeker> */}
        <hr className="t_border my-4 ml-0 text-left"
            style={{color: '#FFCB05', borderWidth: '2px'}}/>
        </>
    );
};

export default PageTitle;