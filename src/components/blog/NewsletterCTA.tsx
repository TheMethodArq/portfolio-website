'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, CheckCircle2, Sparkles } from 'lucide-react';

interface NewsletterCTAProps {
  className?: string;
  variant?: 'default' | 'compact' | 'inline';
  title?: string;
  description?: string;
}

export function NewsletterCTA({
  className,
  variant = 'default',
  title = 'Stay in the Loop',
  description = 'Get the latest insights on AI governance, engineering, and product updates delivered to your inbox.',
}: NewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail('');
  };

  if (variant === 'compact') {
    return (
      <div className={cn('bg-surface-glass rounded-xl p-6 border border-border-glass', className)}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-text-primary mb-1">Subscribe for Updates</h4>
            <p className="text-sm text-text-secondary mb-4">
              Get notified when new articles are published.
            </p>
            
            {isSubmitted ? (
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" loading={isSubmitting} size="sm">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={cn('flex flex-col sm:flex-row items-center gap-4 p-4 bg-accent/5 rounded-xl border border-accent/20', className)}>
        <div className="flex items-center gap-3 flex-1">
          <Sparkles className="w-5 h-5 text-accent flex-shrink-0" />
          <p className="text-sm text-text-secondary">
            <span className="font-medium text-text-primary">Enjoying this content?</span> Subscribe for weekly AI insights.
          </p>
        </div>
        
        {isSubmitted ? (
          <div className="flex items-center gap-2 text-success text-sm whitespace-nowrap">
            <CheckCircle2 className="w-4 h-4" />
            <span>Subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full sm:w-48"
            />
            <Button type="submit" loading={isSubmitting} size="sm">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    );
  }

  return (
    <Card className={cn('text-center', className)}>
      <div className="max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-text-primary mb-3">{title}</h3>
        <p className="text-text-secondary mb-8">{description}</p>
        
        {isSubmitted ? (
          <div className="flex items-center justify-center gap-3 p-4 bg-success/10 rounded-xl">
            <CheckCircle2 className="w-6 h-6 text-success" />
            <div className="text-left">
              <p className="font-semibold text-success">Thanks for subscribing!</p>
              <p className="text-sm text-text-secondary">Check your inbox for a confirmation email.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" loading={isSubmitting} className="whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        )}
        
        <p className="text-xs text-text-tertiary mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </Card>
  );
}
