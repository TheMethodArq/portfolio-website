'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Map,
  DollarSign,
  ClipboardCheck,
  ShieldCheck,
  Download,
  X,
  Check,
  FileText,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { CTATracker } from '../tracking/CTATracker';
import { useCTATracking } from '../tracking/useCTATracking';

export type LeadMagnetType =
  | 'vvs-calculator'
  | 'intent-mapping'
  | 'cost-calculator'
  | 'citation-checklist'
  | 'wrapper-detector';

interface LeadMagnetCTAProps {
  /** Type of lead magnet */
  type: LeadMagnetType;
  /** Custom title (overrides default) */
  title?: string;
  /** Custom description (overrides default) */
  description?: string;
  /** URL to download file (optional - can be generated) */
  fileUrl?: string;
  /** Custom className */
  className?: string;
  /** Variant style */
  variant?: 'card' | 'inline' | 'banner';
  /** Callback on successful download */
  onDownload?: () => void;
  /** Unique ID for tracking */
  trackingId?: string;
}

interface LeadMagnetConfig {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  fileName: string;
  color: string;
}

const leadMagnetConfigs: Record<LeadMagnetType, LeadMagnetConfig> = {
  'vvs-calculator': {
    title: 'Vector Visibility Score Calculator',
    description:
      'Calculate your AI search visibility score across 15+ dimensions. See exactly where you rank and what to fix.',
    icon: <Calculator className="w-5 h-5" />,
    badge: 'Free Tool',
    fileName: 'vvs-calculator.xlsx',
    color: 'accent',
  },
  'intent-mapping': {
    title: 'Hub-and-Spoke Intent Mapping Template',
    description:
      'The exact template we use to map content to user intent. Includes 50+ example mappings for AI/tech topics.',
    icon: <Map className="w-5 h-5" />,
    badge: 'Template',
    fileName: 'intent-mapping-template.xlsx',
    color: 'accent-secondary',
  },
  'cost-calculator': {
    title: 'True Cost Build Analysis',
    description:
      'See the real costs of building vs buying AI infrastructure. Calculator includes hidden costs most vendors hide.',
    icon: <DollarSign className="w-5 h-5" />,
    badge: 'Calculator',
    fileName: 'true-cost-analysis.xlsx',
    color: 'accent-tertiary',
  },
  'citation-checklist': {
    title: 'LLM Citation Tracking Checklist',
    description:
      'Ensure your content gets cited by AI systems. Technical checklist for structured data, entities, and sources.',
    icon: <ClipboardCheck className="w-5 h-5" />,
    badge: 'Checklist',
    fileName: 'citation-checklist.pdf',
    color: 'success',
  },
  'wrapper-detector': {
    title: 'AI Vendor Evaluation Scorecard',
    description:
      'Spot the difference between real AI and GPT wrappers. Scorecard with 25 evaluation criteria.',
    icon: <ShieldCheck className="w-5 h-5" />,
    badge: 'Scorecard',
    fileName: 'vendor-evaluation-scorecard.pdf',
    color: 'accent',
  },
};

/**
 * Lead magnet CTA with email capture modal
 */
export function LeadMagnetCTA({
  type,
  title,
  description,
  fileUrl,
  className,
  variant = 'card',
  onDownload,
  trackingId,
}: LeadMagnetCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const config = leadMagnetConfigs[type];
  const ctaId = trackingId || `lead-magnet-${type}`;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;

  const { trackLeadMagnetDownload, trackModalOpen, trackModalClose } =
    useCTATracking();

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    trackModalOpen({
      ctaType: 'lead-magnet',
      ctaId,
      context: { magnetType: type },
    });
  }, [ctaId, type, trackModalOpen]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    trackModalClose({
      ctaType: 'lead-magnet',
      ctaId,
      context: { magnetType: type },
    });
  }, [ctaId, type, trackModalClose]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email || !email.includes('@')) {
        return;
      }

      setStatus('loading');

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStatus('success');
        trackLeadMagnetDownload(
          {
            ctaType: 'lead-magnet',
            ctaId,
            context: { magnetType: type, email },
          },
          true
        );

        // Trigger download
        if (fileUrl) {
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = config.fileName;
          link.click();
        }

        onDownload?.();

        // Close modal after delay
        setTimeout(() => {
          closeModal();
          setStatus('idle');
          setEmail('');
        }, 2000);
      } catch {
        setStatus('idle');
        trackLeadMagnetDownload(
          {
            ctaType: 'lead-magnet',
            ctaId,
            context: { magnetType: type, error: true },
          },
          false
        );
      }
    },
    [email, ctaId, type, fileUrl, config.fileName, onDownload, closeModal, trackLeadMagnetDownload]
  );

  const renderCard = () => (
    <CTATracker
      ctaType="lead-magnet"
      ctaId={ctaId}
      context={{ magnetType: type, variant }}
      className={cn(className)}
    >
      <Card className="p-6 hover:border-accent/50 transition-colors">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
              config.color === 'accent' && 'bg-accent/10 text-accent',
              config.color === 'accent-secondary' &&
                'bg-accent-secondary/10 text-accent-secondary',
              config.color === 'accent-tertiary' &&
                'bg-accent-tertiary/10 text-accent-tertiary',
              config.color === 'success' && 'bg-success/10 text-success'
            )}
          >
            {config.icon}
          </div>
          <div className="flex-1 min-w-0">
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium mb-2',
                config.color === 'accent' && 'bg-accent/10 text-accent',
                config.color === 'accent-secondary' &&
                  'bg-accent-secondary/10 text-accent-secondary',
                config.color === 'accent-tertiary' &&
                  'bg-accent-tertiary/10 text-accent-tertiary',
                config.color === 'success' && 'bg-success/10 text-success'
              )}
            >
              <Sparkles className="w-3 h-3" />
              {config.badge}
            </span>
            <h4 className="font-semibold text-text-primary mb-1">
              {displayTitle}
            </h4>
            <p className="text-sm text-text-secondary mb-4">
              {displayDescription}
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={openModal}
              className="group"
            >
              <Download className="w-4 h-4" />
              Get Free Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Card>
    </CTATracker>
  );

  const renderInline = () => (
    <CTATracker
      ctaType="lead-magnet"
      ctaId={ctaId}
      context={{ magnetType: type, variant }}
      className={cn(className)}
    >
      <div className="flex items-center gap-4 p-4 bg-surface-glass border border-border-glass rounded-lg">
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
            config.color === 'accent' && 'bg-accent/10 text-accent',
            config.color === 'accent-secondary' &&
              'bg-accent-secondary/10 text-accent-secondary',
            config.color === 'accent-tertiary' &&
              'bg-accent-tertiary/10 text-accent-tertiary',
            config.color === 'success' && 'bg-success/10 text-success'
          )}
        >
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-text-primary text-sm">
            {displayTitle}
          </h4>
        </div>
        <Button variant="secondary" size="sm" onClick={openModal}>
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>
    </CTATracker>
  );

  const renderBanner = () => (
    <CTATracker
      ctaType="lead-magnet"
      ctaId={ctaId}
      context={{ magnetType: type, variant }}
      className={cn(className)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/20 p-6 md:p-8">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-8 h-8 text-accent" />
          </div>
          <div className="flex-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent/10 text-accent text-xs font-medium mb-2">
              <Sparkles className="w-3 h-3" />
              {config.badge}
            </span>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              {displayTitle}
            </h3>
            <p className="text-text-secondary">{displayDescription}</p>
          </div>
          <Button onClick={openModal} className="flex-shrink-0 group">
            <Download className="w-4 h-4" />
            Get Free Access
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </CTATracker>
  );

  const renderModal = () => (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
          >
            <Card className="w-full max-w-md pointer-events-auto relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-surface-elevated transition-colors text-text-tertiary"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pt-4">
                <div
                  className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4',
                    config.color === 'accent' && 'bg-accent/10 text-accent',
                    config.color === 'accent-secondary' &&
                      'bg-accent-secondary/10 text-accent-secondary',
                    config.color === 'accent-tertiary' &&
                      'bg-accent-tertiary/10 text-accent-tertiary',
                    config.color === 'success' && 'bg-success/10 text-success'
                  )}
                >
                  {config.icon}
                </div>

                <h3 className="text-xl font-bold text-text-primary text-center mb-2">
                  {status === 'success' ? 'Almost there!' : displayTitle}
                </h3>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-success" />
                    </div>
                    <p className="text-text-secondary mb-2">
                      Check your email for the download link.
                    </p>
                    <p className="text-sm text-text-tertiary">
                      (Don&apos;t forget to check spam!)
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-text-secondary text-center mb-6">
                      Enter your email to get instant access to this free
                      resource.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12"
                      />
                      <Button
                        type="submit"
                        disabled={status === 'loading'}
                        loading={status === 'loading'}
                        fullWidth
                        className="h-12"
                      >
                        {status === 'loading' ? (
                          'Sending...'
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Get Free Access
                          </>
                        )}
                      </Button>
                    </form>

                    <p className="text-xs text-text-tertiary text-center mt-4">
                      We respect your privacy. Unsubscribe anytime.
                    </p>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {variant === 'card' && renderCard()}
      {variant === 'inline' && renderInline()}
      {variant === 'banner' && renderBanner()}
      {renderModal()}
    </>
  );
}

export default LeadMagnetCTA;
