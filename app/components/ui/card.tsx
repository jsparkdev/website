import { Link } from '@remix-run/react';
import { cn } from '~/utils/class';

type PostCardProps = {
  title: string;
  slug: string;
};

export function PostCard({ title, slug }: PostCardProps) {
  return (
    <Link to={slug}>
      <Card>
        <p>{title}</p>
      </Card>
    </Link>
  );
}

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-gray-100 rounded-lg hover:bg-gray-200 duration-100 cursor-pointer p-6',
        className
      )}
    >
      {children}
    </div>
  );
}
