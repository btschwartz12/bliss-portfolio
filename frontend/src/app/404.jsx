import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { useMediaQuery } from 'usehooks-ts';

const styles = {
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: '100%',
  },
  bubble: {
    display: 'inline-block',
    backgroundColor: '#00274C',
    color: '#FFCB05',
    borderRadius: '50px',
    padding: '15px 40px',
    width: '40%',
    margin: '0 auto',
    marginTop: '300px',
    position: 'relative',
    zIndex: 1,
  },
  image: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: -1,
    width: '50vw',
  },
  heading: {

  },
  message: {
    color: '#FFCB05',
    marginTop: '25px',
    marginBottom: '0px',
  },
};

const NotFound = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1000px)');
  return (
    <Fade>
    <div style={styles.container}>
        <img src="static/404.png" alt="404" style={styles.image} />
        <div style={styles.bubble}>
            <h1 style={styles.heading}>404 :(</h1>
            {isLargeScreen && (
            <p style={styles.message}>The page you are looking for does not exist.</p>
            )}
        </div>
    </div>
    </Fade>
  );
};

export default NotFound;
