
import type { TimelineEntry } from "../types";
import { getTechIcon } from "../utils/techIcons";

import dkLogo from "../assets/logo/dk-logo.jpg";
import pdLogo from "../assets/logo/pd-logo.png";
import uclaLogo from "../assets/logo/UCLA-logo.png";

export const experiences: TimelineEntry[] = [
  {
    id: "dk-full",
    type: "work",
    company: "DraftKings",
    role: "Software Engineer",
    startDate: "July 2025",
    endDate: "Present",
    description: "Backend Development",
    logo: dkLogo,
    tech: [
      { name: ".NET Core", icon: getTechIcon(".NET Core") },
      { name: "C#", icon: getTechIcon("C#") },
      { name: "SQL", icon: getTechIcon("SQL") },
      { name: "React", icon: getTechIcon("React") },
      { name: "TypeScript", icon: getTechIcon("TypeScript") },
      { name: "DataDog", icon: getTechIcon("DataDog") },
      { name: "AWS", icon: getTechIcon("AWS") },
      { name: "Kubernetes", icon: getTechIcon("Kubernetes") },
    ],
  },
  {
    id: "dk-intern",
    type: "work",
    company: "DraftKings",
    role: "Software Engineer Intern",
    startDate: "June 2024",
    endDate: "September 2024",
    description:
      "Modernizing internal marketing infrastructure through React-based migrations and full-stack integration with .NET Core.",
    accomplishments: [
      "Led migration of a critical marketing tool from cshtml to React, enhancing functionality with dynamic forms and a searchable data table.",
      "Integrated React application with a .NET Core backend, managing data flow with Tanstack Query.",
      "Implemented live input validation and collaborated with product managers and designers via Figma.",
      "Wrote comprehensive unit tests using Vitest, improving component and service reliability.",
    ],
    logo: dkLogo,
    tech: [
      { name: "React", icon: getTechIcon("React") },
      { name: "TypeScript", icon: getTechIcon("TypeScript") },
      { name: "Tanstack Query", icon: getTechIcon("Tanstack Query") },
      { name: "Vitest", icon: getTechIcon("Vitest") },
    ],
  },
  {
    id: "pd-intern",
    type: "work",
    company: "Pacific Defense",
    role: "Software Engineer Intern",
    startDate: "June 2023",
    endDate: "September 2023",
    description:
      "Developed automated deployment processes and system management solutions for EW and signal intelligence applications.",
    accomplishments: [
      "Contributed to an agile team focused on system management solutions for electronic warfare and signal intelligence.",
      "Diagnosed and resolved complex networking and containerization issues within Jenkins deployments.",
      "Developed a dynamic deployment process using Ansible and shell scripting for software portability.",
      "Implemented a new testing framework that doubled testing environments, eliminating deployment wait times.",
    ],
    logo: pdLogo,
    tech: [
      { name: "Ansible", icon: getTechIcon("Ansible") },
      { name: "Jenkins", icon: getTechIcon("Jenkins") },
      { name: "Docker", icon: getTechIcon("Docker") },
      { name: "Bash", icon: getTechIcon("Bash") },
    ],
  },
  {
    id: "ucla",
    type: "education",
    company: "UCLA",
    role: "Bachelor of Science in Computer Science",
    startDate: "2021",
    endDate: "2025",
    description: "Graduated Summa Cum Laude • Member of Theta Chi fraternity",
    logo: uclaLogo,
    tech: [
      { name: "C++", icon: getTechIcon("C++") },
      { name: "Python", icon: getTechIcon("Python") },
      { name: "Java", icon: getTechIcon("Java") },
      { name: "React", icon: getTechIcon("React") },
      { name: "C", icon: getTechIcon("C") },
      { name: "SQL", icon: getTechIcon("SQL") },
    ],
  },
];
