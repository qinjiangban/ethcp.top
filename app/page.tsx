import Footer from "@/components/footer";

import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen flex flex-col justify-center items-center">

        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-orange-700 mb-4">Ethereum Communist Party</h1>
            <p className="py-4 text-base-content">
              The world computer in communist society.<br />
              Explore the social production relations in the new digital world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Link href={`/edu/1`} className="btn btn-error">学习课程</Link>
              <Link href={`/about`} className="btn btn-error">About</Link>
            </div>

          </div>
        </div>

{/*         <div className="mt-8">
          <MintNFT />
        </div> */}

      </div>
      
      <Footer />
    </>
  );
}

