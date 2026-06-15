import { useState, useRef, useEffect } from 'react';
import { 
  Instagram, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Star, 
  MessageCircle, 
  Check, 
  Menu, 
  X, 
  ArrowUpRight, 
  Award, 
  Heart, 
  Sparkles, 
  ChevronLeft, 
  Phone
} from 'lucide-react';
import { 
  defaultProfileData, 
  ProfileData, 
  HighlightItem, 
  ServiceItem, 
  PortfolioItem 
} from './profileData';
import StoryViewer from './components/StoryViewer';
import ContentEditor from './components/ContentEditor';
import BookingForm from './components/BookingForm';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfileData);
  const [activeHighlight, setActiveHighlight] = useState<HighlightItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [portfolioFilter, setPortfolioFilter] = useState<string>('All');
  const [servicesFilter, setServicesFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Mobile menu control
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // Target ref for smooth scrolling to booking section
  const bookingSectionRef = useRef<HTMLDivElement>(null);

  // Clear selected service logic
  const handleClearSelectedService = () => {
    setSelectedService(null);
  };

  // Extract primary initials monogram dynamically (e.g. Sania Khan -> SK)
  const monogram = profile.name
    ? profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'SK';

  // Categories list retrieved dynamically from services & portfolio
  const serviceCategories = ['All', ...Array.from(new Set<string>(profile.services.map(s => s.category)))];
  const portfolioCategories = ['All', ...Array.from(new Set<string>(profile.portfolio.map(p => p.category)))];

  // Dynamic Styles Generator based on chosen theme
  const getAccentStyles = (theme: string) => {
    switch (theme) {
      case 'rose':
        return {
          text: 'text-rose-400',
          bg: 'bg-rose-400',
          border: 'border-rose-400',
          ring: 'focus:ring-rose-400/40',
          bgHover: 'hover:bg-rose-300',
          bgLight: 'bg-rose-400/10',
          textDark: 'text-rose-500',
          borderLight: 'border-rose-400/20',
          gradient: 'from-rose-500/10 to-zinc-950',
          badge: 'bg-rose-400/10 text-rose-400 border-rose-400/20'
        };
      case 'pink':
        return {
          text: 'text-pink-500',
          bg: 'bg-pink-500',
          border: 'border-pink-500',
          ring: 'focus:ring-pink-500/40',
          bgHover: 'hover:bg-pink-400',
          bgLight: 'bg-pink-500/10',
          textDark: 'text-pink-600',
          borderLight: 'border-pink-500/20',
          gradient: 'from-pink-500/10 to-zinc-950',
          badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20'
        };
      case 'emerald':
        return {
          text: 'text-emerald-400',
          bg: 'bg-emerald-400',
          border: 'border-emerald-400',
          ring: 'focus:ring-emerald-400/40',
          bgHover: 'hover:bg-emerald-300',
          bgLight: 'bg-emerald-400/10',
          textDark: 'text-emerald-500',
          borderLight: 'border-emerald-400/20',
          gradient: 'from-emerald-500/10 to-zinc-950',
          badge: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
        };
      case 'purple':
        return {
          text: 'text-purple-400',
          bg: 'bg-purple-400',
          border: 'border-purple-400',
          ring: 'focus:ring-purple-400/40',
          bgHover: 'hover:bg-purple-300',
          bgLight: 'bg-purple-400/10',
          textDark: 'text-purple-500',
          borderLight: 'border-purple-400/20',
          gradient: 'from-purple-500/10 to-zinc-950',
          badge: 'bg-purple-400/10 text-purple-400 border-purple-400/20'
        };
      case 'neutral':
        return {
          text: 'text-zinc-200',
          bg: 'bg-zinc-200',
          border: 'border-zinc-200',
          ring: 'focus:ring-zinc-400/40',
          bgHover: 'hover:bg-zinc-100',
          bgLight: 'bg-zinc-200/10',
          textDark: 'text-white',
          borderLight: 'border-zinc-200/20',
          gradient: 'from-zinc-200/5 to-zinc-950',
          badge: 'bg-zinc-200/10 text-zinc-100 border-zinc-200/20'
        };
      case 'amber':
      default:
        return {
          text: 'text-amber-500',
          bg: 'bg-amber-500',
          border: 'border-amber-500',
          ring: 'focus:ring-amber-500/40',
          bgHover: 'hover:bg-amber-400',
          bgLight: 'bg-amber-500/10',
          textDark: 'text-amber-600',
          borderLight: 'border-amber-500/20',
          gradient: 'from-amber-500/10 to-zinc-950',
          badge: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
        };
    }
  };

  const accent = getAccentStyles(profile.themeColor);

  // Scroll to booking form and populate package
  const handleBookService = (service: ServiceItem) => {
    setSelectedService(service);
    if (bookingSectionRef.current) {
      bookingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Nav scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Handle outside keyboard events (escape key) for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveHighlight(null);
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredServices = servicesFilter === 'All'
    ? profile.services
    : profile.services.filter(s => s.category.toLowerCase() === servicesFilter.toLowerCase());

  const filteredPortfolio = portfolioFilter === 'All'
    ? profile.portfolio
    : profile.portfolio.filter(p => p.category.toLowerCase() === portfolioFilter.toLowerCase());

  // Navigation Links definition
  const navLinks = [
    { name: 'Home', action: () => scrollToId('hero') },
    { name: 'Services', action: () => scrollToId('services') },
    { name: 'Highlights', action: () => scrollToId('highlights-ref') },
    { name: 'Art Portfolio', action: () => scrollToId('portfolio') },
    { name: 'Reviews', action: () => scrollToId('testimonials') },
    { name: 'FAQs', action: () => scrollToId('faqs') },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* 1. Header Navigation */}
      <nav id="navbar-main" className="sticky top-0 w-full bg-zinc-950/85 backdrop-blur-md border-b border-zinc-900 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Elegant Logo Monogram */}
            <div 
              onClick={() => scrollToId('hero')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-full bg-zinc-900 border ${accent.border} flex items-center justify-center font-serif text-lg font-bold tracking-widest ${accent.text} group-hover:scale-105 transition-all`}>
                {monogram}
              </div>
              <div className="hidden sm:block">
                <span className="font-serif text-base tracking-widest text-white uppercase block leading-none">{profile.name}</span>
                <span className={`text-[9px] uppercase tracking-wider font-mono ${accent.text}`}>{profile.username}</span>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 pl-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Desktop WhatsApp Action Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all cursor-pointer"
                title="Sania Khan Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  if (bookingSectionRef.current) {
                    bookingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`text-[11px] uppercase tracking-wider font-bold py-2.5 px-4.5 rounded-full border ${accent.border} ${accent.text} hover:bg-white hover:text-black hover:border-white active:scale-95 transition-all cursor-pointer`}
              >
                Book WhatsApp Makeup
              </button>
            </div>

            {/* Mobile Toggle Button */}
            <div className="md:hidden flex items-center gap-3">
              <a
                href={`https://wa.me/${profile.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${accent.bgLight} ${accent.text} border ${accent.borderLight} cursor-pointer`}
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-400 hover:text-white outline-none cursor-pointer"
                title="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-850 px-4 py-6 space-y-4 shadow-xl transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-[400px] opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'
          }`}
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="text-left text-sm uppercase tracking-widest text-zinc-300 hover:text-white py-2 border-b border-zinc-900 cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4">
            <span className="text-zinc-500 text-xs font-mono">@{profile.username}</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (bookingSectionRef.current) {
                  bookingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`w-full text-center py-2.5 text-xs uppercase tracking-wider font-bold text-black rounded-lg ${accent.bg} cursor-pointer`}
            >
              Contact is WhatsApp
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header id="hero" className="relative py-12 sm:py-20 lg:py-24 border-b border-zinc-900 overflow-hidden">
        
        {/* Glowing Ambient Drops */}
        <div className={`absolute top-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-10 bg-current transition-colors ${accent.text}`} />
        <div className="absolute right-10 bottom-10 w-44 h-44 rounded-full blur-3xl opacity-5 bg-yellow-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Column: Real Instagram Bio Stats Layout */}
            <div className="md:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available Worldwide for Bridal Bookings ✈️</span>
              </div>

              <div className="space-y-3">
                <span className={`text-sm uppercase tracking-widest font-mono ${accent.text} font-bold block`}>
                  {profile.title}
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
                  Elegant Glow <br className="hidden sm:block" />
                  Tailored For Your <span className="italic relative font-light text-zinc-100">Special Moments</span>
                </h1>
                <p className="text-zinc-400 text-sm max-w-xl leading-relaxed font-sans pt-1">
                  {profile.subtitle}. Providing high-definition, micro-refined bridal aesthetics and bespoke makeup courses designed to build elite industry professional expertise.
                </p>
              </div>

              {/* Instagram Stats Row */}
              <div className="flex gap-8 py-3.5 border-y border-zinc-900 max-w-md bg-zinc-900/10 rounded-lg p-2">
                <div>
                  <span className="block text-lg font-bold text-white font-mono">225</span>
                  <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-medium">Beauty Posts</span>
                </div>
                <div>
                  <span className="block text-lg font-bold text-white font-mono">1,374</span>
                  <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-medium">Followers</span>
                </div>
                <div>
                  <span className="block text-lg font-bold text-white font-mono">815</span>
                  <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-medium">Following</span>
                </div>
              </div>

              {/* Instagram Bio-Style Copy */}
              <div className="space-y-1 bg-zinc-900/40 p-4 rounded-xl border border-zinc-900/60 max-w-lg">
                <h4 className="text-xs font-bold font-serif tracking-wider text-zinc-200">✨ BIOGRAPHY & INSTAGLAM</h4>
                <p className="text-xs text-zinc-300 leading-relaxed pt-1 font-sans">
                  💕 Passionate about teaching beautiful custom makeup styles<br />
                  🗺️ Travelling worldwide for brides & editorial couture<br />
                  💌 Send details below for instant package calculations & bookings
                </p>
              </div>

              {/* CTA triggers */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button 
                  onClick={() => {
                    if (bookingSectionRef.current) {
                      bookingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`px-7 py-3 text-xs uppercase tracking-widest font-bold ${accent.bg} ${accent.bgHover} active:scale-95 text-zinc-950 rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-lg`}
                >
                  <MessageCircle className="w-4 h-4 fill-zinc-950" />
                  <span>Book Bridal Slot on WhatsApp</span>
                </button>
                <button
                  onClick={() => scrollToId('services')}
                  className="px-6 py-3 text-xs uppercase tracking-widest font-bold bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-full transition-all cursor-pointer"
                >
                  Explore Packages
                </button>
              </div>

            </div>

            {/* Hero Right Column: Beautiful Portrait Frame */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
                
                {/* Border Accent Line */}
                <div className={`absolute inset-2 border ${accent.border} opacity-55 rounded-xl z-20 pointer-events-none group-hover:scale-[0.98] transition-all`} />
                
                <img 
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=80" 
                  alt="Sania Khan makeup showcase header"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-95"
                />

                {/* Corner text details */}
                <div className="absolute bottom-4 left-4 right-4 z-10 bg-zinc-950/70 p-3.5 backdrop-blur rounded-lg border border-white/5">
                  <p className="text-[10px] uppercase font-mono tracking-widest text-amber-500">Signature Glow Portfolio</p>
                  <p className="text-sm font-serif italic text-white mt-0.5">"Artistry matching skin texture & bridal heritage"</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </header>

      {/* 3. Instagram Circular Highlights (Matches the Screenshot) */}
      <section id="highlights-ref" className="py-10 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className={`text-[11px] uppercase tracking-widest font-mono font-bold ${accent.text}`}>Unread Highlights</span>
            <h2 className="font-serif text-2xl tracking-wide text-white mt-1">Explore Featured Stories</h2>
            <p className="text-xs text-zinc-500 mt-1">Click a bubble below to watch look collections, model masterclasses, and travel diaries!</p>
          </div>

          {/* Scrolling Highlights Row */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-6 sm:gap-8 pb-4 scroll-smooth custom-scrollbar px-2 select-none">
            {profile.highlights.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveHighlight(item)}
                className="flex flex-col items-center gap-2 group flex-shrink-0 focus:outline-none cursor-pointer"
                title={`Watch ${item.title}`}
              >
                {/* Animated Ring Outer Container resembling unread stories */}
                <div className="relative">
                  <div className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-pink-500 rounded-full p-[2px] scale-105 group-hover:rotate-45 transition-all duration-500 shadow-lg`} />
                  
                  {/* Black Spacer inside ring */}
                  <div className="relative bg-zinc-950 rounded-full p-[3px] z-10">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Subtitle bottom */}
                <span className="text-xs text-zinc-300 font-medium tracking-tight group-hover:text-white transition-colors max-w-[84px] text-center truncate">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Creator details */}
      <section id="about" className="py-16 sm:py-20 bg-zinc-900/20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* About Image Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-xl overflow-hidden border border-zinc-800 group shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80"
                  alt="Sania Khan makeup class setting"
                  className="w-full h-full object-cover group-hover:rotate-1 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${accent.gradient} opacity-50 z-10`} />
              </div>
              <div className="absolute -bottom-6 -right-2 md:bottom-2 md:right-2 bg-zinc-900 border border-zinc-850 p-4.5 rounded-xl z-20 shadow-xl max-w-[200px]">
                <p className={`text-xs font-mono uppercase tracking-wider font-bold ${accent.text}`}>Signature Vibe</p>
                <p className="text-[11px] text-zinc-400 leading-normal pt-1 font-sans">"Highlighting facial bone structures while maintaining skin integrity."</p>
              </div>
            </div>

            {/* About Text details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className={`text-[11px] uppercase tracking-widest font-mono font-bold ${accent.text}`}>MEET THE ARTIST & EDUCATOR</span>
                <h2 className="font-serif text-3xl sm:text-4xl tracking-wide text-white">
                  Passionate About teaching & Bridal Artistry
                </h2>
              </div>

              <div className="w-12 h-1 bg-amber-500/80 rounded" />

              <p className="text-zinc-300 text-sm leading-relaxed font-sans font-normal italic">
                "{profile.aboutMe}"
              </p>

              {/* Checklist pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2.5">
                  <span className={`p-1.5 rounded-lg ${accent.bgLight} ${accent.text} mt-0.5`}>
                    <Check className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Destination Weddings</h4>
                    <p className="text-xs text-zinc-400">Accommodating custom styling, accessory fitting, and skin glow touchups worldwide.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className={`p-1.5 rounded-lg ${accent.bgLight} ${accent.text} mt-0.5`}>
                    <Check className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">HD Airbrush Mastery</h4>
                    <p className="text-xs text-zinc-400">Ensuring sweatproof makeup looking pristine on high-resolution cameras.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className={`p-1.5 rounded-lg ${accent.bgLight} ${accent.text} mt-0.5`}>
                    <Check className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Interactive Educator</h4>
                    <p className="text-xs text-zinc-400">Instructing beauty apprentices on skin analysis, shading, and liner symmetries.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className={`p-1.5 rounded-lg ${accent.bgLight} ${accent.text} mt-0.5`}>
                    <Check className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Premium Skin Prep</h4>
                    <p className="text-xs text-zinc-400">Strictly utilizing luxury cosmetics safe for sensitive and dehydrated complexions.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Services and Rates Pricing Catalog */}
      <section id="services" className="py-16 sm:py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className={`text-[11px] uppercase tracking-widest font-mono font-bold ${accent.text}`}>SERVICES & ACADEMY</span>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-wide text-white mt-1">Menu of Prestige Services</h2>
              <p className="text-xs text-zinc-500 mt-2 font-sans">
                Curating the absolute finest makeup systems. Choose a package below to load its details immediately into our WhatsApp Booking Form.
              </p>
            </div>

            {/* Custom Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 self-start">
              {serviceCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setServicesFilter(cat)}
                  className={`px-3 py-1.5 text-xs text-zinc-300 font-medium uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    servicesFilter.toLowerCase() === cat.toLowerCase()
                      ? `bg-zinc-800 ${accent.text} font-bold shadow-md`
                      : 'hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  {cat === 'All' ? 'View All' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-900 hover:border-zinc-800 relative flex flex-col justify-between group transition-all duration-300 hover:shadow-xl"
              >
                {/* Popular Star Badge */}
                {service.popular && (
                  <span className={`absolute -top-3 right-4 px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full flex items-center gap-1 leading-snug border border-amber-500/20 bg-amber-500/10 text-amber-400 shadow-md`}>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>Highly Popular</span>
                  </span>
                )}

                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-zinc-850 text-zinc-400 border border-zinc-800">
                      {service.category}
                    </span>
                    {service.duration && (
                      <span className="text-[10px] font-mono text-zinc-600">
                        {service.duration}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl text-white tracking-wide group-hover:text-amber-500 transition-colors pt-1">
                    {service.name}
                  </h3>
                  
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-zinc-850 mt-6 pt-4 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Investment</span>
                    <span className="text-base font-mono font-bold text-white group-hover:text-amber-500 transition-colors">
                      {service.price}
                    </span>
                  </div>
                  <button
                    onClick={() => handleBookService(service)}
                    className="p-1.5 py-2.5 rounded-xl border border-zinc-800 group-hover:border-amber-500/50 group-hover:bg-amber-500 group-hover:text-black hover:scale-[1.03] text-zinc-400 text-[11px] uppercase tracking-wider font-bold transition-all flex items-center gap-1 cursor-pointer px-4.5"
                  >
                    <span>Book Now</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Dynamic Beauty Portfolio Showcase Gallery */}
      <section id="portfolio" className="py-16 sm:py-20 bg-zinc-900/20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className={`text-[11px] uppercase tracking-widest font-mono font-bold ${accent.text}`}>GALLERY DIARY</span>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-wide text-white mt-1">High-Definition Visual Portfolio</h2>
              <p className="text-xs text-zinc-500 mt-2 font-sans">
                Take a glimpse at real brides and students transformed by Sania. Filter photos to explore specific themes of aesthetics.
              </p>
            </div>

            {/* Portfolio Category Filter */}
            <div className="flex flex-wrap gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 self-start">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPortfolioFilter(cat)}
                  className={`px-3.5 py-1.5 text-xs text-zinc-300 font-medium uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    portfolioFilter.toLowerCase() === cat.toLowerCase()
                      ? `bg-zinc-850 ${accent.text} font-bold shadow-md`
                      : 'hover:text-white hover:bg-zinc-800/10'
                  }`}
                >
                  {cat === 'All' ? 'View All' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
              >
                {/* Image zoom */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 relative z-0"
                />

                {/* Overlying Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-5">
                  <span className={`text-[10px] uppercase font-mono tracking-widest font-bold ${accent.text} mb-1`}>
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg text-white font-medium leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-zinc-400 text-[11px] leading-relaxed line-clamp-2 mt-1 italic">
                      "{item.description}"
                    </p>
                  )}
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5 mt-3 self-start">
                    <span>Enlarge Artwork</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Corner Quick Category Badge inside basic view */}
                <span className="absolute top-4 right-4 bg-zinc-950/70 border border-white/5 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] text-zinc-400 uppercase tracking-widest z-10 group-hover:opacity-0 transition-opacity">
                  {item.category}
                </span>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Client Testimonials Carousel Section */}
      <section id="testimonials" className="py-16 sm:py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className={`text-[11px] uppercase tracking-widest font-mono font-bold ${accent.text}`}>CLIENT COMMENDATIONS</span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-wide text-white mt-1">Sincere Testimonials</h2>
            <p className="text-xs text-zinc-500 mt-2">
              Words of appreciation from our lovely destination brides and international masterclass students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.testimonials.map((test) => (
              <div key={test.id} className="p-6 bg-zinc-900/40 rounded-2xl border border-zinc-900 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-500">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-zinc-200 text-xs italic leading-relaxed mt-4">
                    "{test.comment}"
                  </p>
                </div>

                <div className="border-t border-zinc-850 mt-6 pt-4 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-white">{test.name}</h4>
                    <p className="text-zinc-500 text-[10px]">{test.role}</p>
                  </div>
                  {test.date && (
                    <span className="text-[10px] text-zinc-600 font-mono">{test.date}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. WhatsApp Scheduler Form Section */}
      <section id="booking-section" ref={bookingSectionRef} className="py-16 sm:py-20 bg-zinc-900/10 border-b border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className={`text-[11px] uppercase tracking-widest font-mono font-bold ${accent.text}`}>RESERVE THE GLOW</span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-wide text-white mt-1">Book Your Special Date</h2>
            <p className="text-xs text-zinc-400 mt-2">
              Fill in your event details below. Click submit to generate a structured booking message and dispatch it instantly onto live chat!
            </p>
          </div>

          <BookingForm 
            profileData={profile}
            selectedService={selectedService}
            onClearSelectedService={handleClearSelectedService}
            accentStyles={accent}
          />

        </div>
      </section>

      {/* 9. Interactive FAQs Section (Collapsible Accordion) */}
      <section id="faqs" className="py-16 sm:py-20 border-b border-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className={`text-[11px] uppercase tracking-widest font-mono font-bold ${accent.text}`}>GET CLARITY</span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-wide text-white mt-1">Frequently Asked Questions</h2>
            <p className="text-xs text-zinc-500 mt-2">
              All you need to know about destination bookings, trial setups, products list, and masterclass enrollments.
            </p>
          </div>

          <div className="space-y-3 font-sans">
            {profile.faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="border border-zinc-900 rounded-xl bg-zinc-900/20 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white transition-colors hover:bg-zinc-900/50 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className={`p-1 rounded bg-zinc-850 text-zinc-400 transition-all ${isOpen ? 'rotate-180 text-amber-500 bg-amber-500/10' : ''}`}>
                      ▼
                    </span>
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[300px] border-t border-zinc-900' : 'max-h-0 overflow-hidden'
                    }`}
                  >
                    <p className="p-5 text-xs text-zinc-400 leading-relaxed bg-zinc-950/30">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. Footer Section */}
      <footer className="bg-zinc-950 py-12 text-zinc-500 border-t border-zinc-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
            
            {/* Left Col Logo */}
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full bg-zinc-900 border ${accent.border} flex items-center justify-center font-serif text-xs font-bold tracking-widest ${accent.text}`}>
                  {monogram}
                </div>
                <div>
                  <span className="font-serif text-sm tracking-widest text-white uppercase block leading-none">{profile.name}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">@{profile.username}</span>
                </div>
              </div>
              <p className="text-zinc-500 text-[11px] leading-relaxed max-w-sm">
                Luxury bridal elegance, micro-blended custom cosmetics styling, and private Masterclass education worldwide. Transforming brides with premium luxury cosmetics ranges.
              </p>
            </div>

            {/* Mid Links Col */}
            <div className="md:col-span-4 space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Prestige Navigation</h4>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button onClick={() => scrollToId('hero')} className="hover:text-white text-left cursor-pointer">Home Hub</button>
                <button onClick={() => scrollToId('services')} className="hover:text-white text-left cursor-pointer">Beauty Menu</button>
                <button onClick={() => scrollToId('highlights-ref')} className="hover:text-white text-left cursor-pointer">Instagram Stories</button>
                <button onClick={() => scrollToId('portfolio')} className="hover:text-white text-left cursor-pointer">Art Gallery</button>
                <button onClick={() => scrollToId('testimonials')} className="hover:text-white text-left cursor-pointer">Client Commendations</button>
                <button onClick={() => scrollToId('faqs')} className="hover:text-white text-left cursor-pointer">QA Desk</button>
              </div>
            </div>

            {/* Right Contact Col */}
            <div className="md:col-span-4 space-y-3.5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Instant Contact Coordinates</h4>
              
              <div className="space-y-2 text-[11px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                  <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">{profile.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                  <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@{profile.username}</a>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href={`https://wa.me/${profile.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600/10 border border-emerald-600/20 text-emerald-400 font-bold hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-400 group-hover:fill-white" />
                  <span>DM Directly via WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* Copy bottom */}
          <div className="border-t border-zinc-900 pt-8 text-center text-[10px] text-zinc-600 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} {profile.name} Beauty Couture, All Rights Reserved. Designed for Worldwide Travel.</p>
            <p className="font-mono">Standard Encryption · No Mock Data Storage · Verified React Client</p>
          </div>

        </div>
      </footer>

      {/* 11. Immersive Story Viewer Modal */}
      {activeHighlight && (
        <StoryViewer
          highlight={activeHighlight}
          onClose={() => setActiveHighlight(null)}
          whatsappNumber={profile.whatsappNumber}
          onNextHighlight={() => {
            const currentIdx = profile.highlights.findIndex(h => h.id === activeHighlight.id);
            if (currentIdx !== -1 && currentIdx < profile.highlights.length - 1) {
              setActiveHighlight(profile.highlights[currentIdx + 1]);
            } else {
              setActiveHighlight(null);
            }
          }}
          onPrevHighlight={() => {
            const currentIdx = profile.highlights.findIndex(h => h.id === activeHighlight.id);
            if (currentIdx > 0) {
              setActiveHighlight(profile.highlights[currentIdx - 1]);
            }
          }}
        />
      )}

      {/* 12. Immersive Lightbox Modal for Portfolio Gallery */}
      {lightboxIndex !== null && (
        <div 
          id="gallery-lightbox" 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop Tap Close */}
          <div className="absolute inset-0 z-0" onClick={() => setLightboxIndex(null)} />

          {/* Close button top right */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition-colors focus:outline-none cursor-pointer"
            title="Close Lightbox"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={() => setLightboxIndex(prev => prev !== null && prev > 0 ? prev - 1 : filteredPortfolio.length - 1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-zinc-900/80 border border-white/10 text-white hover:bg-zinc-855 transition-all focus:outline-none cursor-pointer"
            title="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Centered Media Content */}
          <div className="relative z-10 max-w-4xl max-h-[80vh] flex flex-col items-center">
            <img
              src={filteredPortfolio[lightboxIndex].imageUrl}
              alt={filteredPortfolio[lightboxIndex].title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10 shadow-2xl"
            />
            
            {/* Metadata Footer Panel */}
            <div className="bg-zinc-900/95 p-4 rounded-xl border border-white/5 w-full mt-4 max-w-xl text-center">
              <span className={`text-[10px] uppercase font-mono tracking-widest font-bold ${accent.text}`}>
                {filteredPortfolio[lightboxIndex].category} Look
              </span>
              <h3 className="font-serif text-lg text-white mt-0.5">
                {filteredPortfolio[lightboxIndex].title}
              </h3>
              {filteredPortfolio[lightboxIndex].description && (
                <p className="text-zinc-400 text-xs mt-1.5 italic leading-relaxed">
                  "{filteredPortfolio[lightboxIndex].description}"
                </p>
              )}
              
              {/* Context Inquiry shortcut */}
              <button
                onClick={() => {
                  const lookName = filteredPortfolio[lightboxIndex].title;
                  setLightboxIndex(null);
                  
                  // Open WhatsApp immediately with this specific look pre-filled
                  const presetMsg = `Hi ${profile.name}! I saw a gorgeous look in your gallery: "${lookName}". I would love to check your availability for this specific vibe!`;
                  window.open(`https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(presetMsg)}`, '_blank');
                }}
                className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Inquire About This Look</span>
              </button>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => setLightboxIndex(prev => prev !== null && prev < filteredPortfolio.length - 1 ? prev + 1 : 0)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-zinc-900/80 border border-white/10 text-white hover:bg-zinc-855 transition-all focus:outline-none cursor-pointer"
            title="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* 13. Interactive Sandbox Editor Sidebar Component */}
      <ContentEditor 
        profileData={profile} 
        onUpdateProfileData={(updatedData) => setProfile(updatedData)}
      />

    </div>
  );
}
