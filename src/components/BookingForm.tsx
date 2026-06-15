import React, { useState } from 'react';
import { MessageCircle, Sparkles, MapPin, Calendar, User, ShoppingBag } from 'lucide-react';
import { ProfileData, ServiceItem } from '../profileData';

interface BookingFormProps {
  profileData: ProfileData;
  selectedService: ServiceItem | null;
  onClearSelectedService: () => void;
  accentStyles: {
    text: string;
    bg: string;
    border: string;
    ring: string;
    bgHover: string;
    bgLight: string;
  };
}

export default function BookingForm({
  profileData,
  selectedService,
  onClearSelectedService,
  accentStyles
}: BookingFormProps) {
  // Booking fields state
  const [clientName, setClientName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  
  // Set default selected service ID or load the one selected from previous buttons
  const [serviceId, setServiceId] = useState(selectedService?.id || '');

  // Keep state sync if client clicked "Book Now" from an external services card
  if (selectedService && serviceId !== selectedService.id) {
    setServiceId(selectedService.id);
  }

  const handleServiceChange = (id: string) => {
    setServiceId(id);
    if (id === '') {
      onClearSelectedService();
    } else {
      const match = profileData.services.find(s => s.id === id);
      if (match) {
        // Just trigger selection
      }
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !eventDate || !eventLocation.trim()) {
      alert("Please fill in your name, event date, and location so we can format your inquiry!");
      return;
    }

    const matchedService = profileData.services.find(s => s.id === serviceId);
    const serviceName = matchedService ? matchedService.name : 'Custom Inquiry / Beauty Day';
    const servicePrice = matchedService ? matchedService.price : 'Request Quote';

    // Construct the WhatsApp message with perfect professional formatting
    const formattedMessage = `✨ MAKEUP BOOKING INQUIRY ✨
----------------------------------
Dear ${profileData.name},

I would love to book your professional makeup artistry services! Here are my event details:

🌸 Client Name: ${clientName}
📅 Event Date: ${eventDate}
📍 Event Location: ${eventLocation}
💄 Package Selected: ${serviceName} (${servicePrice})

📝 Customized Notes & Vision:
"${customNotes ? customNotes : 'Looking forward to highlighting my natural features with a stunning glow! Please guide me on slot availability and booking deposits.'}"

Thank you so much! Please let me know your availability.`;

    // Construct WhatsApp API link
    const sanitizedNumber = profileData.whatsappNumber.trim();
    const whatsappUrl = `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(formattedMessage)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="booking-form-box" className="p-6 sm:p-8 bg-zinc-900 border border-zinc-800 rounded-2xl relative overflow-hidden shadow-2xl">
      {/* Decorative Blur Backgrounds */}
      <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full blur-3xl opacity-10 bg-current ${accentStyles.text}`} />
      <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full blur-3xl opacity-10 bg-amber-500" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className={`p-2 rounded-lg bg-zinc-850 ${accentStyles.text}`}>
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl tracking-wide text-white">Initiate Whatsapp Booking</h3>
            <p className="text-xs text-zinc-400 font-sans">Check availability & customize your glam details</p>
          </div>
        </div>

        <form onSubmit={handleSubmitBooking} className="mt-6 space-y-4 font-sans text-sm text-zinc-300">
          
          {/* Client Name Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Full Name <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Priyanjali Sen"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-700 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Event Date Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Event Date <span className="text-red-500">*</span></span>
              </label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-700 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors"
              />
            </div>

            {/* Event Location Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Location / City <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Srinagar / Mumbai"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-700 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors"
              />
            </div>
          </div>

          {/* Service/Package Dropdown selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Select Makeup Package</span>
            </label>
            <select
              value={serviceId}
              onChange={(e) => handleServiceChange(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-700 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
            >
              <option value="">-- Let's Discuss Custom Looks --</option>
              {profileData.services.map((srv) => (
                <option key={srv.id} value={srv.id}>
                  {srv.name} ({srv.price})
                </option>
              ))}
            </select>
          </div>

          {/* Custom Message input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Personalized Notes & Mood board (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. I prefer subtle matte lip colors, soft golden smokey eyes, and full lash drama. Please let me know the booking deposit details!"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-700 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors resize-none"
            />
          </div>

          {/* WhatsApp Submit Trigger button */}
          <button
            type="submit"
            className={`w-full ${accentStyles.bg} ${accentStyles.bgHover} text-neutral-900 font-bold py-4 px-6 rounded-2xl transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-4 cursor-pointer`}
          >
            <MessageCircle className="w-5 h-5 fill-neutral-900" />
            <span>Open WhatsApp & Send Booking Details</span>
          </button>

          <p className="text-[11px] text-center text-zinc-500 mt-2">
            No password or card payment is taken here. This form strictly exports parameters directly to chat to streamline client communication instantly!
          </p>

        </form>
      </div>
    </div>
  );
}
