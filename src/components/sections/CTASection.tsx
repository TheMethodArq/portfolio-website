'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users, Code, BookOpen, MessageSquare, Rocket, FileText, Calendar, Lightbulb, Handshake } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import Link from 'next/link';
import { cn } from "@/lib/utils";

const ctaOptions = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'For Beta Participants',
    description: 'Early access to our AI products and shape their future with your feedback',
    href: '/beta',
    cta: 'Join Beta',
    gradient: 'from-blue-500 to-indigo-500',
    tile: { bg: 'bg-gradient-to-br from-blue-50/90 to-white', border: 'border-blue-200/60 hover:border-blue-300', text: 'text-blue-600' },
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'For Industry Practitioners',
    description: 'Help us understand your unique business challenges and workflow needs',
    href: '/contact',
    cta: 'Get in Touch',
    gradient: 'from-purple-500 to-fuchsia-500',
    tile: { bg: 'bg-gradient-to-br from-purple-50/90 to-white', border: 'border-purple-200/60 hover:border-purple-300', text: 'text-purple-600' },
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: 'For Developers',
    description: 'Explore our microservices architecture and contribute to the platform',
    href: '/architecture/technical',
    cta: 'View Architecture',
    gradient: 'from-indigo-500 to-blue-500',
    tile: { bg: 'bg-gradient-to-br from-indigo-50/90 to-white', border: 'border-indigo-200/60 hover:border-indigo-300', text: 'text-indigo-600' },
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'For Skeptics',
    description: 'Read our philosophy and understand why we are building this differently',
    href: '/philosophy',
    cta: 'Read Philosophy',
    gradient: 'from-blue-500 to-purple-500',
    tile: { bg: 'bg-gradient-to-br from-blue-50/90 to-white', border: 'border-blue-200/60 hover:border-blue-300', text: 'text-blue-600' },
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'For Proof Seekers',
    description: 'Review our evidence reports on ad waste and broken organic SEO',
    href: '/evidence/ad-waste',
    cta: 'See the Receipts',
    gradient: 'from-slate-600 to-slate-900',
    tile: { bg: 'bg-gradient-to-br from-slate-50/90 to-white', border: 'border-slate-200/60 hover:border-slate-300', text: 'text-slate-600' },
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Book a Free Session',
    description: '2-hour on-site or remote AI strategy session. You control the topic.',
    href: '/contact?type=free-session',
    cta: 'Schedule Now',
    gradient: 'from-violet-500 to-purple-500',
    tile: { bg: 'bg-gradient-to-br from-violet-50/90 to-white', border: 'border-violet-200/60 hover:border-violet-300', text: 'text-violet-600' },
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'See What\'s Coming',
    description: 'View our 24-month product roadmap and planned features',
    href: '/roadmap',
    cta: 'View Roadmap',
    gradient: 'from-fuchsia-500 to-pink-500',
    tile: { bg: 'bg-gradient-to-br from-fuchsia-50/90 to-white', border: 'border-fuchsia-200/60 hover:border-fuchsia-300', text: 'text-fuchsia-600' },
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: 'Partner With Us',
    description: 'Affiliate program, reseller opportunities, and strategic partnerships',
    href: '/contact?type=partnership',
    cta: 'Become a Partner',
    gradient: 'from-blue-500 to-indigo-500',
    tile: { bg: 'bg-gradient-to-br from-blue-50/90 to-white', border: 'border-blue-200/60 hover:border-blue-300', text: 'text-blue-600' },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Section divider - strong visual break */}
      <div className="absolute top-0 left-0 right-0 section-divider" />
      
      {/* Background */}
      <div className="absolute inset-0 bg-pattern-light" />

      <Container className="relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-purple-50 border border-purple-200/50 shadow-sm"
            >
              <Rocket className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Get Involved</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
              Build This <span className="text-gradient">With Us</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Multiple ways to engage with Thalamus—from beta testing to partnership opportunities
            </p>
          </div>
        </FadeIn>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {ctaOptions.map((option) => (
            <motion.div key={option.href} variants={itemVariants}>
              <Link href={option.href}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`h-full p-6 rounded-2xl ${option.tile.bg} backdrop-blur-sm border ${option.tile.border} shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer text-center`}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`p-4 rounded-xl bg-gradient-to-br ${option.gradient} text-white w-fit mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    {option.icon}
                  </motion.div>
                  <h3 className={`text-lg font-semibold text-slate-800 mb-2 group-hover:${option.tile.text} transition-colors`}>
                    {option.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 min-h-[40px]">
                    {option.description}
                  </p>
                  <span className={`inline-flex items-center text-sm font-medium ${option.tile.text} group-hover:underline`}>
                    {option.cta}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
