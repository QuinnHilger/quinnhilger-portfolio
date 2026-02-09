# Portfolio Roadmap

A progressive feature roadmap for building out the portfolio site.

---

## Phase 1: Core Sections ✅

### 1.1 Hero Section ✅

- [x] Bold name typography with gradient or accent styling
- [x] Professional title/role display
- [x] Profile photo
- [x] Short tagline or bio snippet
- [x] Social links (GitHub, LinkedIn, etc.)
- [x] Call-to-action button (e.g., "View My Work" and "Get in Touch")
- [x] Background styling (gradient, subtle patterns, or imagery)
- [x] Eye catching animation or cursor interaction

### 1.2 About Me Section ✅

- [x] Profile photo or avatar
- [x] Personal bio and background story
- [x] Current role/focus areas
- [x] Fun facts or personal interests (optional)

### 1.3 Experience/Timeline ✅

- [x] Work history entries with company, role, dates
- [x] Key accomplishments per role
- [x] Visual timeline layout
- [x] Education section

### 1.4 Projects Section ✅

- [x] Project card component with image, title, description
- [x] Technology tags for each project
- [x] Links to live demo and source code
- [x] Featured/pinned projects highlight

### 1.5 Blog Section ✅

- [x] Blog post listing page
- [x] Individual blog post pages
- [x] Markdown content support
- [x] Reading time estimates
- [x] Tags/categories
- [x] Raw/Polished version toggle with diff view
- [x] Table of Contents with scroll spy
- [x] Code copy button
- [x] Previous/Next navigation
- [x] Giscus comments integration

### 1.6 Contact Section ✅

- [x] Contact form (name, email, message)
- [x] Direct email link
- [x] Social media links
- [x] Location/availability info (optional)
- [x] Link to resume (can be downloaded)

### 1.7 Skills & Tech Stack ✅

- [x] Visual skill badges or icons
- [x] Categorized by type (Frontend, Backend, Tools, etc.)

### 1.8 Publishing on GitHub Pages ✅

- [x] Configure `vite.config.ts` with `base` URL for GitHub Pages
- [x] Add `predeploy` and `deploy` scripts to `package.json`
- [x] Integrate `gh-pages` for deployment
- [x] Update router configuration with `basename`
- [x] Implement `404.html` generator (copy of index.html) for SPA routing
- [x] Fix blog cover image paths for base URL
- [x] Add custom markdown image renderer for inline images
- [x] Update README with live site link

---

## Phase 2: Navigation & Layout

### 2.1 Header/Navigation ✅

- [x] Fixed/sticky navigation bar
- [x] ~~Logo or name branding~~ _(skipped - user chose minimal nav)_
- [x] Navigation links to sections
- [x] Smooth scrolling behavior

### 2.2 Mobile Re-Design ✅

- [x] Mobile-first approach
- [x] Tablet breakpoints
- [x] Touch-friendly interactions
- [x] Mobile hamburger menu

### 2.3 Repo Re-Organization

- [ ] Create components folder for each main section
- [ ] Split up each section into modular components
- [ ] Organize constants, types, and utils
- [ ] Clarify config inputs for new sections in their own config files (projects, experience, etc.)
  - note: the current setup for blog posts is good

---

## Phase 3: Polish & Enhancements

### 3.0 Projects Section Enhancements

- [ ] Project image gallery/carousel in modal (multi-screenshot support)
- [ ] Improve / rewrite Project descriptions
- [ ] Improve Project Pictures

### 3.1 Animations & Micro-interactions

- [ ] Scroll-triggered animations
- [ ] Hover effects on interactive elements
- [ ] Page load animations
- [ ] Smooth transitions between states

### 3.2 SEO & Performance

- [ ] Improve / rewrite job descriptions
- [ ] Meta tags and Open Graph data
- [ ] Semantic HTML structure
- [ ] Image optimization
- [ ] Lazy loading for images
- [ ] Performance audit and improvements
- [ ] Reorganize components into more modular components
- [ ] Formspree integration (future enhancement)

---

## Current Progress

**Next Up:** Navigation & Layout (Phase 2)

---

## Notes

_Add any design preferences, color schemes, or reference sites here._

### Reference Sites

- https://www.muhammadaamirmalik.com/
  - Has great animations and micro-interactions, really eye catchign and advanced
- https://yujisatojr.github.io/react-portfolio-template/
  - Clean design with good scrolling behavior
