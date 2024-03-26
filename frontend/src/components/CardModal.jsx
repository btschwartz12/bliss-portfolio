import React from 'react';
import {
    Button, Modal
} from 'react-bootstrap';
import TextBody from './TextBody.jsx';

const styles = {
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

const CardModal = (props) => {
    const { show, handleClose, data, isAnimated } = props;
    return (
        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            {isAnimated ? (
                <>
                <Modal.Header style={styles.modalHeader} closeButton>
                    <Modal.Title>{data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={styles.modalBody}>
                    <TextBody text={"Sorry if this takes a second to load or close!"} />
                {data.video ? (
                    data.video.endsWith(".mp4") ? (
                        <video controls autoPlay style={{width: '100%', height: 'auto'}}>
                            <source src={data.video} type="video/mp4" />
                        </video>
                    ) : (
                        <img src={data.video} alt={data.title} style={{width: '100%'}} />
                    )
                ) : null}
                </Modal.Body>
                <Modal.Footer style={styles.modalFooter}>
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
                <>
                <Modal.Header style={styles.modalHeader} closeButton>
                    <Modal.Title>{data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={styles.modalBody}>
                    <TextBody text={data.body} />
                    {/* {data.body} */}
                </Modal.Body>
                <Modal.Footer style={styles.modalFooter}>
                <Button
                        variant="secondary"
                        style={styles.closeButton}
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
                </>
            )}
            
        </Modal>
    );
};


export default CardModal;