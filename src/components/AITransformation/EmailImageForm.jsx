import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { sendTransformationEmail, isValidEmail, checkEmailJSConfig } from '../../services/emailService';

export default function EmailImageForm({
  imageUrl,
  categoryTitle = 'Balcony Garden Transformation',
  onClose = null
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const configStatus = checkEmailJSConfig();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    if (!imageUrl) {
      setErrorMessage('No generated transformation found to send.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await sendTransformationEmail({
        email,
        name,
        imageUrl,
        categoryTitle
      });

      setStatus('sent');
      setSuccessMessage(result.message || 'Transformation sent successfully! Check your inbox.');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to dispatch email. Please try again.');
    }
  };

  return (
    <div className="card-light p-6 md:p-8 bg-cream-card border border-forest/20 relative overflow-hidden">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-bl-full pointer-events-none" />

      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest">
          <Mail className="w-4 h-4" />
        </div>
        <h4 className="font-heading font-bold text-lg text-ink">
          Receive High-Resolution Transformation
        </h4>
      </div>

      <p className="font-body text-ash text-xs leading-relaxed mb-5 max-w-lg">
        Enter your email address to receive your bespoke <strong className="text-forest">{categoryTitle}</strong> visualization directly to your inbox as an architectural attachment.
      </p>

      {/* Configuration Warning if EmailJS is not configured */}
      {!configStatus.configured && (
        <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-body flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">EmailJS setup notice:</span> Set your <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">VITE_EMAILJS_SERVICE_ID</code>, <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">VITE_EMAILJS_TEMPLATE_ID</code>, and <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">VITE_EMAILJS_PUBLIC_KEY</code> in environment variables to enable live delivery.
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="recipient-name" className="block font-ui text-[10px] tracking-wider uppercase text-ash font-medium mb-1">
              Your Name (Optional)
            </label>
            <input
              id="recipient-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Rajesh Sharma"
              disabled={status === 'sending' || status === 'sent'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-white text-xs font-body text-ink placeholder:text-ash/50 focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="recipient-email" className="block font-ui text-[10px] tracking-wider uppercase text-ink font-semibold mb-1">
              Email Address <span className="text-forest">*</span>
            </label>
            <input
              id="recipient-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="e.g., yourname@domain.com"
              disabled={status === 'sending' || status === 'sent'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-white text-xs font-body text-ink placeholder:text-ash/50 focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Feedback states */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-body flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {status === 'sent' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-forest/10 border border-forest/30 text-forest-dark text-xs font-body flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-heading font-bold text-sm text-forest mb-0.5">
                  Visualization Dispatched!
                </div>
                <div>{successMessage}</div>
                <div className="font-ui text-[10px] text-ash mt-2">
                  Need a bespoke architectural quote or free site visit? WhatsApp us directly at +91 88881 59579.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="font-ui text-xs text-ash hover:text-ink underline transition-colors"
            >
              Close
            </button>
          )}

          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent' || !email.trim()}
            className={`btn-green !py-3 !px-6 text-xs inline-flex items-center gap-2 ml-auto ${
              status === 'sending' ? 'opacity-75 cursor-wait' : ''
            }`}
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Optimizing & Dispatching Attachment...</span>
              </>
            ) : status === 'sent' ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Sent to Email</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send My Transformation</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
