
import { Hero } from "./sections/Hero/Hero";
import { AboutMe } from "./sections/About/AboutMe";
import { Timeline } from "./sections/Experience/Experience";
import { Projects } from "./sections/Projects/Projects";
import { Skills } from "./sections/About/Skills";
import { BlogSummary } from "./sections/Blog/BlogSummary";
import { Contact } from "./sections/Contact/Contact";
import { Navigation } from "./components/Navigation";
import { SideDotsNav } from "./components/SideDotsNav";

function App() {
  return (
    <>
      <Navigation />
      <SideDotsNav />
      <Hero />
      <AboutMe />
      <Timeline />
      <Projects />
      <BlogSummary />
      <Contact />
      <Skills />
    </>
  );
}

export default App;
