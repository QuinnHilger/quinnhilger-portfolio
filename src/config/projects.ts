
import type { Project } from "../types";
import { getTechIcon } from "../utils/techIcons";

// Import project images
// Note: We need to adjust imports to be relative to this file or use absolute paths if configured
import spotmeLogo from "../assets/projects/SpotMe-logo.png";
import fiveNubbleHome from "../assets/projects/5Nubble-home.png";
import pointedImg from "../assets/projects/pointed.png";
import prizepicksImg from "../assets/projects/prizepicks.png";

export const projects: Project[] = [
  {
    id: "spotme",
    title: "SpotMe",
    subtitle: "Social Fitness & AI Workout Platform",
    type: "iOS Mobile App",
    image: spotmeLogo,
    link: "https://apps.apple.com/us/app/spotme-the-workout-app/id6745230123",
    linkLabel: "App Store",
    featured: true,
    status: "live",
    overview:
      "A production-ready iOS fitness ecosystem combining real-time social networking, AI-driven personalized training, and robust performance tracking. Maintains a perfect 5-star rating on the App Store.",
    features: [
      "Co-founded LLC and launched to iOS App Store",
      "AI Workout Assistant using OpenAI's advanced models",
      "Real-time messaging, group chats, and discovery feed",
      "Comprehensive lift tracking and personal records",
      "Competitive leaderboards and gamification",
    ],
    tech: [
      { name: "React Native", icon: getTechIcon("React Native") },
      { name: "Expo", icon: getTechIcon("Expo") },
      { name: "TypeScript", icon: getTechIcon("TypeScript") },
      { name: "Supabase", icon: getTechIcon("Supabase") },
      { name: "PostgreSQL", icon: getTechIcon("PostgreSQL") },
      { name: "OpenAI", icon: getTechIcon("OpenAI") },
    ],
    size: "large",
  },
  {
    id: "fivenubble",
    title: "Five Nubble",
    subtitle: "Bespoke Property Management Platform",
    type: "Mobile App",
    image: fiveNubbleHome,
    featured: true,
    status: "beta",
    overview:
      "A bespoke property management platform currently in private beta on TestFlight, serving two active property estates. Features AI-driven dynamic theming and a real-time scheduling engine.",
    features: [
      "Custom UI with generative AI theming",
      "Real-time booking and scheduling via Supabase",
      "Role-based access for Owners and Members",
      "Digital bulletin board and occupant dashboard",
    ],
    tech: [
      { name: "React Native", icon: getTechIcon("React Native") },
      { name: "Expo", icon: getTechIcon("Expo") },
      { name: "TypeScript", icon: getTechIcon("TypeScript") },
      { name: "Supabase", icon: getTechIcon("Supabase") },
      { name: "PostgreSQL", icon: getTechIcon("PostgreSQL") },
    ],
    size: "tall",
  },
  {
    id: "pointed",
    title: "Pointed",
    subtitle: "Community-Driven Challenge & Habit Tracker",
    type: "Mobile App (Showcase)",
    image: pointedImg,
    youtubeId: "STyPNCt8kKw",
    featured: false,
    status: "showcase",
    overview:
      "A complete cross-platform prototype that gamifies goal achievement through social leagues. Serves as a technical showcase for complex state management and real-time social features.",
    features: [
      "Gamified challenge system with dynamic point values",
      "Live chat and multi-scale leaderboards",
      "Activity heatmaps and progress visualizations",
    ],
    tech: [
      { name: "React Native", icon: getTechIcon("React Native") },
      { name: "Expo", icon: getTechIcon("Expo") },
      { name: "TypeScript", icon: getTechIcon("TypeScript") },
      { name: "Supabase", icon: getTechIcon("Supabase") },
      { name: "PostgreSQL", icon: getTechIcon("PostgreSQL") },
    ],
    size: "medium",
  },
  {
    id: "prizepicks",
    title: "PrizePicks +EV Tool",
    subtitle: "Data-Driven Sports Betting Advantage Finder",
    type: "Python Script",
    image: prizepicksImg,
    featured: false,
    status: "showcase",
    overview:
      "A data-driven Python utility that identifies mathematically profitable (+EV) PrizePicks entries. Successfully identified promotional opportunities with 25-55% edge.",
    features: [
      "Probability logic to derive fair odds",
      "Custom handlers for promotional events",
      "Multi-leg ROI simulator",
    ],
    tech: [{ name: "Python", icon: getTechIcon("Python") }],
    size: "small",
  },
];
