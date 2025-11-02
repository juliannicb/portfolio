import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Section } from "@/components/ui/section";
import Image from "next/image";
import { ProfileReveal } from "@/components/site/profile-reveal";

export default function Home() {

  return (
    <div className="relative">
      {/* Ambient gradient arc */}
      <div className="pointer-events-none absolute -top-32 right-0 h-[360px] w-[360px] rounded-full opacity-60 blur-3xl" style={{
        background: "conic-gradient(from 0deg, #7A3EF5, #38C4B6, #1E90FF, #7A3EF5)",
        animation: "spin 30s linear infinite",
        maskImage: "radial-gradient(closest-side, black, transparent)"
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg);} }`}</style>

      {/* Hero */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-4xl text-white">
              Blockchain & Smart Contract Engineer
            </p>
            <div className="mt-2 text-sm text-muted">hello!</div>
            <h1 className="mt-2 text-lg font-normal text-muted">I’m Julian.</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              I build secure, scalable systems at the intersection of blockchain, AI automation, and usable frontend.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/cv.pdf" download>
                <Button>Download CV</Button>
              </a>
              <Link href="/projects">
                <Button>Projects</Button>
              </Link>
              <a href="https://github.com/juliannicb" target="_blank" rel="noreferrer">
                <Button variant="ghost">GitHub</Button>
              </a>
              <a href="https://linkedin.com/in/juliannic" target="_blank" rel="noreferrer">
                <Button variant="ghost">LinkedIn</Button>
              </a>
            </div>
            {/* Tags removed per request */}
          </div>
          <div className="space-y-6">
            <ProfileReveal />
            {/* Removed mobile-only quick access below profile */}
          </div>
        </div>
      </Section>

    </div>
  );
}
