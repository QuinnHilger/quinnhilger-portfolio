import { Hero } from "./components/Hero";
import { AboutMe } from "./components/AboutMe";
import { Timeline } from "./components/Timeline";
import { Projects } from "./components/Projects";
import { BlogSummary } from "./components/Blog/BlogSummary";

function App() {
  return (
    <>
      <Hero />
      <AboutMe />
      <Timeline />
      <Projects />
      <BlogSummary />
    </>
  );
}

export default App;
