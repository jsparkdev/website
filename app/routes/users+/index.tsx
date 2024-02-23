import { Link } from '@remix-run/react';

export default function UserPage() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="font-extrabold">Current : /users</h1>
      <div className="flex flex-col gap-3">
        <Link
          to="jun"
          className="bg-sky-400 p-3 hover:opacity-40 transition-opacity"
        >
          Go to /users/jun &rarr;
        </Link>
        <Link
          to="kevin"
          className="bg-sky-400 p-3 hover:opacity-40 transition-opacity"
        >
          Go to /users/kevin &rarr;
        </Link>
        <Link
          to="may"
          className="bg-sky-400 p-3 hover:opacity-40 transition-opacity"
        >
          Go to /users/may &rarr;
        </Link>
      </div>
    </div>
  );
}
