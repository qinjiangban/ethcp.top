import ConnectMenu from "@/components/ConnectMenu";

export default function Home() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-orange-700">Ethereum Communist Party</h1>
            <p className="py-6 ">
              The world computer in communist society.
              Explore the social production relations in the new digital world.
            </p>
            <button className="btn btn-error">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}
