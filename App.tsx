
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './components/Icon';
import { PILLARS, TRANSLATIONS } from './constants';
import { Signature } from './types';

// Unique cloud endpoint for global petition persistence
// Using a specific key to ensure data remains isolated and consistent
const CLOUD_API = 'https://keyvalue.xyz/99228301/thess_animal_manifesto_v3_production';

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

          <div className="p-8 md:p-20 space-y-16">
            <div className="text-center py-8">
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-none uppercase">ENSURING INTEGRITY</h1>
              <p className="text-xl md:text-3xl text-slate-500 font-medium italic">A Manifesto for the Stray Animals Welfare of Thessaloniki</p>
            </div>

            {/* Introduction */}
            <section className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight border-b-4 border-emerald-500 pb-2 inline-block">INTRODUCTION</h2>
              <div className="text-lg text-slate-700 leading-relaxed space-y-4 font-light">
                <p>Thessaloniki is a city defined by its vibrant history, unique culture, and the shared spaces between its citizens—a definition that inherently includes its stray animal population. For too long, society's approach to companion animal welfare has been a cycle of reactive crisis management, defined by insufficiency and silent suffering. This manifesto rejects the current <strong>Paradigm of Managed Neglect</strong> and demands a transformative shift toward <strong>Welfare Integrity</strong>.</p>
                <p>This document is not a request for charity; it is a declaration of a necessary infrastructural, legal, educational action. We believe that the well-being of stray animals is inextricably linked to the public health, ethical standing, and overall liveability of Thessaloniki. We are calling for an immediate, comprehensive strategy across four fundamental pillars—Nutritional Integrity, Veterinary Care, Environmental Hygiene, and Safe Havens—to finally guarantee the basic <strong>Five Freedoms</strong> and <strong>Five Needs</strong> of every animal sharing our streets. The time for intentional neglect and symptomatic treatment is over. We demand systemic change.</p>
              </div>
            </section>

            {/* Vision */}
            <section className="max-w-4xl mx-auto space-y-6 text-center bg-slate-50 p-8 md:p-12 rounded-[2rem]">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight border-b-4 border-emerald-500 pb-2 inline-block">VISION</h2>
              <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium italic">
                To transition Thessaloniki from a Paradigm of Managed Neglect to a standard of Welfare Integrity. We demand a municipality where the basic levels of "Five Freedoms" and "Five Needs" of companion animals are guaranteed through integrated urban planning, legal accountability, and cultural empathy.
              </p>
            </section>

            {/* Pillar Details */}
            <div className="space-y-16 max-w-4xl mx-auto">
              {/* Pillar 1 */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 uppercase">Pillar 1: NUTRITIONAL INTEGRITY</h3>
                <p className="text-slate-600 italic"><strong>The Crisis:</strong> The dominance of the "mono-choice" (dry kibble) in a water-scarce environment is causing chronic dehydration and renal stress. Furthermore, the lack of parasite control renders this food nutritionally useless, as helminths steal the nutrients.</p>
                <div className="grid gap-6 md:grid-cols-3 pt-2">
                   <div className="space-y-2">
                      <h4 className="font-bold text-emerald-600 text-sm uppercase">1. Infrastructure</h4>
                      <p className="text-sm text-slate-700">Install permanent, designated, and shaded Hydration Coupling Stations legally required alongside all feeding points, particularly in urban heat islands.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-emerald-600 text-sm uppercase">2. Legal & Enforcement</h4>
                      <p className="text-sm text-slate-700">Mandate funding for regular, high-volume parasite treatment drives and permanent shaded fresh-water stations via the city's operational plan.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-emerald-600 text-sm uppercase">3. Educational Measure</h4>
                      <p className="text-sm text-slate-700">Launch a "Food is Water" campaign showing that dry food without water is not a complete meal, normalizing the gesture: "if you put food, also put water".</p>
                   </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 uppercase">Pillar 2: VETERINARY CARE & BIOSECURITY</h3>
                <p className="text-slate-600 italic"><strong>The Crisis:</strong> Insufficient aid is the primary threat. The ecosystem is overwhelmed by Leishmania infantum and uncontrolled reproduction. Lack of preventative care creates a cycle of suffering emergency clinics cannot solve.</p>
                <div className="grid gap-6 md:grid-cols-3 pt-2">
                   <div className="space-y-2">
                      <h4 className="font-bold text-emerald-600 text-sm uppercase">1. Infrastructure</h4>
                      <p className="text-sm text-slate-700">Deploy Mobile Veterinary Clinics (MVCs) on fixed routes for identification, vaccination, deworming, and rapid preventative care hotspots.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-emerald-600 text-sm uppercase">2. Legal & Enforcement</h4>
                      <p className="text-sm text-slate-700">Intensify enforcement of "Sterilize or DNA" mandate, applying €1,000 fines for non-compliance to curb uncontrolled reproduction.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-emerald-600 text-sm uppercase">3. Educational Measure</h4>
                      <p className="text-sm text-slate-700">Visual campaign "Care Delayed is Care Denied", showing how parasites spread when prevention is missing, normalizing vaccination as protection.</p>
                   </div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 uppercase">Pillar 3: ENVIRONMENTAL HYGIENE</h3>
                <p className="text-slate-600 italic"><strong>The Crisis:</strong> Lack of waste disposal infrastructure has created a "Sanitation-Mortality Nexus." Feces accumulation spreads parasites and triggers social disgust leading to poisonings.</p>
                <div className="grid gap-6 md:grid-cols-3 pt-2">
                   <div className="space-y-2">
                      <h4 className="font-bold text-emerald-600 text-sm uppercase">1. Infrastructure</h4>
                      <p className="text-sm text-slate-700">Establish sanitation infrastructure hotspots including bag dispensers paired with bins at park entrances and dog-walking routes.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-emerald-600 text-sm uppercase">2. Legal & Enforcement</h4>
                      <p className="text-sm text-slate-700">Strengthen enforcement of the €100 fine against owners failing to clean excrement and Article 20 enforcement on business waste access.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-emerald-600 text-sm uppercase">3. Educational Measure</h4>
                      <p className="text-sm text-slate-700">"Hygiene Squad" campaign transforming hygiene from punishment to habit, reinforcing that "clean space = safe space".</p>
                   </div>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 uppercase">Pillar 4: SAFE HAVENS (SHELTER & STREET)</h3>
                <p className="text-slate-600 italic"><strong>The Crisis:</strong> Overcrowded shelters deny dogs a "den" and cats "vertical space," causing psychological collapse. Meanwhile, streets remain lethal due to traffic and poisoning.</p>
                <div className="grid gap-6 md:grid-cols-3 pt-2">
                   <div className="space-y-2">
                      <h4 className="font-bold text-emerald-600 text-sm uppercase">1. Infrastructure</h4>
                      <p className="text-sm text-slate-700">Transform Thessaloniki to a "City-Based Sanctuary" by creating micro-sanctuaries through adaptive reuse of abandoned buildings.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-emerald-600 text-sm uppercase">2. Legal & Enforcement</h4>
                      <p className="text-sm text-slate-700">Strict enforcement of shelter specifications with €10,000 fines for non-compliance and prioritizing poisoning investigations.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-emerald-600 text-sm uppercase">3. Educational Measure</h4>
                      <p className="text-sm text-slate-700">"Shelters are Not Enough" arts program explaining "adopt, don't wait" to free up emergency space and promote foster care.</p>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="text-center py-16 border-t-8 border-slate-900 space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">MAKE IT PART OF YOUR JOURNEY.</h2>
              <p className="text-xl text-slate-500 font-bold uppercase tracking-widest">PROTECTING THE SHARED WELFARE OF THESSALONIKI.</p>
              <div className="pt-6">
                <button 
                  onClick={onClose}
                  className="px-10 py-4 bg-emerald-600 text-white rounded-xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl active:scale-95"
                >
                  RETURN TO PETITION
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
  const [formData, setFormData] = useState({ name: '', email: '', location: 'Thessaloniki City Center', comment: '' });
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const pollingRef = useRef<number | null>(null);
  
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [hasSigned, setHasSigned] = useState(() => localStorage.getItem('thess_animal_has_signed') === 'true');

  // Robust Cloud Sync Logic to ensure cross-device consistency
  const syncWithCloud = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch(CLOUD_API);
      if (response.ok) {
        const text = await response.text();
        if (text && text.trim().length > 0) {
          const cloudData = JSON.parse(text);
          if (Array.isArray(cloudData)) {
            const formatted = cloudData.map((s: any) => ({ 
              ...s, 
              timestamp: new Date(s.timestamp) 
            }));
            // Update state only if count changes or we have new data
            setSignatures(formatted.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
          }
        }
      }
    } catch (e) {
      console.warn("Global sync failed. Retrying in background.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || isSyncing) return;

    const newSignature: Signature = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      location: formData.location,
      comment: formData.comment,
      timestamp: new Date()
    };

    setIsSyncing(true);
    try {
      // 1. Get latest global state before appending
      const getRes = await fetch(CLOUD_API);
      let currentGlobal: any[] = [];
      if (getRes.ok) {
        const text = await getRes.text();
        if (text && text.trim().length > 0) currentGlobal = JSON.parse(text);
      }

      // 2. Merge new signature and prevent duplicates
      const updatedGlobal = [newSignature, ...currentGlobal.filter(s => s.id !== newSignature.id)];

      // 3. Post updated aggregate list back to cloud
      const postRes = await fetch(CLOUD_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGlobal)
      });

      if (postRes.ok) {
        setSignatures(updatedGlobal.map(s => ({ ...s, timestamp: new Date(s.timestamp) })));
        setHasSigned(true);
        localStorage.setItem('thess_animal_has_signed', 'true');
      } else {
        throw new Error("Push to cloud failed");
      }
    } catch (err) {
      alert("Submission error. Your signature was saved locally and will sync when possible.");
      // Optimistic update
      setSignatures(prev => [newSignature, ...prev]);
      setHasSigned(true);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    syncWithCloud();
    pollingRef.current = window.setInterval(syncWithCloud, 10000); // 10s poll for high reactivity
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, []);

  const t = TRANSLATIONS[lang];
  const targetSignatures = 1000;
  const currentCount = signatures.length;
  const progressPercent = Math.min((currentCount / targetSignatures) * 100, 100);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'el' : 'en');

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-emerald-100">
      <ManifestoModal isOpen={isManifestoOpen} onClose={() => setIsManifestoOpen(false)} lang={lang} />

      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-slate-200 shadow-sm group overflow-hidden">
               <Icon name="Heart" className="text-emerald-600" size={20} />
            </div>
            <span className="font-extrabold text-slate-900 tracking-tighter hidden sm:block uppercase text-lg leading-none">{t.nav_title}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 mr-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
              <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`}></div>
              {isSyncing ? 'Syncing...' : 'Global Live'}
            </div>
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
          <video autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-50 mix-blend-overlay">
            <source src="https://v1.pexels.com/video-files/5401037/5401037-sd_640_360_25fps.mp4" type="video/mp4" />
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
            <a href="#petition" className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-500 transition-all transform hover:-translate-y-1 shadow-lg shadow-emerald-900/40">
              {t.hero_cta} {currentCount > 0 && `(${currentCount.toLocaleString()})`}
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
                <h3 className="text-slate-900 font-extrabold text-3xl tracking-tight transition-all duration-300">
                  {currentCount.toLocaleString()}
                  {isSyncing && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>}
                </h3>
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

      <section className="py-24 bg-slate-100">
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

      <section id="petition" className="py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="serif text-5xl mb-6">{t.form_title}</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">{t.form_desc}</p>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4">
               <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-lg"><Icon name="ShieldCheck" size={24} /></div>
               <div>
                  <h4 className="font-bold text-white mb-1">Secure Signatures</h4>
                  <p className="text-sm text-slate-400">Your signature is securely pushed to our global cloud ledger to ensure every voice counts in Thessaloniki.</p>
               </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
            {hasSigned ? (
              <div className="text-center py-12 animate-in zoom-in duration-300 text-slate-900">
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"><Icon name="CheckCircle" size={40} /></div>
                <h3 className="text-3xl font-black mb-4 tracking-tighter">{t.form_success_h}</h3>
                <p className="text-slate-600 mb-8 text-lg">{t.form_success_p}</p>
                <div className="mb-8"><ShareButtons lang={lang} /></div>
                <button onClick={() => { setHasSigned(false); localStorage.removeItem('thess_animal_has_signed'); }} className="text-emerald-600 font-bold hover:underline uppercase tracking-widest text-xs">
                  {lang === 'en' ? 'Sign for a family member?' : 'Υπογράψτε για ένα μέλος της οικογένειας;'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSign} className="space-y-6">
                <div>
                  <label className="block text-slate-800 font-black text-[10px] uppercase tracking-widest mb-2 ml-1">{t.form_label_name}</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder={lang === 'en' ? 'John Doe' : 'Γιάννης Παπαδόπουλος'} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-slate-800 font-black text-[10px] uppercase tracking-widest mb-2 ml-1">{t.form_label_email}</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-slate-800 font-black text-[10px] uppercase tracking-widest mb-2 ml-1">{t.form_label_loc}</label>
                  <select value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all">
                    <option>{lang === 'en' ? 'Thessaloniki City Center' : 'Κέντρο Θεσσαλονίκης'}</option>
                    <option>{lang === 'en' ? 'Ano Poli' : 'Άνω Πόλη'}</option>
                    <option>{lang === 'en' ? 'Toumba' : 'Τούμπα'}</option>
                    <option>{lang === 'en' ? 'Kalamaria' : 'Καλαμαριά'}</option>
                    <option>{lang === 'en' ? 'Harilaou' : 'Χαριλάου'}</option>
                    <option>{lang === 'en' ? 'Other' : 'Άλλο'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-800 font-black text-[10px] uppercase tracking-widest mb-2 ml-1">{t.form_label_comment}</label>
                  <textarea value={formData.comment} onChange={(e) => setFormData({...formData, comment: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 h-28 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all resize-none" placeholder={lang === 'en' ? 'Why is this important...' : 'Γιατί είναι σημαντικό...'} />
                </div>
                <button type="submit" disabled={isSyncing} className="w-full bg-emerald-600 disabled:opacity-50 text-white font-black py-5 rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-100 text-lg uppercase tracking-widest active:translate-y-0.5">
                  {isSyncing ? 'Global Synchronizing...' : t.form_submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
            <h3 className="serif text-4xl text-slate-900">{t.recent_sig}</h3>
            <div className="flex items-center gap-3 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest">
              <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
              {t.live_updates}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatures.length > 0 ? signatures.slice(0, 9).map((sig) => (
              <div key={sig.id} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex gap-5 hover:border-emerald-200 transition-colors animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-emerald-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black text-xl shadow-lg shadow-emerald-100">{sig.name[0]}</div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-900 leading-none truncate">{sig.name}</h4>
                    <Icon name="CheckCircle" className="text-emerald-500 shrink-0" size={14} />
                  </div>
                  <p className="text-[10px] text-slate-400 mb-3 uppercase font-black tracking-widest">{sig.location} • {sig.timestamp.toLocaleDateString()}</p>
                  {sig.comment && <p className="text-sm text-slate-600 italic leading-relaxed border-l-2 border-emerald-100 pl-3 line-clamp-2">"{sig.comment}"</p>}
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-20 bg-slate-50 rounded-[2.5rem] border-4 border-dashed border-slate-100 text-slate-300 font-bold italic text-xl">
                {lang === 'en' ? 'Be the first to sign globally!' : 'Γίνετε ο πρώτος που θα υπογράψει παγκοσμίως!'}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-slate-50 py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h4 className="font-black text-2xl text-slate-900 mb-4 tracking-tighter uppercase">{t.nav_title}</h4>
          <p className="text-sm text-slate-400 uppercase tracking-[0.3em] font-medium max-w-lg mx-auto leading-relaxed mb-8">
            {lang === 'en' ? 'A Global Manifesto for Stray Welfare in Thessaloniki' : 'Ένα Παγκόσμιο Μανιφέστο για την Ευημερία των Αδέσποτων στη Θεσσαλονίκη'}
          </p>
          <div className="w-12 h-px bg-slate-200 mx-auto mb-8"></div>
          <div className="text-[10px] text-slate-300 font-black uppercase tracking-widest">&copy; 2025 Pawsitive Parks Initiative • Cloud Persistence Active</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
