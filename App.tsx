
import React, { useState } from 'react';
import { Icon } from './components/Icon';
import { PILLARS, TRANSLATIONS } from './constants';
import { Signature } from './types';

const SafeImage: React.FC<{ 
  src: string; 
  alt: string; 
  className?: string; 
  fallbackIcon?: string;
  initial?: string;
}> = ({ src, alt, className, fallbackIcon = 'Users', initial }) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-emerald-50 text-emerald-600 border border-emerald-100 ${className}`}>
        {initial ? <span className="font-bold text-xl">{initial}</span> : <Icon name={fallbackIcon} size={24} />}
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

const ShareButtons: React.FC<{ lang: 'en' | 'el' }> = ({ lang }) => {
  const shareUrl = window.location.href;
  const shareText = lang === 'el' 
    ? "Μόλις υπέγραψα το Μανιφέστο για την Ευημερία των Ζώων της Θεσσαλονίκης. Ελάτε μαζί μας! #Thessaloniki #AnimalWelfare"
    : "I just signed the Thessaloniki Animal Welfare Manifesto. Join us in protecting our city's strays! #Thessaloniki #AnimalWelfare";

  const shares = [
    { name: 'Facebook', icon: 'Facebook', color: 'bg-[#1877F2]', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { name: 'Instagram', icon: 'Instagram', color: 'bg-[#E4405F]', url: `https://www.instagram.com/` },
    { name: 'WhatsApp', icon: 'Send', color: 'bg-[#25D366]', url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}` },
    { name: 'Copy Link', icon: 'Share2', color: 'bg-slate-600', onClick: () => {
      navigator.clipboard.writeText(shareUrl);
      alert(lang === 'el' ? 'Ο σύνδεσμος αντιγράφηκε!' : 'Link copied to clipboard!');
    }}
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {shares.map((s) => (
        <button
          key={s.name}
          onClick={s.onClick || (() => window.open(s.url, '_blank'))}
          className={`${s.color} text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm hover:opacity-90 transition-opacity shadow-sm`}
        >
          <span className="shrink-0"><Icon name={s.icon} size={16} /></span>
          <span className="hidden sm:inline">{s.name}</span>
        </button>
      ))}
    </div>
  );
};

const PillarCard: React.FC<{ pillar: any; lang: 'en' | 'el' }> = ({ pillar, lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img 
          src={pillar.image} 
          alt={pillar.title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md">
          <Icon name={pillar.icon} className="text-emerald-600" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
          <h3 className="text-white text-xl font-bold leading-tight drop-shadow-sm">{pillar.title}</h3>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col space-y-4">
        <section>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1 block">{t.manifesto_crisis}</span>
          <p className="text-sm text-slate-600 italic leading-relaxed">{pillar.crisis}</p>
        </section>
        <div className="space-y-4 pt-2">
          <div className="flex gap-3">
            <div className="mt-1"><Icon name="Globe" className="text-emerald-500" size={16} /></div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase">{t.manifesto_infra}</h4>
              <p className="text-sm text-slate-600">{pillar.infrastructure}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-1"><Icon name="ShieldCheck" className="text-emerald-500" size={16} /></div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase">{t.manifesto_legal}</h4>
              <p className="text-sm text-slate-600">{pillar.legal}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-1"><Icon name="Users" className="text-emerald-500" size={16} /></div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase">{t.manifesto_edu}</h4>
              <p className="text-sm text-slate-600">{pillar.educational}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManifestoModal: React.FC<{ isOpen: boolean; onClose: () => void; lang: 'en' | 'el' }> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="min-h-screen py-8 px-4 md:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
          {/* Header & Close Button */}
          <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="ShieldCheck" className="text-emerald-600" />
              <span className="font-extrabold text-slate-900 tracking-tighter text-sm uppercase">Full Manifesto: Ensuring Integrity</span>
            </div>
            <button 
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95"
            >
              <Icon name="MessageSquare" size={16} className="rotate-45" />
              {lang === 'en' ? 'EXIT MANIFESTO' : 'ΕΞΟΔΟΣ'}
            </button>
          </div>

          <div className="p-10 md:p-24 space-y-32">
            {/* Page 1: Title */}
            <div className="text-center py-12">
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6 leading-none uppercase">ENSURING INTEGRITY</h1>
              <p className="text-2xl md:text-4xl text-slate-500 font-medium">A Manifesto for the Stray Animals Welfare of Thessaloniki</p>
            </div>

            {/* Page 2: Introduction */}
            <div className="max-w-4xl mx-auto space-y-10">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight border-b-4 border-emerald-500 pb-4 inline-block">Introduction</h2>
              <div className="text-xl text-slate-700 leading-relaxed space-y-6 font-light">
                <p>Thessaloniki is a city defined by its vibrant history, unique culture, and the shared spaces between its citizens—a definition that inherently includes its stray animal population. For too long, society's approach to companion animal welfare has been a cycle of reactive crisis management, defined by insufficiency and silent suffering. This manifesto rejects the current <strong>Paradigm of Managed Neglect</strong> and demands a transformative shift toward <strong>Welfare Integrity</strong>.</p>
                <p>This document is not a request for charity; it is a declaration of a necessary infrastructural, legal, educational action. We believe that the well-being of stray animals is inextricably linked to the public health, ethical standing, and overall liveability of Thessaloniki. We are calling for an immediate, comprehensive strategy across four fundamental pillars—Nutritional Integrity, Veterinary Care, Environmental Hygiene, and Safe Havens—to finally guarantee the basic <strong>Five Freedoms</strong> and <strong>Five Needs</strong> of every animal sharing our streets. The time for intentional neglect and symptomatic treatment is over. We demand systemic change.</p>
              </div>
            </div>

            {/* Page 3: Vision */}
            <div className="max-w-4xl mx-auto space-y-10 text-center">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight border-b-4 border-emerald-500 pb-4 inline-block">Vision</h2>
              <p className="text-2xl md:text-3xl text-slate-800 leading-relaxed font-medium italic">
                To transition Thessaloniki from a Paradigm of Managed Neglect to a standard of Welfare Integrity. We demand a municipality where the basic levels of "Five Freedoms" and "Five Needs" of companion animals are guaranteed through integrated urban planning, legal accountability, and cultural empathy.
              </p>
            </div>

            {/* Page 4 & 5: Overview Table */}
            <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-4">Overview</h2>
                <h3 className="text-2xl font-bold text-emerald-600">Addressing the Paradigm of Managed Neglect</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
                {/* Pillar 1 Summary */}
                <div className="bg-white p-10 space-y-6">
                  <h4 className="text-emerald-600 font-black uppercase tracking-widest text-sm">Nutrition</h4>
                  <h5 className="text-2xl font-black text-slate-900">Combating the "Thirsty Bowl" Crisis.</h5>
                  <p className="text-slate-600 leading-relaxed">Moving beyond the dangerous "mono-choice" of dry kibble in a water-scarce climate. We call for <strong>"Hydration Coupling"</strong>—mandating water access alongside food—and stricter safety limits on food toxins to prevent chronic renal failure.</p>
                </div>
                {/* Pillar 2 Summary */}
                <div className="bg-white p-10 space-y-6">
                  <h4 className="text-blue-600 font-black uppercase tracking-widest text-sm">Veterinary Care</h4>
                  <h5 className="text-2xl font-black text-slate-900">From Reaction to Prevention.</h5>
                  <p className="text-slate-600 leading-relaxed">Addressing the "insufficiency of aid" that leaves thousands vulnerable to endemic disease. We propose <strong>Bio-Security Reservoirs</strong> and <strong>Mobile Veterinary Clinics</strong> to treat strays as a population in need of preventative immunity, not just emergency trauma care.</p>
                </div>
                {/* Pillar 3 Summary */}
                <div className="bg-white p-10 space-y-6">
                  <h4 className="text-amber-600 font-black uppercase tracking-widest text-sm">Hygiène</h4>
                  <h5 className="text-2xl font-black text-slate-900">Breaking the Sanitation-Mortality Nexus.</h5>
                  <p className="text-slate-600 leading-relaxed">Waste accumulation is not just a nuisance; it is a lethal trigger for poisoning and disease. We demand <strong>Waste Infrastructure Network for Animals</strong> to clean the streets, thereby removing the social justification for "cleansing" operations.</p>
                </div>
                {/* Pillar 4 Summary */}
                <div className="bg-white p-10 space-y-6">
                  <h4 className="text-rose-600 font-black uppercase tracking-widest text-sm">Safe Havens</h4>
                  <h5 className="text-2xl font-black text-slate-900">Redefining Sanctuary.</h5>
                  <p className="text-slate-600 leading-relaxed">Transforming shelters from "warehouses" into true havens. We call for the <strong>City as a Sanctuary</strong> model to ensure harmonious coexistence between human-animals.</p>
                </div>
              </div>
            </div>

            {/* Page 6: Pillar 1 Detailed */}
            <div className="space-y-12">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase border-l-8 border-emerald-500 pl-8">Pillar 1: Nutritional Integrity</h2>
              <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                <p className="text-lg font-bold text-emerald-900 italic"><strong>The Crisis:</strong> The dominance of the "mono-choice" (dry kibble) in a water-scarce environment is causing chronic dehydration and renal stress. Furthermore, the lack of parasite control renders this food nutritionally useless, as helminths steal the nutrients.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-emerald-700 uppercase tracking-widest">1. Infrastructure</h4>
                  <p className="text-slate-600">Install permanent, designated, and shaded Hydration Coupling Stations that are legally required to be maintained alongside all stray feeding points. Use self-refilling or gravity systems.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-emerald-700 uppercase tracking-widest">2. Legal & Enforcement</h4>
                  <p className="text-slate-600">Mandate Thessaloniki's operational plan (Article 10) to fund regular parasite treatment drives. Educate against feeding inappropriate foods like bread/pasta (Article 31).</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-emerald-700 uppercase tracking-widest">3. Educational Measure</h4>
                  <p className="text-slate-600">Launch a "Food is Water" mural campaign showing that "dry food without water is not a complete meal". Normalize the gesture: "if you put food, also put water."</p>
                </div>
              </div>
            </div>

            {/* Page 7: Pillar 2 Detailed */}
            <div className="space-y-12">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase border-l-8 border-blue-500 pl-8">Pillar 2: Veterinary Care & Biosecurity</h2>
              <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                <p className="text-lg font-bold text-blue-900 italic"><strong>The Crisis:</strong> Insufficient aid is the primary threat. The ecosystem is overwhelmed by Leishmania infantum and uncontrolled reproduction. The lack of preventative care creates a cycle of suffering.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-blue-700 uppercase tracking-widest">1. Infrastructure</h4>
                  <p className="text-slate-600">Develop and deploy Mobile Veterinary Clinics (MVCs) on fixed routes targeting hotspots. Provide vaccination, deworming, and rapid preventative care directly to the animals.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-blue-700 uppercase tracking-widest">2. Legal & Enforcement</h4>
                  <p className="text-slate-600">Intensify "Sterilize or DNA" mandate (Article 9) with fines. Use Argos funding (Article 11) for continuous care, testing, and treating endemic diseases like Leishmania.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-blue-700 uppercase tracking-widest">3. Educational Measure</h4>
                  <p className="text-slate-600">Create the "Care Delayed is Care Denied" campaign. Use street art to show how untreated wounds worsen and normalize vaccination as protection, not luxury.</p>
                </div>
              </div>
            </div>

            {/* Page 8: Pillar 3 Detailed */}
            <div className="space-y-12">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase border-l-8 border-amber-500 pl-8">Pillar 3: Environmental Hygiene</h2>
              <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
                <p className="text-lg font-bold text-amber-900 italic"><strong>The Crisis:</strong> The lack of waste disposal infrastructure has created a "Sanitation-Mortality Nexus." The accumulation of feces creates "Dirty Dog Syndrome" and triggers social disgust leading to poisonings.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-amber-700 uppercase tracking-widest">1. Infrastructure</h4>
                  <p className="text-slate-600">Establish a dense network of sanitation hotspots (bag dispensers + bins) across parks and high-footfall zones to make waste collection effortless for owners.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-amber-700 uppercase tracking-widest">2. Legal & Enforcement</h4>
                  <p className="text-slate-600">Strengthen enforcement of the €100 administrative fine for failure to clean excrement (Article 35). Compel businesses to prevent strays from accessing waste.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-amber-700 uppercase tracking-widest">3. Educational Measure</h4>
                  <p className="text-slate-600">Develop a "Hygiene Squad" campaign to transform hygiene from a punishment into a habit. Reinforce the message that "clean space = safe space."</p>
                </div>
              </div>
            </div>

            {/* Page 9: Pillar 4 Detailed */}
            <div className="space-y-12">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase border-l-8 border-rose-500 pl-8">Pillar 4: Safe Havens (Shelter & Street)</h2>
              <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100">
                <p className="text-lg font-bold text-rose-900 italic"><strong>The Crisis:</strong> The shelter system faces a "Quantity vs. Quality" paradox. Overcrowded shelters cause psychological collapse, while streets remain lethal due to traffic and poisoning.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-rose-700 uppercase tracking-widest">1. Infrastructure</h4>
                  <p className="text-slate-600">Implement "City-Based Sanctuary" strategy by creating micro-sanctuaries through adaptive reuse of abandoned lots, providing quiet and safe refuge zones.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-rose-700 uppercase tracking-widest">2. Legal & Enforcement</h4>
                  <p className="text-slate-600">Enforce shelter specifications (Articles 28/29) with €10,000 fines for overcrowding. Prioritize poisoning investigations and adhere to reintroduction prohibitions.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-rose-700 uppercase tracking-widest">3. Educational Measure</h4>
                  <p className="text-slate-600">Implement "Shelters are Not Enough" arts program. Promote foster care with "adopt, don't wait" graphics explaining that prevention is kinder than confinement.</p>
                </div>
              </div>
            </div>

            {/* Page 10: Closing */}
            <div className="text-center py-20 border-t-8 border-slate-900 space-y-8">
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">MAKE IT PART OF YOUR JOURNEY.</h2>
              <p className="text-2xl text-slate-500 font-bold uppercase tracking-widest">PROTECTING THE SHARED WELFARE OF THESSALONIKI.</p>
              <div className="pt-10">
                <button 
                  onClick={onClose}
                  className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-slate-800 transition-all shadow-2xl active:scale-95"
                >
                  RETURN TO PETITION & SIGN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'el'>('en');
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', location: 'Thessaloniki City Center', comment: '' });
  const [hasSigned, setHasSigned] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  
  const t = TRANSLATIONS[lang];
  const targetSignatures = 1000;
  const currentSignaturesCount = signatures.length;
  const progressPercent = Math.min((currentSignaturesCount / targetSignatures) * 100, 100);

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newSignature: Signature = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      location: formData.location,
      comment: formData.comment,
      timestamp: new Date()
    };

    setSignatures([newSignature, ...signatures]);
    setHasSigned(true);
  };

  const toggleLang = () => setLang(prev => prev === 'en' ? 'el' : 'en');

  const handleJoinClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const petitionSection = document.getElementById('petition');
    if (petitionSection) {
      petitionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-emerald-100">
      <ManifestoModal isOpen={isManifestoOpen} onClose={() => setIsManifestoOpen(false)} lang={lang} />

      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 relative overflow-hidden flex items-center justify-center bg-white rounded-full border border-slate-200 shadow-sm group">
              <SafeImage src="logo.png" alt="Logo" className="w-full h-full object-cover scale-[1.3] group-hover:scale-[1.4] transition-transform duration-300" fallbackIcon="Heart" />
            </div>
            <span className="font-extrabold text-slate-900 tracking-tighter hidden sm:block uppercase text-lg leading-none">{t.nav_title}</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleLang} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Icon name="Globe" size={16} />
              {lang === 'en' ? 'Ελληνικά' : 'English'}
            </button>
            <a href="mailto:esai@esai.gr" className="bg-emerald-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-emerald-700 transition-all shadow-md active:scale-95">{t.contact_btn}</a>
          </div>
        </div>
      </nav>

      <header className="relative bg-slate-900 overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            poster="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          >
            <source src="https://v1.pexels.com/video-files/5401037/5401037-sd_640_360_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Icon name="AlertCircle" size={14} />{t.hero_badge}
          </div>
          <h1 className="serif text-5xl lg:text-7xl text-white mb-6 leading-tight">{t.hero_title} <br/><span className="text-emerald-400">{lang === 'en' ? 'Thessaloniki' : 'Θεσσαλονίκης'}</span></h1>
          <p className="text-slate-300 text-lg lg:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light italic">"{t.hero_desc}"</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#petition" onClick={handleJoinClick} className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-500 transition-all transform hover:-translate-y-1 shadow-lg shadow-emerald-900/40">
              {t.hero_cta} {currentSignaturesCount > 0 && `(${currentSignaturesCount.toLocaleString()})`}
            </a>
            <button onClick={() => setIsManifestoOpen(true)} className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
              {t.hero_read}
            </button>
          </div>
        </div>
      </header>

      <section className="relative -mt-12 z-20 px-4 mb-12">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Icon name="Heart" className="text-rose-500 fill-rose-500" size={20} />
                <h3 className="text-slate-900 font-extrabold text-3xl tracking-tight">{currentSignaturesCount.toLocaleString()}</h3>
              </div>
              <p className="text-slate-500 text-sm font-medium">{t.stats_signed} <span className="text-slate-900 font-bold">{targetSignatures.toLocaleString()}</span>.</p>
            </div>
            <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
              <span className="text-emerald-700 font-black text-2xl">{Math.floor(progressPercent)}%</span>
              <span className="text-emerald-600 text-xs uppercase font-bold tracking-widest ml-2">{t.stats_reached}</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden mb-8 border-4 border-slate-50">
            <div className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 transition-all duration-1000 ease-out relative" style={{ width: `${progressPercent}%` }}>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-stripe_1s_linear_infinite]"></div>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-100">
            <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t.stats_share}</p>
            <ShareButtons lang={lang} />
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="pillars" className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif text-4xl text-slate-900 mb-4">{t.pillars_title}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">{t.pillars_desc}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PILLARS[lang].map((pillar) => (
              <PillarCard key={`${pillar.id}-${pillar.title}`} pillar={pillar} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* About Organizers Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h2 className="serif text-4xl text-slate-900 mb-8">{t.about_title}</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg max-w-3xl mx-auto">
              <p>{t.about_p1}</p>
              <p>{t.about_p2}</p>
              <p>{t.about_p3}</p>
            </div>
            <div className="mt-12 inline-flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
               <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-200">
                  <Icon name="ShieldCheck" size={28} />
               </div>
               <p className="text-emerald-900 font-extrabold text-xl tracking-tight leading-tight uppercase">
                 {t.about_footer}
               </p>
            </div>
          </div>
        </div>
      </section>

      <section id="petition" className="py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-16">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-600"></div>
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="serif text-5xl mb-6">{t.form_title}</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">{t.form_desc}</p>
          </div>
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            {hasSigned ? (
              <div className="text-center py-12 animate-in zoom-in duration-300 text-slate-900">
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"><Icon name="CheckCircle" size={40} /></div>
                <h3 className="text-2xl font-bold mb-4">{t.form_success_h}</h3>
                <p className="text-slate-600 mb-8">{t.form_success_p}</p>
                <div className="mb-8"><ShareButtons lang={lang} /></div>
                <button onClick={() => setHasSigned(false)} className="text-emerald-600 font-semibold hover:underline">
                  {lang === 'en' ? 'Sign another for a family member?' : 'Υπογράψτε ξανά για ένα μέλος της οικογένειας;'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSign} className="space-y-5">
                <div>
                  <label className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wider">{t.form_label_name}</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder={lang === 'en' ? 'John Doe' : 'Γιάννης Παπαδόπουλος'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wider">{t.form_label_email}</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wider">{t.form_label_loc}</label>
                  <select value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                    <option>{lang === 'en' ? 'Thessaloniki City Center' : 'Κέντρο Θεσσαλονίκης'}</option>
                    <option>{lang === 'en' ? 'Ano Poli' : 'Άνω Πόλη'}</option>
                    <option>{lang === 'en' ? 'Toumba' : 'Τούμπα'}</option>
                    <option>{lang === 'en' ? 'Kalamaria' : 'Καλαμαριά'}</option>
                    <option>{lang === 'en' ? 'Harilaou' : 'Χαριλάου'}</option>
                    <option>{lang === 'en' ? 'Other' : 'Άλλο'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wider">{t.form_label_comment}</label>
                  <textarea value={formData.comment} onChange={(e) => setFormData({...formData, comment: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 h-24 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder={lang === 'en' ? 'Share your thoughts...' : 'Μοιραστείτε τις σκέψεις σας...'} />
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200 text-lg active:translate-y-0.5">{t.form_submit}</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h3 className="serif text-3xl text-slate-900">{t.recent_sig}</h3>
            <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              {t.live_updates}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatures.length > 0 ? signatures.map((sig) => (
              <div key={sig.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4 animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">
                  {sig.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{sig.name}</h4>
                  <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">{sig.location} • {lang === 'en' ? 'Just now' : 'Μόλις τώρα'}</p>
                  {sig.comment && <p className="text-sm text-slate-600 italic">"{sig.comment}"</p>}
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-slate-400 font-medium italic">
                {lang === 'en' ? 'Be the first to sign!' : 'Γίνετε ο πρώτος που θα υπογράψει!'}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg text-slate-900 mb-2">{t.nav_title}</h4>
            <p className="text-sm text-slate-500 uppercase tracking-widest">{lang === 'en' ? 'A Manifesto for Stray Welfare in Thessaloniki' : 'Ένα Μανιφέστο για την Ευημερία των Αδέσποτων στη Θεσσαλονίκη'}</p>
          </div>
          <div className="text-sm text-slate-400">&copy; 2025 Pawsitive Parks Initiative.</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
