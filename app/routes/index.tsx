import { Link } from '@remix-run/react';
import { ReactNode } from 'react';
import Card, { PostCard } from '~/components/ui/card';
import ToolTip from '~/components/ui/tooltip';
import { interesting } from '~/data/interesting';
import { skills } from '~/data/skills';
import { cn } from '~/utils/class';
import matter from 'gray-matter';
import { readdirSync } from 'fs';

const slugs = readdirSync('./app/content').map((fileName) =>
  fileName.slice(0, -3)
);

const postList = readdirSync('./app/content').map((file) => {
  return matter.read(`./app/content/${file}`);
});

type SectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

function Section({ title, children, className }: SectionProps) {
  return (
    <section className={cn('gap-3', className)}>
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
      <div className="flex-row items-center justify-between gap-4">
        {icon}
        <span>{title}</span>
      </div>
    </Card>
  );
}

export default function Index() {
  return (
    <div className="gap-12">
      <Section title="I am interested in">
        <ul className="list-disc pl-6">
          {interesting.map((inter) => (
            <li key={inter}>{inter}</li>
          ))}
        </ul>
      </Section>
      <Section title="using">
        <ul className="flex-row flex-wrap gap-4">
          {skills.map((skill) => (
            <li key={skill.title}>
              <ToolTip
                trigger={<SkillCard title={skill.title} icon={skill.icon()} />}
              >
                <p>{skill.title}</p>
                {skill.url && (
                  <a
                    href={skill.url}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {skill.url}
                  </a>
                )}
              </ToolTip>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Posts" className="lg:w-1/2">
        <ul className="gap-4">
          {postList.slice(0, 4).map((post, index) => (
            <li key={post.data.title}>
              <ToolTip
                trigger={
                  <PostCard
                    title={post.data.title}
                    slug={`/posts/${slugs[index]}`}
                  />
                }
                className="w-full"
              >
                <p>{post.data.title}</p>
              </ToolTip>
            </li>
          ))}
        </ul>
        {postList.length > 4 && (
          <Link to="posts" className="hover:opacity-30 text-right">
            Read more
          </Link>
        )}
      </Section>
    </div>
  );
}
