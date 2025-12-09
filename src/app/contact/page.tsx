'use client';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Github, Linkedin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <Section eyebrow="Get in touch" title="Let's build something together">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="p-6">
                <h3 className="text-xl font-semibold">Project Inquiry</h3>
                <p className="mt-2 text-sm text-text-secondary">Use the external form to share your project details.</p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSc_Q_ySGH5m-b1eDvDE63l8QhamLTRZKUBmacY78BJ1xHxV6Q/viewform?usp=sharing&ouid=107973645994622748887"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4"
                >
                  <Button>Inquire</Button>
                </a>
              </Card>
            </div>

            {/* Direct Contact */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Direct Contact</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:jngbrandalise@live.com"
                    className="flex items-center gap-3 p-4 bg-surface border border-border rounded-lg hover:border-accent-blue transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-accent-blue" />
                    <div>
                      <div className="font-medium group-hover:text-accent-blue transition-colors">
                        Email
                      </div>
                      <div className="text-sm text-text-secondary">
                        jngbrandalise@live.com
                      </div>
                    </div>
                  </a>
                  
                  <a
                    href="https://linkedin.com/in/juliannic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-surface border border-border rounded-lg hover:border-accent-blue transition-colors group"
                  >
                    <Linkedin className="w-5 h-5 text-accent-blue" />
                    <div>
                      <div className="font-medium group-hover:text-accent-blue transition-colors">
                        LinkedIn
                      </div>
                      <div className="text-sm text-text-secondary">
                        Connect professionally
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/juliannicb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-surface border border-border rounded-lg hover:border-accent-blue transition-colors group"
                  >
                    <Github className="w-5 h-5 text-accent-blue" />
                    <div>
                      <div className="font-medium group-hover:text-accent-blue transition-colors">
                        GitHub
                      </div>
                      <div className="text-sm text-text-secondary">
                        View my code
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="p-6 bg-surface border border-border rounded-lg">
                <h4 className="font-medium mb-2">Response Time</h4>
                <p className="text-sm text-text-secondary">
                  I typically respond within 24 hours. For urgent matters, feel free to reach out on LinkedIn.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
