import { ReactNode, SVGProps } from 'react';
import Card from '~/components/Card';
import { skills, socials } from '~/data';

function Heading({ name, position }: { name: string; position: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-4xl">{name}</h1>
      <span>{position}</span>
    </div>
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
  url?: string;
};

function List({ list }: { list: ListElem[] }) {
  const className = 'flex items-center justify-between px-4 py-6';

  return (
    <ul className="flex flex-wrap gap-2">
      {list.map((elem) => (
        <li key={elem.title}>
          <Card>
            {elem.url ? (
              <a className={className} title={elem.title} href={elem.url}>
                <IconWithTitle title={elem.title} icon={<elem.icon />} />
              </a>
            ) : (
              <div className={className} title={elem.title}>
                <IconWithTitle title={elem.title} icon={<elem.icon />} />
              </div>
            )}
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default function Index() {
  return (
    <div className="flex flex-col gap-6">
      <Heading name="Junseong Park" position="Frontend Developer" />
      <Section title="I am interested in">
        <ul className="list-disc pl-6">
          <li>improving user experience in web applications</li>
          <li>mobile application development using React Native</li>
          <li>implementing animation using CSS</li>
        </ul>
      </Section>
      <Section title="I use">
        <List list={skills} />
      </Section>
      <Section title="Social">
        <List list={socials} />
      </Section>
    </div>
  );
}
