import { PostCard } from '~/components/ui/card';
import ToolTip from '~/components/ui/tooltip';
import matter from 'gray-matter';
import { readdirSync } from 'fs';

const slugs = readdirSync('./app/content').map((fileName) =>
  fileName.slice(0, -3)
);

const postList = readdirSync('./app/content').map((file) => {
  return matter.read(`./app/content/${file}`);
});

export default function Posts() {
  return (
    <div className="gap-10">
      <h1 className="text-center">Posts</h1>
      <ul className="gap-4">
        {postList.map((post, index) => (
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
    </div>
  );
}
