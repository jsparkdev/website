import { ReactNode, SVGProps } from 'react';
import Card from '~/components/Card';
import { skills, socials } from '~/data';

function Heading({ name, position }: { name: string; position: string }) {
  return (
    <header className="flex flex-col sm:flex-row sm:justify-between gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-4xl">{name}</h1>
        <span>{position}</span>
      </div>
      <ul className="flex gap-6">
        {socials.map((social) => {
          return (
            <li key={social.title}>
              <a
                href={social.url}
                title={social.title}
                className="hover:opacity-70 duration-150"
              >
                {<social.icon />}
              </a>
            </li>
          );
        })}
      </ul>
    </header>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-bold text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function IconWithTitle({ title, icon }: { title: string; icon: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span>{title}</span>
    </div>
  );
}

type ListElem = {
  title: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
};

function List({ list }: { list: ListElem[] }) {
  const className = 'flex items-center justify-between px-4 py-6';

  return (
    <ul className="flex flex-wrap gap-2">
      {list.map((elem) => (
        <li key={elem.title}>
          <Card>
            {
              <div className={className} title={elem.title}>
                <IconWithTitle title={elem.title} icon={<elem.icon />} />
              </div>
            }
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default function Index() {
  return (
    <div className="flex flex-col gap-12">
      <Heading name="Junseong Park" position="Frontend Developer" />
      <Section title="I am interested in">
        <ul className="list-disc pl-6">
          <li>improving user experience in web applications</li>
          <li>implementing animation using CSS</li>
        </ul>
      </Section>
      <Section title="I use">
        <List list={skills} />
      </Section>
    </div>
  );
}
