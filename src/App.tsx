import { Hero } from "./components/Hero";
import { AboutMe } from "./components/AboutMe";
import { Timeline } from "./components/Timeline";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { BlogSummary } from "./components/Blog/BlogSummary";
import { Contact } from "./components/Contact";

function App() {
  return (
    <>
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
