import { Link, useParams } from '@remix-run/react';

export default function UserInfoPage() {
  const params = useParams();

  return (
    <div className="flex flex-col gap-10">
      <h1 className="font-extrabold">Current : /users/{params.username}</h1>
      <Link
        to=".."
        className="bg-sky-400 p-3 hover:opacity-40 transition-opacity"
      >
        Go to / &rarr;
      </Link>
    </div>
  );
}
