import {
  CSS3Icon,
  HTML5Icon,
  JavaScriptIcon,
  NodejsIcon,
  PrismaIcon,
  ReactIcon,
  RemixIcon,
  TailwindIcon,
  TypeScriptIcon,
  ViteIcon,
} from '~/components/icons/skill';

const skills = [
  { title: 'HTML5', icon: HTML5Icon },
  { title: 'CSS3', icon: CSS3Icon },
  { title: 'JavaScript', icon: JavaScriptIcon },
  {
    title: 'TypeScript',
    icon: TypeScriptIcon,
    url: 'https://typescriptlang.org',
  },
  { title: 'React', icon: ReactIcon, url: 'https://react.dev' },
  { title: 'Vite', icon: ViteIcon, url: 'https://vitejs.dev' },
  { title: 'Node.js', icon: NodejsIcon, url: 'https://nodejs.org' },
  { title: 'Remix', icon: RemixIcon, url: 'https://remix.run' },
  { title: 'TailwindCSS', icon: TailwindIcon, url: 'https://tailwindcss.com' },
  { title: 'Prisma', icon: PrismaIcon, url: 'https://prisma.io' },
];

export { skills };
