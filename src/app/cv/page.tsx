import { Download, Mail, Github, Linkedin, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';

export default function CV() {
  return (
    <div className="min-h-screen pt-24 pb-16 print:pt-0 print:pb-0">
      <div className="container mx-auto px-6 max-w-4xl print:max-w-none print:px-0">
        {/* Header */}
        <div className="mb-12 print:mb-8">
          <div className="flex justify-between items-start mb-6 print:mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 print:text-3xl">Julian Nicácio Garin Brandalise</h1>
              <p className="text-xl text-text-secondary mb-4 print:text-lg">
                Blockchain & Smart Contract Engineer
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-text-secondary print:gap-2">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  jngbrandalise@live.com
                </div>
                <div className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  github.com/juliannicb
                </div>
                <div className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  linkedin.com/in/juliannic
                </div>
              </div>
            </div>
            <a href="/cv.pdf" download className="print:hidden">
              <Button variant="ghost">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </a>
          </div>
          
          <p className="text-text-secondary leading-relaxed">
            I build secure, scalable systems at the intersection of blockchain, AI automation, and usable frontend. 
            For the past 7+ years, I've specialized in smart contract development, DeFi protocols, and creating 
            intuitive interfaces for complex blockchain applications.
          </p>
        </div>

        {/* Experience */}
        <section className="mb-12 print:mb-8">
          <h2 className="text-2xl font-bold mb-6 print:text-xl print:mb-4">Experience</h2>
          <div className="space-y-8 print:space-y-4">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">Team Leader</h3>
                  <p className="text-text-secondary">BeInCrypto</p>
                </div>
                <span className="text-sm text-text-secondary">2022 - Present</span>
              </div>
              <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
                <li>Led development of DeFi aggregation protocols handling $50M+ TVL</li>
                <li>Architected cross-chain bridge infrastructure supporting 8+ networks</li>
                <li>Implemented advanced MEV protection mechanisms reducing slippage by 40%</li>
                <li>Built automated trading agents using AI/ML for yield optimization</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">Blockchain Developer</h3>
                  <p className="text-text-secondary">Freelance</p>
                </div>
                <span className="text-sm text-text-secondary">2019 - 2022</span>
              </div>
              <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
                <li>Developed 15+ smart contracts for NFT marketplaces and DeFi protocols</li>
                <li>Created full-stack dApps with React, Web3.js, and IPFS integration</li>
                <li>Conducted security audits and gas optimization for client contracts</li>
                <li>Built custom tokenomics and governance systems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12 print:mb-8">
          <h2 className="text-2xl font-bold mb-6 print:text-xl print:mb-4">Technical Skills</h2>
          <div className="grid md:grid-cols-2 gap-6 print:gap-4">
            <div>
              <h3 className="font-semibold mb-3">Blockchain & Smart Contracts</h3>
              <div className="flex flex-wrap gap-2">
                {['Solidity', 'Vyper', 'Rust', 'Web3.js', 'Ethers.js', 'Hardhat', 'Foundry', 'OpenZeppelin'].map(skill => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Frontend & Full-Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Redis'].map(skill => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">DevOps & Infrastructure</h3>
              <div className="flex flex-wrap gap-2">
                {['Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform', 'GitHub Actions'].map(skill => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">AI & Automation</h3>
              <div className="flex flex-wrap gap-2">
                {['LangChain', 'OpenAI API', 'Prompt Engineering', 'Agent Frameworks'].map(skill => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="mb-12 print:mb-8">
          <h2 className="text-2xl font-bold mb-6 print:text-xl print:mb-4">Education & Certifications</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">ConsenSys Solidity Developer Certification</h3>
              <p className="text-text-secondary">Advanced smart contract development and security</p>
            </div>
            <div>
              <h3 className="font-semibold">AWS Solutions Architect</h3>
              <p className="text-text-secondary">Cloud infrastructure and scalable systems design</p>
            </div>
            <div>
              <h3 className="font-semibold">Machine Learning for Trading - Udacity</h3>
              <p className="text-text-secondary">Algorithmic trading and quantitative analysis</p>
            </div>
          </div>
        </section>

        {/* Languages */}
        <section className="print:mb-4">
          <h2 className="text-2xl font-bold mb-6 print:text-xl print:mb-4">Languages</h2>
          <div className="flex gap-6">
            <div>
              <span className="font-semibold">German:</span>
              <span className="text-text-secondary ml-2">Fluent</span>
            </div>
            <div>
              <span className="font-semibold">English:</span>
              <span className="text-text-secondary ml-2">Fluent</span>
            </div>
            <div>
              <span className="font-semibold">Portuguese:</span>
              <span className="text-text-secondary ml-2">Fluent</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}