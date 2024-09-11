export default function TestButton() {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-full border border-white px-10 py-2 text-black hover:text-white">
      <div className="absolute -left-2 top-1/2 -z-10 size-0 -translate-y-1/2 rounded-full bg-black transition-all duration-300 ease-in-out group-hover:-left-1/2 group-hover:size-64"></div>
      <div className="z-50 font-semibold uppercase group-hover:-translate-x-0">
        About Us
      </div>
    </div>
  );
}
