import React, { useState, useEffect } from 'react';
import {
    Button, Card, Badge, Col
} from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PropTypes from 'prop-types';
import TextBody from './TextBody.jsx';
import CardModal from './CardModal.jsx';

const styles = {

    badgeStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 5,
    },
    cardStyle: {
        borderRadius: 10,
        backgroundColor: '#060606',
        borderColor: '#ffffff20',
    },
    cardTitleStyle: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 700,
        color: 'white',
    },
    cardTextStyle: {
        textAlign: 'left',
        color: 'gray',
    },
    linkStyle: {
        textDecoration: 'none',
        padding: 10,
    },
    buttonStyle: {
        margin: 5,
    },
    bubbleStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '5px 10px',
        borderRadius: '0 10px 0 10px',
        fontSize: 14,
        fontWeight: 'bold',
    },
    closeButton: {
        marginLeft: 'auto',
    },
    cardFooter: {
        backgroundColor: '#181818',
    },
    collapsibleBody: {
        maxHeight: '500px',
        overflow: 'hidden',
        transition: 'max-height 0.8s ease-out',
    },
    collapsedBody: {
        maxHeight: '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease-in',
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


const ProjectCard = (props) => {

    const [show, setShow] = useState(false); // for modal
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [videoShow, setVideoShow] = useState(false); // for video modal

    const onLinkClick = (linkData) => {
        if (!linkData.is_modal) {
            window.open(linkData.data, '_blank');
        }
        else {
            setShow(true);
        }
    };

    const { project, expand } = props;

    useEffect(() => {
        // Delay to allow for a smooth initial transition
        

        if (expand) {
            setIsCollapsed(false);
        } else {
            setTimeout(() => setIsCollapsed(true), 100);
        }
    }, []);

    
    

    return (
        <Col>
            <Card
                style={{
                    ...styles.cardStyle,
                }}
                text='light'
                onMouseEnter={() => setIsCollapsed(false)}
                onMouseLeave={() => setIsCollapsed(true)}
            >
                {project.bubble?.exists ? (
                    <div
                        style={{
                        ...styles.bubbleStyle,
                        color: project.bubble.text_color,
                        backgroundColor: project.bubble.background_color,
                        }}
                    >
                        {project.bubble.text}
                    </div>
                    ) : project?.video ? (
                    <div
                        style={{
                        ...styles.bubbleStyle,
                        borderRadius: '0 0 0 10px',
                        color: '#FFFFFF',
                        backgroundColor: '#00274C',
                        }}
                    >
                        Click Me!
                    </div>
                ) : null}
                <Card.Img 
                    variant="top" 
                    src={project?.image} 
                    onClick={() => setVideoShow(true)}
                />
                <Card.Body>
                    <Card.Title style={styles.cardTitleStyle}>{project.title}</Card.Title>
                    <div style={isCollapsed ? styles.collapsedBody : styles.collapsibleBody}>
                        <Card.Text style={styles.cardTextStyle}>
                            <TextBody text={project.bodyText} />
                        </Card.Text>
                    </div>
                    <Button variant="link" onClick={() => setIsCollapsed(!isCollapsed)}>
                        {isCollapsed ? <FaChevronDown style={{ color: '#FFCB05' }} /> : <FaChevronUp style={{ color: '#FFCB05' }} />}
                    </Button>
                </Card.Body>

                <Card.Body>
                    {project?.links?.map((link) => (
                        <>
                        
                        <Button
                            key={link.data}
                            style={styles.buttonStyle}
                            variant={'outline-light'}
                            onClick={() => onLinkClick(link)}
                        >
                            {link.text}
                        </Button>
                        {link.is_modal && (
                            <CardModal
                                key={link.data + 'modal'}
                                show={show}
                                handleClose={() => setShow(false)}
                                data={link.data}
                                isAnimated={false}
                            />
                        )}
                        </>
                    ))}
                    {(project?.video && project.video !== "") && (
                        <>
                        <Button
                            key={project.video}
                            style={styles.buttonStyle}
                            variant={'outline-light'}
                            onClick={() => setVideoShow(true)}
                        >
                            Video
                        </Button>
                        <CardModal
                            show={videoShow}
                            handleClose={() => setVideoShow(false)}
                            data={{video: project.video, title: project.title}}
                            isAnimated={true}
                        />
                        </>
                    )}
                </Card.Body>
                {project.tags && (
                    <Card.Footer style={styles.cardFooter}>
                        <Badge
                        key={project.date_added}
                        bg='dark'
                        text='light'
                        style={styles.badgeStyle}
                        >
                        {project.date_added}
                        </Badge>
                        {project.tags.map((tag) => (
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
                        
                    </Card.Footer>
                )}
            </Card>
        </Col>
    );
};
    ProjectCard.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        bodyText: PropTypes.string.isRequired,
        image: PropTypes.string,
        links: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            is_modal: PropTypes.bool,
            data: PropTypes.any.isRequired,
        })),
        tags: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
        })),
    }).isRequired,
    };

export default ProjectCard;
