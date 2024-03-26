import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Slide } from 'react-awesome-reveal';
import TextBody from './TextBody.jsx';



const styles = {
    introTextContainer: {
        margin: 15,
        flexDirection: 'column',
        whiteSpace: 'pre-wrap',
        textAlign: 'left',
        fontSize: '1.05em',
        fontWeight: 500,
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        overflowWrap: 'break-all',
    },
    introImageContainer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        maxWidth: '90%',
    },
    image: {
        maxWidth: '90%',
        // make rounded edges
        borderRadius: '7%',
    },
    
};



const Bio = ({ data, matches }) => {

    if (matches) {
        return (
            <Row>
                <Col style={styles.introTextContainer}>
                    <Slide direction="left" triggerOnce>
                        <TextBody text={data?.about} />
                    </Slide>
                </Col>
                <Col style={styles.introImageContainer}>
                    <Slide direction="right" triggerOnce>
                        <img style={styles.image} src={data?.imageSource} alt="profile" />
                    </Slide>
                </Col>
            </Row>
        );
    }
    else {
        return (
            <>
            <Slide direction="left" triggerOnce>
                <img style={styles.image} src={data?.imageSource} alt="profile" />
            </Slide>
            <Slide direction="right" triggerOnce>
                <div style={styles.introTextContainer}>
                    <TextBody text={data?.about} />
                </div>
            </Slide>
            </>
        );
    }
};

export default Bio;