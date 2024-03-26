import React from "react";
import { Route, Routes} from "react-router-dom";
import withRouter from "../hooks/withRouter.jsx"
import Home from "../pages/Home.jsx";
import Projects from "../pages/Projects.jsx";
import About from "../pages/About.jsx";
import Socialicons from "../components/SocialIcons.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Experience from "../pages/Experience.jsx";
import Education from "../pages/Education.jsx";
import NotFound from "./404.jsx";



const AnimatedRoutes = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition
      key={location.key}
      timeout={{
        enter: 400,
        exit: 400,
      }}
      classNames="page"
      unmountOnExit
    >
      <Routes location={location}>
        <Route exact path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<Projects />} /> 
        <Route path='/experience' element={<Experience />} />
        <Route path='/education' element={<Education />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CSSTransition>
  </TransitionGroup>
));

function AppRoutes() {
  return (
    <div className="s_c">
      <AnimatedRoutes />
      <Socialicons />
    </div>
  );
}

export default AppRoutes;
