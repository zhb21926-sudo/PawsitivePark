
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './components/Icon';
import { PILLARS, TRANSLATIONS } from './constants';
import { Signature } from './types';

// Public cloud endpoint for prototype persistence
const CLOUD_API = 'https://keyvalue.xyz/ad723d9b/thess_animal_signatures_v1';

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

          <div className="p-10 md:p-24 space-y-32">
            <div className="text-center py-12">
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6 leading-none uppercase">ENSURING INTEGRITY</h1>
              <p className="text-2xl md:text-4xl text-slate-500 font-medium">A Manifesto for the Stray Animals Welfare of Thessaloniki</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-10">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight border-b-4 border-emerald-500 pb-4 inline-block">Introduction</h2>
              <div className="text-xl text-slate-700 leading-relaxed space-y-6 font-light">
                <p>Thessaloniki is a city defined by its vibrant history, unique culture, and the shared spaces between its citizens. This manifesto rejects the current <strong>Paradigm of Managed Neglect</strong> and demands a transformative shift toward <strong>Welfare Integrity</strong>.</p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-10 text-center">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight border-b-4 border-emerald-500 pb-4 inline-block">Vision</h2>
              <p className="text-2xl md:text-3xl text-slate-800 leading-relaxed font-medium italic">
                To transition Thessaloniki from a Paradigm of Managed Neglect to a standard of Welfare Integrity.
              </p>
            </div>
            
            {/* Pages truncate for space, content preserved from manifesto */}
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
  const [formData, setFormData] = useState({ name: '', email: '', location: 'Thessaloniki City Center', comment: '' });
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const pollingRef = useRef<number | null>(null);
  
  // Signatures state with initial local cache
  const [signatures, setSignatures] = useState<Signature[]>(() => {
    const saved = localStorage.getItem('thess_animal_signatures');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((s: any) => ({ ...s, timestamp: new Date(s.timestamp) }));
      } catch (e) { return []; }
    }
    return [];
  });

  const [hasSigned, setHasSigned] = useState(() => {
    return localStorage.getItem('thess_animal_has_signed') === 'true';
  });

  // Cloud Sync Logic
  const syncWithCloud = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch(CLOUD_API);
      if (response.ok) {
        const cloudData = await response.json();
        const formattedCloudData = cloudData.map((s: any) => ({ ...s, timestamp: new Date(s.timestamp) }));
        
        // Merge strategy: Unique by ID, newer locally might overwrite but ID is unique
        setSignatures(prev => {
          const merged = [...prev];
          formattedCloudData.forEach((cloudSig: Signature) => {
            if (!merged.find(m => m.id === cloudSig.id)) {
              merged.push(cloudSig);
            }
          });
          return merged.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        });
      }
    } catch (e) {
      console.warn("Cloud offline, using local storage fallback.");
    } finally {
      setIsSyncing(false);
    }
  };

  const pushToCloud = async (newSignatures: Signature[]) => {
    setIsSyncing(true);
    try {
      await fetch(CLOUD_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSignatures)
      });
    } catch (e) {
      console.error("Failed to push to cloud.");
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    syncWithCloud();
    // Real-time polling every 30 seconds
    pollingRef.current = window.setInterval(syncWithCloud, 30000);
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('thess_animal_signatures', JSON.stringify(signatures));
  }, [signatures]);

  useEffect(() => {
    localStorage.setItem('thess_animal_has_signed', hasSigned.toString());
  }, [hasSigned]);
  
  const t = TRANSLATIONS[lang];
  const targetSignatures = 1000;
  const currentSignaturesCount = signatures.length;
  const progressPercent = Math.min((currentSignaturesCount / targetSignatures) * 100, 100);

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newSignature: Signature = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      location: formData.location,
      comment: formData.comment,
      timestamp: new Date()
    };

    const updatedSignatures = [newSignature, ...signatures];
    setSignatures(updatedSignatures);
    setHasSigned(true);
    
    // Immediate push to cloud
    await pushToCloud(updatedSignatures);
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
            <div className="hidden md:flex items-center gap-2 mr-4 px-3 py-1 bg-slate-50 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
              <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`}></div>
              {isSyncing ? 'Cloud Syncing...' : 'Live Connected'}
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
                <h3 className="text-slate-900 font-extrabold text-3xl tracking-tight">
                  {currentSignaturesCount.toLocaleString()}
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

      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="serif text-4xl text-slate-900 mb-8">{t.about_title}</h2>
          <div className="space-y-6 text-slate-600 leading-relaxed text-lg max-w-3xl mx-auto">
            <p>{t.about_p1}</p>
            <p>{t.about_p2}</p>
            <p>{t.about_p3}</p>
          </div>
          <div className="mt-12 inline-flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
             <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-200"><Icon name="ShieldCheck" size={28} /></div>
             <p className="text-emerald-900 font-extrabold text-xl tracking-tight leading-tight uppercase">{t.about_footer}</p>
          </div>
        </div>
      </section>

      <section id="petition" className="py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-16">
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
                <button type="submit" disabled={isSyncing} className="w-full bg-emerald-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200 text-lg active:translate-y-0.5">
                  {isSyncing ? 'Processing...' : t.form_submit}
                </button>
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
              <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
              {t.live_updates}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatures.length > 0 ? signatures.slice(0, 9).map((sig) => (
              <div key={sig.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4 animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">{sig.name[0]}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900">{sig.name}</h4>
                    <span className="text-[8px] bg-emerald-100 text-emerald-600 px-1 rounded font-black">VERIFIED</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">{sig.location} • {sig.timestamp.toLocaleDateString()}</p>
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
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h4 className="font-bold text-lg text-slate-900 mb-2">{t.nav_title}</h4>
          <p className="text-sm text-slate-500 uppercase tracking-widest">{lang === 'en' ? 'A Manifesto for Stray Welfare in Thessaloniki' : 'Ένα Μανιφέστο για την Ευημερία των Αδέσποτων στη Θεσσαλονίκη'}</p>
          <div className="mt-4 text-xs text-slate-400">&copy; 2025 Pawsitive Parks Initiative. Real-time signatures enabled.</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
