import { Link } from '@remix-run/react';

export default function Index() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="font-extrabold">Current : /</h1>
      <Link
        to="users"
        className="bg-sky-400 p-3 hover:opacity-40 transition-opacity"
      >
        Go to /users &rarr;
      </Link>
    </div>
  );
}
