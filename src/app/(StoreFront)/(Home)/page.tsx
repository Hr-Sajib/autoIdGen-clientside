import Hero from "./(_components)/Hero";
import RoleLogger from "./(_components)/RollLoger";

export default function Home() {
  return (
    <div className="bg-white min-h-screen h-full">
      <Hero/>
      <RoleLogger/>
      <h1 className="text-3xl font-bold underline">Landing</h1>
    </div>
  );
}
