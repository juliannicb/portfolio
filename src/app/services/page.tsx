import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Services() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <Section eyebrow="Offerings" title="Services">
          <div className="space-y-10">
            {/* A. Smart Contract Development */}
            <div>
              <h2 className="text-2xl font-bold mb-4">A. Smart Contract Development</h2>
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold">1. Token Creation</h3>
                  <p className="mt-2 text-sm text-muted">For founders, startups, and companies needing fast, secure token launches.</p>
                  <div className="mt-4">
                    <h4 className="font-medium">Deliverables</h4>
                    <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                      <li>ERC20, ERC721, ERC1155</li>
                      <li>Custom logic (minting caps, supply control, burn, pause)</li>
                      <li>Deployment scripts</li>
                      <li>Basic test suite</li>
                      <li>Etherscan verification</li>
                    </ul>
                    <p className="mt-3 text-sm text-text-secondary"><span className="font-medium">Timeline:</span> 2–5 days</p>
                  </div>
                  <Link href="/contact?subject=Inquiry%3A%20Token%20Creation" className="inline-block mt-4">
                    <Button>Inquire</Button>
                  </Link>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold">2. Smart Contract Extensions</h3>
                  <div className="mt-3">
                    <h4 className="font-medium">Deliverables</h4>
                    <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                      <li>Staking / yield systems</li>
                      <li>Vesting schedules (linear, cliff, custom logic)</li>
                      <li>Reward distributions</li>
                      <li>Multi-sig setup</li>
                      <li>Contract upgrades</li>
                    </ul>
                    <p className="mt-3 text-sm text-text-secondary"><span className="font-medium">Timeline:</span> 1–3 weeks</p>
                  </div>
                  <Link href="/contact?subject=Inquiry%3A%20Smart%20Contract%20Extensions" className="inline-block mt-4">
                    <Button>Inquire</Button>
                  </Link>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold">3. Smart Contract Audits (Lightweight)</h3>
                  <div className="mt-3">
                    <h4 className="font-medium">Deliverables</h4>
                    <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                      <li>Security review</li>
                      <li>Gas optimization suggestions</li>
                      <li>Written vulnerability report</li>
                      <li>Fixes (additional charge)</li>
                    </ul>
                    <p className="mt-3 text-sm text-text-secondary"><span className="font-medium">Timeline:</span> 3–7 days</p>
                  </div>
                  <Link href="/contact?subject=Inquiry%3A%20Smart%20Contract%20Audit%20(Lightweight)" className="inline-block mt-4">
                    <Button>Inquire</Button>
                  </Link>
                </Card>
              </div>
            </div>

            {/* B. Full dApp Development */}
            <div>
              <h2 className="text-2xl font-bold mb-4">B. Full dApp Development</h2>
              <Card className="p-6">
                <h3 className="text-xl font-semibold">4. Web3 Frontend + Backend</h3>
                <div className="mt-3">
                  <h4 className="font-medium">Deliverables</h4>
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                    <li>React/Next.js frontends</li>
                    <li>Wallet connection (MetaMask, WalletConnect, custom)</li>
                    <li>Transaction flows</li>
                    <li>Graph/Node backends</li>
                    <li>Blockchain API integrations</li>
                  </ul>
                  <p className="mt-3 text-sm text-text-secondary"><span className="font-medium">Timeline:</span> 2–6 weeks</p>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <Link href="/contact?subject=Inquiry%3A%20Web3%20Frontend%20(React%2FNext.js)" className="inline-block">
                    <Button>Inquire (Frontend)</Button>
                  </Link>
                  <Link href="/contact?subject=Inquiry%3A%20Full%20Stack%20Web3%20App" className="inline-block">
                    <Button>Inquire (Full Stack)</Button>
                  </Link>
                </div>
              </Card>
            </div>

            {/* C. AI + Blockchain Automations */}
            <div>
              <h2 className="text-2xl font-bold mb-4">C. AI + Blockchain Automations</h2>
              <p className="text-sm text-muted">For crypto exchanges, marketing teams, operations, or founders.</p>
              <Card className="p-6 mt-4">
                <h3 className="text-xl font-semibold">Examples</h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                  <li>AI reporting dashboards</li>
                  <li>Automated LLM-powered agents</li>
                  <li>On-chain event scrapers</li>
                  <li>n8n automations</li>
                  <li>Price monitoring tools</li>
                </ul>
                <p className="mt-3 text-sm text-text-secondary"><span className="font-medium">Timeline:</span> 3–6 weeks</p>
                <Link href="/contact?subject=Inquiry%3A%20AI%20%2B%20Blockchain%20Automations" className="inline-block mt-4">
                  <Button>Inquire</Button>
                </Link>
              </Card>
            </div>

            {/* D. Hyperledger Fabric / Enterprise Blockchain */}
            <div>
              <h2 className="text-2xl font-bold mb-4">D. Hyperledger Fabric / Enterprise Blockchain</h2>
              
              <Card className="p-6 mt-4">
                <h3 className="text-xl font-semibold">5. Enterprise PoC / Fabric Network</h3>
                <div className="mt-3">
                  <h4 className="font-medium">Deliverables</h4>
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                    <li>Full Hyperledger Fabric network</li>
                    <li>CA, Orderer, peer setup</li>
                    <li>Identity management</li>
                    <li>Chaincode development</li>
                    <li>Node.js/Go integration</li>
                    <li>Frontend and API</li>
                    <li>Documentation</li>
                  </ul>
                  <p className="mt-3 text-sm text-text-secondary"><span className="font-medium">Timeline:</span> 6–12 weeks</p>
                </div>
                <Link href="/contact?subject=Inquiry%3A%20Hyperledger%20Fabric%20Enterprise%20PoC%20%2F%20Network" className="inline-block mt-4">
                  <Button>Inquire</Button>
                </Link>
              </Card>
            </div>

            {/* E. Consulting / Architecture */}
            <div>
              <h2 className="text-2xl font-bold mb-4">E. Consulting / Architecture</h2>
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold">6. Paid Consulting Call</h3>
                  
                  <div className="mt-3">
                    <h4 className="font-medium">Deliverables</h4>
                    <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                      <li>Project scoping</li>
                      <li>Architecture diagram</li>
                      <li>Development roadmap</li>
                      <li>Cost estimate</li>
                      <li>Timeline estimate</li>
                    </ul>
                    <p className="mt-3 text-sm text-text-secondary"><span className="font-medium">Duration:</span> 60 minutes</p>
                  </div>
                  <Link href="/contact?subject=Inquiry%3A%20Paid%20Consulting%20Call" className="inline-block mt-4">
                    <Button>Inquire</Button>
                  </Link>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold">7. Monthly Retainer (Optional)</h3>
                  <div className="mt-3">
                    <h4 className="font-medium">Deliverables</h4>
                    <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                      <li>Technical leadership</li>
                      <li>Architecture reviews</li>
                      <li>On-demand support</li>
                    </ul>
                  </div>
                  <Link href="/contact?subject=Inquiry%3A%20Monthly%20Retainer" className="inline-block mt-4">
                    <Button>Inquire</Button>
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
