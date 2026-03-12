import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center mt-10">Welcome to Contract Analysis</h1>
      <p className="text-center mt-4 text-lg">Analyze your contracts with ease using our AI-powered tool.</p>
      <div className="flex justify-center mt-10">
        <Image src="/contract-analysis.png" alt="Contract Analysis" width={600} height={400} />
        <p className="text-center mt-4 text-lg">Visualize your contracts with our intuitive interface.</p>
      </div>
    </div>
  );
}
