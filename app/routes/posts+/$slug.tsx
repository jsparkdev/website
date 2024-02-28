import { useParams } from '@remix-run/react';

export default function Posts() {
  const params = useParams();
  return <h1>{params.slug}</h1>;
}
