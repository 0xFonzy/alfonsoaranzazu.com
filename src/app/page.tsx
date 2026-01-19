"use client";

import dynamic from "next/dynamic";

// Dynamic imports for client components
const MatrixRain = dynamic(() => import("@/components/MatrixRain"), {
  ssr: false,
});
const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});
const MouseGlow = dynamic(() => import("@/components/MouseGlow"), {
  ssr: false,
});
const Terminal = dynamic(() => import("@/components/Terminal"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-cyan-400 animate-pulse">Initializing terminal...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Background Effects */}
      <MatrixRain />
      <ParticleField />
      <MouseGlow />

      {/* Scanlines Overlay */}
      <div className="scanlines" />

      {/* Vignette */}
      <div className="vignette" />

      {/* CRT Flicker Container */}
      <div className="crt-flicker relative z-10">
        <Terminal />
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center text-gray-600 text-xs z-50">
        <p>
          © {new Date().getFullYear()} Alfonso Aranzazu. Built with{" "}
          <span className="text-cyan-500">Next.js</span> &{" "}
          <span className="text-pink-500">TailwindCSS</span>
        </p>
      </footer>
    </main>
  );
}
