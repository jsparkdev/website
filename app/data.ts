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
  },
  { title: 'Twitter', url: 'https://x.com/jsparkdev', icon: TwitterIcon },
  {
    title: 'LinkedIn',
    url: 'https://linkedin.com/in/jsparkdev',
    icon: LinkedinIcon,
  },
  {
    title: 'Mail',
    url: 'mailto:x@jspark.dev',
    icon: MailIcon,
  },
];

export const skills = [
  { title: 'HTML5', icon: HTML5Icon },
  { title: 'CSS3', icon: CSS3Icon },
  { title: 'JavaScript', icon: JavaScriptIcon },
  { title: 'TypeScript', icon: TypeScriptIcon },
  { title: 'React', icon: ReactIcon },
  { title: 'Node.js', icon: NodejsIcon },
  { title: 'Remix', icon: RemixIcon },
  { title: 'TailwindCSS', icon: TailwindIcon },
  { title: 'Prisma', icon: PrismaIcon },
];
