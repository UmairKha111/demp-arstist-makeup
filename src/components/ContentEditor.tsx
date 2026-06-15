import React, { useState } from 'react';
import { X, Settings, Clipboard, Check, Plus, Trash2, Edit3, HelpCircle } from 'lucide-react';
import { ProfileData, ServiceItem } from '../profileData';

interface ContentEditorProps {
  profileData: ProfileData;
  onUpdateProfileData: (data: ProfileData) => void;
}

export default function ContentEditor({ profileData, onUpdateProfileData }: ContentEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'services' | 'theme' | 'json'>('profile');
  const [copied, setCopied] = useState(false);

  // Individual form states for quick service adding
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Bridal');
  const [newServicePrice, setNewServicePrice] = useState('$150 / ₹12,000');
  const [newServiceDesc, setNewServiceDesc] = useState('');

  const updateField = (key: keyof ProfileData, value: any) => {
    onUpdateProfileData({
      ...profileData,
      [key]: value
    });
  };

  const handleCopyJSON = () => {
    const codeToCopy = `export const defaultProfileData = ${JSON.stringify(profileData, null, 2)};`;
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const newService: ServiceItem = {
      id: `srv_custom_${Date.now()}`,
      name: newServiceName,
      category: newServiceCategory,
      price: newServicePrice,
      description: newServiceDesc,
      popular: false
    };

    updateField('services', [...profileData.services, newService]);

    // Reset inputs
    setNewServiceName('');
    setNewServicePrice('');
    setNewServiceDesc('');
  };

  const handleDeleteService = (id: string) => {
    const updated = profileData.services.filter(s => s.id !== id);
    updateField('services', updated);
  };

  const handleTogglePopular = (id: string) => {
    const updated = profileData.services.map(s => {
      if (s.id === id) {
        return { ...s, popular: !s.popular };
      }
      return s;
    });
    updateField('services', updated);
  };

  return (
    <>
      {/* Floating Gear Button to Toggle Drawer */}
      <button
        id="btn-toggle-customizer"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-amber-500/30 text-amber-500 p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
        title="Open Design Editor"
      >
        <Settings className="w-5 h-5 animate-spin-slow group-hover:rotate-45 transition-transform" />
        <span className="text-xs font-semibold uppercase tracking-wider max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300">
          Edit Profile Content
        </span>
      </button>

      {/* Slide-out Drawer Panel */}
      <div 
        id="content-editor-sidebar"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 text-white shadow-2xl z-[90] border-l border-zinc-800 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded bg-amber-500/10 text-amber-500">
              <Settings className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif text-lg tracking-wide text-amber-500">Live Portfolio Customizer</h3>
              <p className="text-[10px] text-zinc-400 font-sans">Modify client info, services & colors live</p>
            </div>
          </div>
          <button 
            id="btn-close-customizer"
            onClick={() => setIsOpen(false)}
            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-zinc-300" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-center transition-colors font-medium cursor-pointer ${
              activeTab === 'profile' ? 'border-b-2 border-amber-500 text-amber-500 bg-zinc-900/50' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Basic Info
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 py-3 text-center transition-colors font-medium cursor-pointer ${
              activeTab === 'services' ? 'border-b-2 border-amber-500 text-amber-500 bg-zinc-900/50' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Services List
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex-1 py-3 text-center transition-colors font-medium cursor-pointer ${
              activeTab === 'theme' ? 'border-b-2 border-amber-500 text-amber-500 bg-zinc-900/50' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Vibe Theme
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex-1 py-3 text-center transition-colors font-medium cursor-pointer ${
              activeTab === 'json' ? 'border-b-2 border-amber-500 text-amber-500 bg-zinc-900/50' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Export JSON
          </button>
        </div>

        {/* Main Scrolling Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 font-sans custom-scrollbar">

          {/* Tab 1: Profile Info */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
                  Tagline / Specialization Title
                </label>
                <input
                  type="text"
                  value={profileData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
                  Subtitle Tagline
                </label>
                <input
                  type="text"
                  value={profileData.subtitle}
                  onChange={(e) => updateField('subtitle', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
                  Instagram Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-sm text-zinc-500">@</span>
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => {
                      const user = e.target.value;
                      updateField('username', user);
                      updateField('instagramUsername', user);
                      updateField('instagramUrl', `https://instagram.com/${user}`);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded pl-7 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
                  WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  value={profileData.whatsappNumber}
                  onChange={(e) => updateField('whatsappNumber', e.target.value.replace(/\D/g, ''))}
                  placeholder="Include country code, e.g. 919876543210"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
                <p className="text-[10px] text-zinc-500 mt-1">Enter digits only with country code (no +, no spaces, no braces).</p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
                  Location Text
                </label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
                  Artistic Biography
                </label>
                <textarea
                  rows={4}
                  value={profileData.aboutMe}
                  onChange={(e) => updateField('aboutMe', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Manage Services */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {/* Add New Service Form */}
              <form onSubmit={handleAddService} className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 space-y-3">
                <p className="text-xs font-semibold text-amber-500 uppercase tracking-wide">Add Custom Service</p>
                
                <div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Airbrush Bridal Glow"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <select
                      value={newServiceCategory}
                      onChange={(e) => setNewServiceCategory(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Bridal">Bridal</option>
                      <option value="Party">Party Glam</option>
                      <option value="Education">Education</option>
                      <option value="Editorial">Editorial</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="e.g. ₹18,000 / $220"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Service description detail..."
                    value={newServiceDesc}
                    onChange={(e) => setNewServiceDesc(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 text-black font-semibold text-xs py-2 rounded hover:bg-amber-400 active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insert Service</span>
                </button>
              </form>

              {/* Existing Services List */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">Active Services List ({profileData.services.length})</p>
                {profileData.services.map((srv) => (
                  <div key={srv.id} className="p-3 bg-zinc-900 rounded border border-zinc-800 flex flex-col justify-between gap-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500 font-mono font-medium">
                          {srv.category}
                        </span>
                        <h4 className="font-semibold text-xs mt-1 text-white">{srv.name}</h4>
                        <p className="text-[10px] text-amber-400 font-bold mt-0.5">{srv.price}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleTogglePopular(srv.id)}
                          className={`p-1 rounded text-[10px] transition-colors ${
                            srv.popular ? 'bg-amber-500 text-black font-bold' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400'
                          }`}
                          title="Toggle Popular Badge"
                        >
                          ★
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id)}
                          className="p-1 rounded bg-zinc-800 hover:bg-red-950 hover:text-red-400 text-zinc-400 transition-all cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400 italic line-clamp-2 mt-1">"{srv.description}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Themes */}
          {activeTab === 'theme' && (
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">Accent Branding Theme Color</p>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateField('themeColor', 'amber')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                    profileData.themeColor === 'amber' ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-amber-500 shadow" />
                  <div>
                    <p className="text-xs font-bold font-serif">Classic Gold</p>
                    <p className="text-[9px] text-zinc-400">Default Luxury Prestige</p>
                  </div>
                </button>

                <button
                  onClick={() => updateField('themeColor', 'rose')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                    profileData.themeColor === 'rose' ? 'border-rose-400 bg-rose-400/10' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-rose-400 shadow" />
                  <div>
                    <p className="text-xs font-bold font-serif">Rose Glamour</p>
                    <p className="text-[9px] text-zinc-400">Blush & Whimsical</p>
                  </div>
                </button>

                <button
                  onClick={() => updateField('themeColor', 'pink')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                    profileData.themeColor === 'pink' ? 'border-pink-500 bg-pink-500/10' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-pink-500 shadow" />
                  <div>
                    <p className="text-xs font-bold font-serif">Magenta Muse</p>
                    <p className="text-[9px] text-zinc-400">Vibrant Fashion-Forward</p>
                  </div>
                </button>

                <button
                  onClick={() => updateField('themeColor', 'emerald')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                    profileData.themeColor === 'emerald' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-500 shadow" />
                  <div>
                    <p className="text-xs font-bold font-serif">Royal Emerald</p>
                    <p className="text-[9px] text-zinc-400">Deep Velvet Highness</p>
                  </div>
                </button>

                <button
                  onClick={() => updateField('themeColor', 'purple')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                    profileData.themeColor === 'purple' ? 'border-purple-500 bg-purple-500/10' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-purple-500 shadow" />
                  <div>
                    <p className="text-xs font-bold font-serif">Mystic Amethyst</p>
                    <p className="text-[9px] text-zinc-400">Ethereal Royal Glow</p>
                  </div>
                </button>

                <button
                  onClick={() => updateField('themeColor', 'neutral')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                    profileData.themeColor === 'neutral' ? 'border-white bg-white/10' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-zinc-300 shadow" />
                  <div>
                    <p className="text-xs font-bold font-serif">Slate Minimal</p>
                    <p className="text-[9px] text-zinc-400">High Contrast Swiss</p>
                  </div>
                </button>
              </div>

              <div className="bg-zinc-900 p-3.5 rounded border border-zinc-800 flex items-start gap-2.5 text-zinc-400 text-xs">
                <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Changing the theme color updates all titles, buttons, borders, and state indicators on the website instantly! Try out colors to match other brand vibes.
                </p>
              </div>
            </div>
          )}

          {/* Tab 4: Export JSON */}
          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">TypeScript Data Object</p>
                <button
                  onClick={handleCopyJSON}
                  className="px-2.5 py-1 text-[11px] bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded flex items-center gap-1 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Config'}</span>
                </button>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                To permanently save this configuration for another makeup artist, simply click 'Copy Config' above, open `/src/profileData.ts` in your editor, and replace the contents of `defaultProfileData` with this copied object!
              </p>

              <div className="relative bg-zinc-900 p-3 rounded-lg border border-zinc-800 select-all overflow-x-auto max-h-[250px] custom-scrollbar">
                <pre className="text-[10px] text-zinc-300 font-mono tracking-tight leading-normal">
                  {`export const defaultProfileData = ${JSON.stringify(profileData, null, 2)};`}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer Status */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs text-zinc-400">
          <p>Status: <span className="text-emerald-500 font-bold font-mono">● Online Preview</span></p>
          <p className="text-[10px] text-amber-500 italic">Fully Responsive Client Sandbox</p>
        </div>

      </div>
    </>
  );
}
