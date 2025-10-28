import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";

export const metadata = { title: "About" };

export default function AboutPage() {
  const skills = [
    "Solidity","TypeScript","React","Node","Ethers/Web3","Python","Foundry/Hardhat","Docker/K8s","AWS/GCP","Prompt Engineering","LangChain"
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <Section title="About">
        <p className="text-muted">
          I design and ship secure, high-performance blockchain systems with a focus on smart contracts, AI automation, and usable frontend experiences.
        </p>
        <div className="mt-6">
          <div className="text-sm text-muted">Languages</div>
          <div className="mt-2">DE (native), EN, PT</div>
        </div>
        <div className="mt-6">
          <div className="text-sm text-muted">Certifications</div>
          <ul className="mt-2 list-disc pl-5">
            <li>ConsenSys Solidity</li>
            <li>AWS Solutions Architect</li>
          </ul>
        </div>
      </Section>
      <Section title="Skills" eyebrow="Stack" >
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => <Chip key={s}>{s}</Chip>)}
        </div>
      </Section>
      <Section title="Links">
        <ul className="space-y-2 text-accent-teal">
          <li><a href="https://linkedin.com/in/juliannic" target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href="https://github.com/juliannicb" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href="mailto:jngbrandalise@live.com">Email</a></li>
        </ul>
      </Section>
    </div>
  );
}