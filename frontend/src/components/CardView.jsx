import { useState, useEffect, } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal';
import ProjectCard from './ProjectCard.jsx';
import FallbackSpinner from './FallbackSpinner.jsx';



import React from "react";
import PageTitle from './PageTitle.jsx';

import "animate.css";


const styles = {
    containerStyle: {
        marginBottom: 25,
    },
    showMoreStyle: {
        width: '100%',
        margin: 25,
        
    },
    filterButtonStyle: {
        marginRight: 10,
        marginTop: 10,
    },
    selectedFilterButtonStyle: {
        backgroundColor: '#00274C',
        color: "#fff",
        borderColor: '#00274C',
    }
};

const CardView = (props) => {

    const { pageTitle, cards, categories, page } = props;

    const buttons = ['All', ...categories];

    const [showMore, setShowMore] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
    const [filteredData, setFilteredData] = useState([]);

    const [featuredFilteredData, setFeaturedFilteredData] = useState([]);
    const [nonFeaturedFilteredData, setNonFeaturedFilteredData] = useState([]);

    useEffect(() => {
        let filtered;
        if (cards) {
            if (selectedCategory === "All") {
                filtered = cards;
            } else if (selectedCategory === "Featured") {
                filtered = cards.filter((card) => card.is_featured);
            } else {
                filtered = cards.filter((card) => card.category === selectedCategory);
            }
        } else {
            filtered = [];
        }
        if (page === 'projects') {
            const priorityLevels = {};
            // Group cards by priority level
            filtered.forEach((card) => {
                if (!priorityLevels[card.priority]) {
                    priorityLevels[card.priority] = [];
                }
                priorityLevels[card.priority].push(card);
            });
            // Randomly sort each priority level and concatenate the results
            const randomized = Object.keys(priorityLevels).flatMap((priority) => {
                return priorityLevels[priority].sort(() => Math.random() - 0.5);
            });
            filtered = randomized;
            setFeaturedFilteredData(filtered.filter((card) => card.is_featured));
            setNonFeaturedFilteredData(filtered.filter((card) => !card.is_featured));
        }
        setFilteredData(filtered);
    
    }, [cards, selectedCategory, page]);


    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
    };

    
    const filterButtons = buttons.map((button) => (
        <Button
            key={button}
            variant={selectedCategory === button ? 'light' : "outline-secondary"}
            style={selectedCategory === button ? { ...styles.filterButtonStyle, ...styles.selectedFilterButtonStyle } : styles.filterButtonStyle}
            onClick={() => handleCategoryFilter(button)}
        >
            {button}
        </Button>
    ));

    const featuredCards = cards.filter((card) => card.is_featured);
    const moreLimit = featuredCards.length > 0 ? featuredCards.length : 6;
    const numberOfItems = showMore && filteredData ? filteredData.length : moreLimit;



    return (
        <Container className="About-header">
            <Row>
                <PageTitle title={pageTitle} subtitle={selectedCategory}/>
                {/* <PageTitle title={pageTitle + ' \u2192 ' + selectedCategory}/> */}
            </Row>
            {page === 'projects' && (
                <>
                <Row>
                    <div style={{backgroundColor: '#FFCB05', borderRadius: 10, padding: 10, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black'}}>
                        <p style={{fontWeight: 'bold', color: 'black', margin: 0}}>
                            Check out my <a href="https://github.com/btschwartz12" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'blue'}}>GitHub</a>!
                        </p>
                    </div>
                    
                </Row>

                <Row>
                    <img 
                        src="https://ghchart.rshah.org/ab8902/btschwartz12"  
                        alt="btschwartz12's Github Chart" 
                        style={{marginTop: 20}}
                        className="center-image"
                        onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                </Row>
                <hr className="t_border my-4 ml-0 text-left"
            style={{color: '#FFCB05', borderWidth: '2px'}}/>
                </>
            
            )}

            <Row className="mb-5 mt-3 pt-md-3">
                <Col lg="6" className="text-right">
                    {filterButtons}
                </Col>
            </Row>
            
            
            {cards
                ? (
                <div className="section-content-container">
                    <Container style={styles.containerStyle}>
                    {page === 'projects' ? (
                        <>
                        {featuredFilteredData.length > 0 && (
                            <Row xs={1} sm={1} md={2} lg={2} className="g-4">
                                <Fade >
                                {featuredFilteredData.map((project, index) => (
                                    <ProjectCard key={project.title} project={project} expand={false} />
                                ))}
                                </Fade>
                            </Row>
                        )}
                        <br/>
                        {nonFeaturedFilteredData.length > 0 && (
                            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                                <Fade >
                                {nonFeaturedFilteredData.slice(0, numberOfItems).map((project, index ) => (
                                    <ProjectCard key={project.title} project={project} expand={false} />
                                ))}
                                </Fade>
                            </Row>
                        )}
                        </>
                    ):
                    (
                        <>
                        <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                        <Fade >
                        {filteredData.slice(0, numberOfItems).map((project) => (
                        
                            <ProjectCard key={project.title} project={project} 
                            />
                        
                        ))}
                        </Fade>
                        </Row>
                        </>
                    )}
                    

                    {/* {!showMore
                        && 
                        filteredData.length > moreLimit
                        &&
                        (
                        <Button
                        style={styles.showMoreStyle}
                        variant={'light'}
                        className="animate__animated animate__pulse animate__infinite"
                        onClick={() => setShowMore(true)}
                        >
                        show more
                        </Button>
                        )} */}
                    </Container>
                </div>
                ) : <FallbackSpinner /> 
            }
        </Container>
    );
};

export default CardView;

