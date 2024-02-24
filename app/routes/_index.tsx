import { ReactNode } from 'react';
import Header from '~/components/Header';
import Card from '~/components/ui/card';
import ToolTip from '~/components/ui/tooltip';
import { interesting } from '~/data/interesting';
import { skills } from '~/data/skills';

type SectionProps = {
  title: string;
  children: ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <section className="gap-3">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

type SkillCardProps = {
  title: string;
  icon: ReactNode;
};

function SkillCard({ title, icon }: SkillCardProps) {
  return (
    <Card>
      <div className="flex-row items-center justify-between gap-4 p-6">
        {icon}
        <span>{title}</span>
      </div>
    </Card>
  );
}

type Item = {
  title: string;
  icon: () => ReactNode;
  url?: string;
};

function ListToolTip({ title, icon, url }: Item) {
  return (
    <ToolTip trigger={<SkillCard title={title} icon={icon()} />}>
      <p>{title}</p>
      {url && (
        <a href={url} className="text-blue-400 hover:text-blue-300">
          {url}
        </a>
      )}
    </ToolTip>
  );
}

function List({ list }: { list: Item[] }) {
  return (
    <ul className="flex-row flex-wrap gap-4">
      {list.map((item) => (
        <li key={item.title}>{<ListToolTip {...item} />}</li>
      ))}
    </ul>
  );
}

export default function Index() {
  return (
    <div className="gap-12">
      <Header />
      <Section title="I am interested in">
        <ul className="list-disc pl-6">
          {interesting.map((inter) => (
            <li key={inter}>{inter}</li>
          ))}
        </ul>
      </Section>
      <Section title="I use">
        <List list={skills} />
      </Section>
    </div>
  );
}
