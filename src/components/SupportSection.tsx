import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  HelpCircle, 
  PhoneCall, 
  Search, 
  MessageSquarePlus, 
  MapPin, 
  FileQuestion, 
  ChevronDown, 
  ChevronUp,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  ExternalLink,
  ShieldCheck,
  Info
} from 'lucide-react';

interface SupportSectionProps {
  onOpenFeedback: () => void;
  onOpenStatusTracker: () => void;
}

export const SupportSection: React.FC<SupportSectionProps> = ({
  onOpenFeedback,
  onOpenStatusTracker,
}) => {
  const { t } = useLanguage();

  // FAQ Search & Filter
  const [faqSearch, setFaqSearch] = useState('');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // CSC Locator
  const [pinCodeInput, setPinCodeInput] = useState('110001');
  const [locatedCenters, setLocatedCenters] = useState([
    { name: 'Jan Seva Digital CSC Center #101', address: 'Plot 4, District Center, Janakpuri, New Delhi - 110058', contact: 'Rakesh Sharma (VLE)', phone: '+91 98765 43210', hours: '9:00 AM - 6:00 PM (Mon-Sat)' },
    { name: 'Jan Seva Kendra Secretariat Branch', address: 'Block B, Civil Lines, Central Delhi - 110054', contact: 'Sunita Verma (Operator)', phone: '+91 98112 34567', hours: '9:30 AM - 5:30 PM (Mon-Sat)' }
  ]);

  // Support Ticket Form
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketPhone, setTicketPhone] = useState('');
  const [ticketCategory, setTicketCategory] = useState('DBT Bank Account Linking Issue');
  const [ticketTrackingCode, setTicketTrackingCode] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketLoading, setTicketLoading] = useState(false);
  const [createdTicketCode, setCreatedTicketCode] = useState<string | null>(null);
  const [ticketError, setTicketError] = useState('');

  const officialHelplines = [
    {
      title: 'General Public Welfare Helpline',
      number: '1800-11-1555',
      dept: 'Central Public Grievance Directorate',
      desc: '24x7 Assistance in English, Hindi & Regional Languages'
    },
    {
      title: 'PM-KISAN Farmers Helpline',
      number: '155261 / 1800-11-5526',
      dept: 'Ministry of Agriculture & Farmers Welfare',
      desc: 'Farmers Land Seeding, eKYC & Direct Installment Credit'
    },
    {
      title: 'Ayushman Bharat PM-JAY Health',
      number: '14555 / 1800-11-14555',
      dept: 'National Health Authority (NHA)',
      desc: 'Hospitalization & Golden Card Verification'
    },
    {
      title: 'Senior Citizens Elderline',
      number: '14567',
      dept: 'Ministry of Social Justice & Empowerment',
      desc: 'Pension, Health & Legal Assistance for Senior Citizens'
    },
    {
      title: 'Women National Helpline',
      number: '181 / 1091',
      dept: 'Ministry of Women and Child Development',
      desc: '24x7 Emergency Support & Guidance for Women in Distress'
    },
    {
      title: 'PM Awas Housing Subsidy Helpline',
      number: '1800-11-3377',
      dept: 'Ministry of Housing and Urban Affairs',
      desc: 'Urban & Rural Housing Interest Subsidy Queries'
    }
  ];

  const faqs = [
    {
      category: 'Eligibility & Matching',
      q: 'How do I know which government schemes I am eligible for?',
      a: 'Use our interactive "Check Eligibility" tool in the top navigation bar. Enter your age, gender, occupation, annual income, and state to instantly view matched schemes.',
    },
    {
      category: 'DBT & Bank Linking',
      q: 'What is Direct Benefit Transfer (DBT) and why is Aadhaar seeding required?',
      a: 'Direct Benefit Transfer (DBT) transfers government subsidies, pensions, and financial aid directly into your Aadhaar-linked bank account without any intermediaries. Ensure your bank account has Aadhaar NPCI seeding enabled at your bank branch.',
    },
    {
      category: 'Eligibility & Matching',
      q: 'Are there any registration fees or charges to apply for welfare schemes?',
      a: 'No! All government welfare applications submitted through official portals or CSC centers are 100% free of charge. Never pay any fee or bribe to middlemen.',
    },
    {
      category: 'Documents & Verification',
      q: 'Which documents are required for scheme application?',
      a: 'Standard required documents include your Aadhaar Card, active bank account passbook with IFSC code, Domicile/Residence proof, Income Certificate, and active mobile number.',
    },
    {
      category: 'Documents & Verification',
      q: 'How can I download official scheme guidelines offline?',
      a: 'Click "View Details" on any scheme card, navigate to the downloads section, and click "Download as PDF" or "Download JSON" to save a structured summary copy.',
    },
    {
      category: 'Grievance & Issues',
      q: 'My DBT payment was sanctioned but not credited to my account. What should I do?',
      a: 'Check if your bank account is active and linked with Aadhaar NPCI mapping. You can also submit an official Grievance Ticket using the form below or call the official government helpline.',
    },
    {
      category: 'Grievance & Issues',
      q: 'How do I track my submitted application?',
      a: 'Click "Track Application" in the top bar and enter your unique SCH tracking code (e.g., SCH-2025-XXXXXX) to view real-time verification and disbursement progress.',
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedFaqCategory !== 'All' && faq.category !== selectedFaqCategory) return false;
    if (faqSearch && !faq.q.toLowerCase().includes(faqSearch.toLowerCase()) && !faq.a.toLowerCase().includes(faqSearch.toLowerCase())) return false;
    return true;
  });

  const handleCscSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinCodeInput.trim()) return;
    setLocatedCenters([
      {
        name: `CSC Digital Seva Kendra (PIN: ${pinCodeInput})`,
        address: `Main Market Road, Near Government School, District Headquarters - ${pinCodeInput}`,
        contact: 'Vikram Singh (Village Level Entrepreneur)',
        phone: '+91 98989 12345',
        hours: '9:00 AM - 6:30 PM (Mon-Sat)'
      },
      {
        name: `Gram Panchayat E-Seva Center (PIN: ${pinCodeInput})`,
        address: `Block Administrative Complex, Tehsil Road - ${pinCodeInput}`,
        contact: 'Anita Devi (Nodal Officer)',
        phone: '+91 97123 45678',
        hours: '10:00 AM - 5:00 PM (Mon-Fri)'
      }
    ]);
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketDescription) {
      setTicketError('Please provide your name and a description of your issue.');
      return;
    }

    setTicketLoading(true);
    setTicketError('');

    try {
      const ticketCode = `TKT-2025-${Math.floor(100000 + Math.random() * 900000)}`;
      setCreatedTicketCode(ticketCode);
    } catch (err: any) {
      setTicketError('Error logging support ticket.');
    } finally {
      setTicketLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/30 text-emerald-200 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
            24x7 Citizen Support & Official Helplines Directory
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            National Public Welfare Support & Helpdesk
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6">
            Access official government helpline phone numbers, search frequently asked questions, locate nearby Common Service Centers (CSC), or log a support inquiry.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenStatusTracker}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Search className="w-4 h-4 text-slate-950" />
              <span>Track Existing Application</span>
            </button>
            <button
              onClick={onOpenFeedback}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-300" />
              <span>Submit Portal Feedback</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Government Helplines Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Official Government Helplines Directory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Direct emergency and department contact numbers for official Ministries
            </p>
          </div>
          <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            Directory Listing
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {officialHelplines.map((hp, i) => (
            <div key={i} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{hp.dept}</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{hp.title}</h4>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono my-1 tracking-wider">
                  {hp.number}
                </div>
                {/* User Requested Disclaimer */}
                <p className="text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 p-1.5 rounded-lg border border-amber-200 dark:border-amber-800/60 my-1">
                  (Official government helpline — not operated by this platform)
                </p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2">
                {hp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section with Live Search & Tabs */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FileQuestion className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Frequently Asked Questions (FAQs)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Search or browse by category</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search FAQ answers..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {['All', 'Eligibility & Matching', 'DBT & Bank Linking', 'Documents & Verification', 'Grievance & Issues'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFaqCategory(cat)}
              className={`px-3 py-1.5 rounded-xl border font-semibold transition-all ${
                selectedFaqCategory === cat
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredFaqs.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No FAQ results found for "{faqSearch}". Try searching other keywords or view official helplines above.
            </div>
          ) : (
            filteredFaqs.map((faq, i) => (
              <div key={i} className="py-4">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                      {faq.category}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  {openFaqIndex === i ? (
                    <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  )}
                </button>

                {openFaqIndex === i && (
                  <div className="mt-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* CSC Locator Section */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Locate Nearby Common Service Center (CSC / Jan Seva Kendra)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Find physical assisted application kiosks near your village or town
            </p>
          </div>

          <form onSubmit={handleCscSearch} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={pinCodeInput}
              onChange={(e) => setPinCodeInput(e.target.value)}
              placeholder="Enter PIN Code..."
              className="p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono w-36"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shrink-0"
            >
              Locate CSCs
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {locatedCenters.map((center, i) => (
            <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{center.name}</h4>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">Verified CSC</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">{center.address}</p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-wrap justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Contact: <strong>{center.contact}</strong></span>
                <span>Phone: <strong className="text-emerald-600">{center.phone}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Grievance / Support Ticket Form */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquarePlus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Submit Portal Inquiry or Grievance Ticket
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Log an inquiry with our platform support team. A unique Ticket ID will be generated.
          </p>
        </div>

        {createdTicketCode ? (
          <div className="p-8 text-center space-y-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Support Ticket Created Successfully!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Your inquiry has been logged into the Action Queue.
            </p>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-300 dark:border-emerald-800 inline-block">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Your Ticket Tracking Reference ID</span>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-wider">
                {createdTicketCode}
              </div>
            </div>

            <button
              onClick={() => {
                setCreatedTicketCode(null);
                setTicketDescription('');
              }}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
            >
              Submit Another Ticket
            </button>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-4">
            {ticketError && (
              <div className="p-3 bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{ticketError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Applicant Name *
                </label>
                <input
                  type="text"
                  required
                  value={ticketName}
                  onChange={(e) => setTicketName(e.target.value)}
                  placeholder="e.g. Anish Sharma"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={ticketPhone}
                  onChange={(e) => setTicketPhone(e.target.value)}
                  placeholder="10 digit mobile"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={ticketEmail}
                  onChange={(e) => setTicketEmail(e.target.value)}
                  placeholder="anish@example.com"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Query Category
                </label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="DBT Bank Account Linking Issue">DBT Bank Account / Aadhaar Seeding Issue</option>
                  <option value="Application Sanction Delay">Application Sanction Delay</option>
                  <option value="Eligibility Query">Eligibility Criteria Clarification</option>
                  <option value="CSC Kiosk Complaint">CSC / Agent Kiosk Complaint</option>
                  <option value="Technical Website Glitch">Technical Website / Portal Bug</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Application SCH Tracking Code (If Applicable)
                </label>
                <input
                  type="text"
                  value={ticketTrackingCode}
                  onChange={(e) => setTicketTrackingCode(e.target.value)}
                  placeholder="e.g. SCH-2025-XXXXXX"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Detailed Issue Description *
              </label>
              <textarea
                rows={4}
                required
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                placeholder="Describe your issue or query in detail..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={ticketLoading}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50"
              >
                {ticketLoading ? 'Logging Ticket...' : 'Log Support Ticket'}
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
