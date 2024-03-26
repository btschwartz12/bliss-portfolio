import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {getEndpoint} from '../app/endpoints.jsx';
import FallbackSpinner from './FallbackSpinner.jsx';


const styles = {
    emailButton: {
        backgroundColor: '#FFCB05',
        color: 'black',
        marginRight: 'auto',
    },
    emailText: {
        fontSize: '20px',
        color: '#FFCB05',
        fontFamily: 'Courier New',
    },
    closeButton: {
        marginLeft: 'auto',
    },
    modalHeader: {
        backgroundColor: '#00274C',
        color: 'white',
    },
    modalBody: {
        backgroundColor: '#00274C',
        color: 'white',
    },
    modalFooter: {
        backgroundColor: '#00274C',
        color: 'white',
        borderTop: 'none',
    },
};


const ContactPopup = () => {
    const [show, setShow] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        getEndpoint('contact')
            .then((res) => setData(res))
            .catch((err) => console.error(err)); // Handle the error here if needed
    }, []);

    const handleClose = () => {
        setShowEmail(false);
        setShow(false);
    };

    const handleClick = () => {
        setShowEmail(true);
    };

    const handleShow = () => setShow(true);
//#FFCB05
    

    return (
        <>
        <style type="text/css">
        {`
            .btn-blue {
            background-color: #00274C;
            color: white;
            border: 2px solid #FFCB05;
            transition: all 0.3s ease-in-out; /* Add a transition effect for all properties */
            }

            .btn-blue:hover {
            background-color: #FFCB05;
            color: black;
            border-color: #FFCB05; /* Change the border color on hover */
            }
        `}
        </style>
        <Button variant="blue" onClick={handleShow}>
            Contact Me
        </Button>

        

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            {data ? (
            <>
                <Modal.Header style={styles.modalHeader} closeButton>
                <Modal.Title>{data.contact?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={styles.modalBody}>
                {data.contact?.body}
                </Modal.Body>
                <Modal.Footer style={styles.modalFooter}>
                {showEmail ? (
                    <p style={styles.emailText}>{data.contact?.email}</p>
                ) : (
                    <Button style={styles.emailButton} onClick={handleClick}>
                    My Email
                    </Button>
                )}
                <Button
                    variant="secondary"
                    style={styles.closeButton}
                    onClick={handleClose}
                >
                    Close
                </Button>
                </Modal.Footer>
            </>
            ) : (
            <FallbackSpinner />
            )}
        </Modal>
        </>
    );
};


export default ContactPopup;