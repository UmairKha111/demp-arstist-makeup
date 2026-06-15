import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { HighlightItem } from '../profileData';

interface StoryViewerProps {
  highlight: HighlightItem;
  onClose: () => void;
  onNextHighlight?: () => void;
  onPrevHighlight?: () => void;
  whatsappNumber: string;
}

export default function StoryViewer({
  highlight,
  onClose,
  onNextHighlight,
  onPrevHighlight,
  whatsappNumber
}: StoryViewerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentSlide = highlight.stories[currentSlideIndex];

  // Auto-play timer for slides
  useEffect(() => {
    setCurrentSlideIndex(0); // Reset when highlight changes
  }, [highlight]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlideIndex, highlight]);

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    } else if (onPrevHighlight) {
      onPrevHighlight();
    }
  };

  const handleNext = () => {
    if (currentSlideIndex < highlight.stories.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else if (onNextHighlight) {
      onNextHighlight();
    } else {
      onClose();
    }
  };

  // Pre-fill a WhatsApp message about this specific highlight look
  const getWhatsAppLink = (text: string) => {
    const defaultText = `Hi! I saw your "${highlight.title}" story looking at your makeup portfolio and would love to inquire about a similar look!`;
    const message = encodeURIComponent(text ? `Hi! I'm interested in the look from your star story: "${text}"` : defaultText);
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <div id="story-display-container" className="fixed inset-0 bg-neutral-950/98 z-[100] flex items-center justify-center p-2 sm:p-4 backdrop-blur-md">
      {/* Background Dimming Tap Close */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      {/* Main Mobile-looking Container */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between border border-white/10 select-none">
        
        {/* Story Progress Indicators */}
        <div className="absolute top-3 left-0 right-0 z-20 flex gap-1 px-3">
          {highlight.stories.map((_, idx) => (
            <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-white rounded-full ${
                  idx < currentSlideIndex 
                    ? 'w-full' 
                    : idx === currentSlideIndex 
                      ? 'story-progress-active' 
                      : 'w-0'
                }`}
                style={{
                  transition: idx < currentSlideIndex ? 'none' : 'width 5000ms linear'
                }}
              />
            </div>
          ))}
        </div>

        {/* User Info Bar */}
        <div className="absolute top-6 left-0 right-0 z-20 flex items-center justify-between px-4 text-white">
          <div className="flex items-center gap-2">
            <img 
              src={highlight.imageUrl} 
              alt={highlight.title} 
              className="w-9 h-9 rounded-full object-cover border border-white/50"
            />
            <div>
              <p className="text-sm font-semibold tracking-tight">{highlight.title}</p>
              <p className="text-[10px] text-white/75 font-mono">Just now</p>
            </div>
          </div>
          <button 
            id="btn-close-story"
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
            title="Close Story"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Left & Right Tapping Overlays */}
        <div className="absolute inset-x-0 top-16 bottom-20 z-10 flex">
          <div className="w-1/3 h-full cursor-left" onClick={handlePrev} />
          <div className="w-1/3 h-full cursor-pointer" onClick={handleNext} />
          <div className="w-1/3 h-full cursor-right" onClick={handleNext} />
        </div>

        {/* Story Slide Canvas */}
        <div className="flex-1 flex items-center justify-center bg-zinc-950 relative">
          {currentSlide.type === 'image' && currentSlide.url ? (
            <>
              <img 
                src={currentSlide.url} 
                alt="Story content" 
                className="w-full h-full object-cover"
              />
              {/* Soft visual text overlay gradient */}
              {currentSlide.text && (
                <div className="absolute bottom-6 left-0 right-0 px-6 py-8 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-center">
                  <p className="text-white text-base font-serif italic tracking-wide leading-relaxed drop-shadow">
                    "{currentSlide.text}"
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Text-only quote style slide */
            <div className="px-8 text-center flex flex-col items-center justify-center h-full bg-gradient-to-tr from-rose-950/80 via-zinc-900 to-amber-950/80 p-8">
              <span className="text-3xl mb-4">✨</span>
              <p className="text-white text-lg font-serif italic tracking-wide leading-relaxed">
                "{currentSlide.text}"
              </p>
              <div className="w-12 h-[1px] bg-amber-500 mt-6 opacity-60" />
            </div>
          )}
        </div>

        {/* Bottom Interactive WhatsApp Call to Action */}
        <div className="relative z-20 bg-zinc-900/95 border-t border-white/5 p-4 flex gap-2 items-center">
          <a 
            id="link-story-whatsapp"
            href={getWhatsAppLink(currentSlide.text || '')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] transition-all text-white text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Inquire on WhatsApp</span>
          </a>
        </div>

        {/* Large Desktop Arrow Navigation on Outside Left/Right */}
        <div className="hidden md:block">
          <button 
            id="btn-story-prev-arrow"
            onClick={handlePrev}
            className="absolute top-1/2 -left-16 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition-all"
            title="Previous Story"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            id="btn-story-next-arrow"
            onClick={handleNext}
            className="absolute top-1/2 -right-16 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition-all"
            title="Next Story"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </div>
  );
}
