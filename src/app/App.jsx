import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import withRouter from "../hooks/withRouter";
import AppRoutes from "./routes";
import Headermain from "../header";
import AppContext from './AppContext';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import AnimatedCursor  from "../hooks/AnimatedCursor";
import { darkTheme } from '../components/theme/themes';
import GlobalStyles from '../components/theme/GlobalStyles';
import "./App.css";

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

export default function App() {

  const darkMode = useDarkMode(true);

  return (
    <AppContext.Provider value={{ darkMode }}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles />
        <Router basename={process.env.PUBLIC_URL}>
          <div className="cursor__dot">
            <AnimatedCursor
              innerSize={10}
              outerSize={15}
              color="100, 100, 0"
              outerAlpha={0.4}
              innerScale={0.7}
              outerScale={3}
            />
          </div>
          <ScrollToTop>
            <Headermain />
            <AppRoutes />
          </ScrollToTop>
        </Router>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
