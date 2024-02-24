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
import {
  LinkedinIcon,
  GithubIcon,
  TwitterIcon,
  MailIcon,
} from '~/components/icons/social';

export const socials = [
  {
    title: 'Github',
    url: 'https://github.com/jsparkdev',
    icon: GithubIcon,
    username: '@jsparkdev',
  },
  {
    title: 'Twitter',
    url: 'https://x.com/jsparkdev',
    icon: TwitterIcon,
    username: '@jsparkdev',
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jsparkdev/?locale=en_US',
    icon: LinkedinIcon,
    username: 'Junseong Park',
  },
  {
    title: 'Mail',
    url: 'mailto:x@jspark.dev',
    icon: MailIcon,
    username: 'x@jspark.dev',
  },
];

export const skills = [
  { title: 'HTML5', icon: HTML5Icon },
  { title: 'CSS3', icon: CSS3Icon },
  { title: 'JavaScript', icon: JavaScriptIcon },
  {
    title: 'TypeScript',
    icon: TypeScriptIcon,
    href: 'https://typescriptlang.org',
  },
  { title: 'React', icon: ReactIcon, href: 'https://react.dev' },
  { title: 'Vite', icon: ViteIcon, href: 'https://vitejs.dev' },
  { title: 'Node.js', icon: NodejsIcon, href: 'https://nodejs.org' },
  { title: 'Remix', icon: RemixIcon, href: 'https://remix.run' },
  { title: 'TailwindCSS', icon: TailwindIcon, href: 'https://tailwindcss.com' },
  { title: 'Prisma', icon: PrismaIcon, href: 'https://prisma.io' },
];
