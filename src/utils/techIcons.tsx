
import {
  SiReact,
  SiTypescript,
  SiDotnet,
  SiSharp,
  SiPostgresql,
  SiDatadog,
  SiAmazonwebservices,
  SiKubernetes,
  SiVitest,
  SiAnsible,
  SiJenkins,
  SiDocker,
  SiGnubash,
  SiCplusplus,
  SiPython,
  SiC,
  SiSupabase,
  SiOpenai,
  SiExpo,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FaJava } from "react-icons/fa";
import type { ReactNode } from "react";

export const techIcons: Record<string, ReactNode> = {
  ".NET Core": <SiDotnet />,
  "C#": <SiSharp />,
  SQL: <SiPostgresql />,
  React: <SiReact />,
  TypeScript: <SiTypescript />,
  DataDog: <SiDatadog />,
  AWS: <SiAmazonwebservices />,
  Kubernetes: <SiKubernetes />,
  "Tanstack Query": <TbBrandReactNative />,
  Vitest: <SiVitest />,
  Ansible: <SiAnsible />,
  Jenkins: <SiJenkins />,
  Docker: <SiDocker />,
  Bash: <SiGnubash />,
  "C++": <SiCplusplus />,
  Python: <SiPython />,
  Java: <FaJava />,
  C: <SiC />,
  Verilog: null,
  Supabase: <SiSupabase />,
  OpenAI: <SiOpenai />,
  "React Native": <SiReact />,
  Expo: <SiExpo />,
  PostgreSQL: <SiPostgresql />,
};

export const getTechIcon = (name: string): ReactNode => {
  return techIcons[name] || null;
};
