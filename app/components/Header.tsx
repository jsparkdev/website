import { ReactNode } from 'react';
import ToolTip from './ui/tooltip';
import { socials } from '~/data/socials';

type ProfileProps = {
  name: string;
  position: string;
};

function Profile({ name, position }: ProfileProps) {
  return (
    <div className="gap-2">
      <h1>{name}</h1>
      <span>{position}</span>
    </div>
  );
}

type SocialLinkProps = {
  title: string;
  icon: () => ReactNode;
  url: string;
  username: string;
};

function SocialLink({ title, icon, url, username }: SocialLinkProps) {
  const iconLink = (
    <a href={url} className="hover:opacity-70">
      {icon()}
    </a>
  );

  return (
    <ToolTip trigger={iconLink}>
      <p>{title}</p>
      <a href={url} className="text-blue-400 hover:text-blue-300">
        {username}
      </a>
    </ToolTip>
  );
}

function SocialNavBar() {
  return (
    <ul className="flex-row gap-6">
      {socials.map((social) => (
        <li key={social.title}>
          {<SocialLink {...social} icon={social.icon} />}
        </li>
      ))}
    </ul>
  );
}

function Header() {
  return (
    <header className="sm:flex-row sm:justify-between gap-6">
      <Profile name="Junseong Park" position="Frontend Developer" />
      <SocialNavBar />
    </header>
  );
}

export default Header;
