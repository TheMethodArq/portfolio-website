'use client';

import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { Quote, ArrowRight } from 'lucide-react';

export function CTOMessageSection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5" />
      
      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <FadeIn direction="left" className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/shawn.webp"
                alt="Shawn Sloan, CTO & Co-founder of Thalamus AI"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Name badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <p className="text-white font-semibold text-lg">Shawn Sloan</p>
                  <p className="text-white/80 text-sm">CTO & Co-founder</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-secondary/20 rounded-full blur-2xl" />
          </FadeIn>
          
          {/* Content Column */}
          <FadeIn direction="right" delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Quote className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                A Message from the CTO
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
              We Built 24 Microservices in 6 Months.{' '}
              <span className="text-accent">Here&apos;s What That Means for You.</span>
            </h2>
            
            <div className="space-y-4 text-text-secondary text-lg leading-relaxed mb-8">
              <p>
                I&apos;ve spent twenty years behind the enterprise curtain. I know what true use 
                of technology can do. It&apos;s time to stop thinking of technology as an expense, 
                and learn how to make it a revenue generator.
              </p>
              <p>
                While enterprises spend 18 months and $5M on vendor &quot;implementations&quot; 
                that are really just configuration projects, we built real technology. The tools 
                have been here all along—what was missing was the willingness to question the 
                narrative that &quot;enterprise-grade&quot; requires enterprise budgets.
              </p>
              <p className="text-text-primary font-medium">
                We&apos;ve been preyed upon for too long. Those days are over.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/blog/building-24-microservices-in-6-months" size="lg" className="group">
                Read the Full Message
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/company/story" variant="secondary" size="lg">
                Our Story
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
