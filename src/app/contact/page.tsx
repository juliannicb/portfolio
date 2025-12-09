'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Github, Linkedin, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get('subject') ?? '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        e.currentTarget.reset();
      } else {
        toast.error(result.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
          placeholder="Your name"
          required
          minLength={2}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
          placeholder="your@email.com"
          required
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
          placeholder="Project inquiry, collaboration, etc."
          defaultValue={defaultSubject}
          required
          minLength={5}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors resize-none"
          placeholder="Tell me about your project..."
          required
          minLength={10}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <Section eyebrow="Get in touch" title="Let's build something together">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Suspense fallback={<div className="h-10" />}> 
                <ContactForm />
              </Suspense>
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
