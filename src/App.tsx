import { Hero } from "./components/Hero";
import { AboutMe } from "./components/AboutMe";
import { Timeline } from "./components/Timeline";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { BlogSummary } from "./components/Blog/BlogSummary";
import { Contact } from "./components/Contact";
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
