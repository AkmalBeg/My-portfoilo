import * as Si from "react-icons/si";
import { FaCode } from "react-icons/fa";

const options = [
  ["SiReact", "React"], ["SiNodedotjs", "Node.js"], ["SiExpress", "Express"],
  ["SiMongodb", "MongoDB"], ["SiTailwindcss", "Tailwind CSS"], ["SiJavascript", "JavaScript"],
  ["SiHtml5", "HTML5"],
  ["SiTypescript", "TypeScript"], ["SiNextdotjs", "Next.js"], ["SiRedux", "Redux"],
  ["SiMysql", "MySQL"], ["SiPython", "Python"], ["SiFirebase", "Firebase"],
];

const aliases = { SiCss3: "SiCss" };
const lookup = (key) => Si[key] || Si[aliases[key]];

export const iconOptions = options.filter(([key]) => lookup(key));
export const getIcon = (name) => (name && lookup(name)) || FaCode;