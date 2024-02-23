export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 rounded-lg hover:bg-gray-200 duration-200 cursor-pointer max-w-[70vw]">
      {children}
    </div>
  );
}
