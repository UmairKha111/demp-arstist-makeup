export interface StoryItem {
  id: string;
  type: 'image' | 'text';
  url?: string;
  text?: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  imageUrl: string;
  stories: StoryItem[];
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  duration?: string;
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProfileData {
  name: string;
  username: string;
  title: string;
  subtitle: string;
  aboutMe: string;
  whatsappNumber: string; // Dynamic WhatsApp number with country code
  instagramUsername: string;
  instagramUrl: string;
  email: string;
  location: string;
  themeColor: 'amber' | 'rose' | 'pink' | 'emerald' | 'purple' | 'neutral';
  highlights: HighlightItem[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
}

// Default profile for Sania Khan
export const defaultProfileData: ProfileData = {
  name: "Sania Khan",
  username: "saniakhan_makeup_artist",
  title: "Pro Makeup Artist & Educator",
  subtitle: "Luxury Bridal & Fashion Makeovers Worldwide",
  aboutMe: "I am Sania Khan, a passionate professional makeup artist and beauty educator specializing in high-definition bridal glow, contemporary fashion makeup, and immersive hands-on cosmetics masterclasses. Travelling worldwide to transform brides on their special day, my artistry is centered around highlighting your natural elegance with flawless, luminous skin, signature dramatic eyes, and customized couture details tailored to your personal aesthetic.",
  whatsappNumber: "916391157751", // Pre-set WhatsApp contact with appropriate country code (e.g. India +91)
  instagramUsername: "saniakhan_makeup_artist",
  instagramUrl: "https://instagram.com/saniakhan_makeup_artist",
  email: "saniakhan.bookings@gmail.com",
  location: "Mumbai, India (Travelling Worldwide for Brides)",
  themeColor: "amber", // Deluxe gold motif
  highlights: [
    {
      id: "hl1",
      title: "Highlights",
      imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&auto=format&fit=crop&q=80",
      stories: [
        { id: "s1_1", type: "image", url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80", text: "Signature masterclass settings with students! 💕" },
        { id: "s1_2", type: "text", text: "Creating flawless transitions, matching perfect skin undertones and curating bespoke beauty palettes." }
      ]
    },
    {
      id: "hl2",
      title: "Bijal Gada 💝",
      imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&auto=format&fit=crop&q=80",
      stories: [
        { id: "s2_1", type: "image", url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80", text: "The lovely Bijal Gada transformed with a soft pink dewy glow ✨" }
      ]
    },
    {
      id: "hl3",
      title: "Srinagar 🤍",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=80",
      stories: [
        { id: "s3_1", type: "image", url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80", text: "Enchanting destination bridal makeover in the heart of Srinagar! 🏔️❄️" },
        { id: "s3_2", type: "text", text: "Bridal queries open worldwide. Book early for destination weddings!" }
      ]
    },
    {
      id: "hl4",
      title: "Sheena Kaur 💜",
      imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=150&auto=format&fit=crop&q=80",
      stories: [
        { id: "s4_1", type: "image", url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80", text: "Royal Punjabi bride Sheena Kaur looking ethereal in traditional jewelry and flawless warm bronze makeup 💜" }
      ]
    },
    {
      id: "hl5",
      title: "Amisha Salun...",
      imageUrl: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=150&auto=format&fit=crop&q=80",
      stories: [
        { id: "s5_1", type: "image", url: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&auto=format&fit=crop&q=80", text: "Modern reception glam for stunning Amisha! Sleek hair and crisp velvet lip color 💄" }
      ]
    },
    {
      id: "hl6",
      title: "Jiya Sosa ❤️",
      imageUrl: "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=150&auto=format&fit=crop&q=80",
      stories: [
        { id: "s6_1", type: "image", url: "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=800&auto=format&fit=crop&q=80", text: "Editorial masterclass model Jiya Sosa wearing dual-tone metallic wing liner! ❤️" }
      ]
    }
  ],
  services: [
    {
      id: "srv1",
      name: "Luxury Bridal Makeover",
      category: "Bridal",
      price: "$250 / ₹20,000",
      description: "Complete elite bridal makeup package including high-definition contouring, premium lashes, customized jewelry setting, hair styling accessories, and full support on-location.",
      duration: "3 - 4 Hours",
      popular: true
    },
    {
      id: "srv2",
      name: "Bridal Reception Glamour",
      category: "Bridal",
      price: "$180 / ₹15,000",
      description: "Stunning, high-fashion statement look for post-wedding reception. Soft dewy skin, dazzling shimmer pigments, and customizable styling.",
      duration: "2 - 3 Hours",
      popular: false
    },
    {
      id: "srv3",
      name: "Celebrity Masterclass / Private Lesson",
      category: "Education",
      price: "$120 / ₹10,000",
      description: "One-on-one professional beauty class covering signature blending techniques, color theory, product master list, and customized guidance for prospective cosmetic artists.",
      duration: "5 Hours",
      popular: true
    },
    {
      id: "srv4",
      name: "Festival & Party Glam",
      category: "Party",
      price: "$80 / ₹6,500",
      description: "Chic, clean makeup perfect for guests, family festivals, bridesmaid looks, and milestone event celebrations with hair setup optional.",
      duration: "1.5 Hours",
      popular: false
    },
    {
      id: "srv5",
      name: "Editorial & High Fashion Shoot",
      category: "Editorial",
      price: "Request Quote",
      description: "Avant-garde or ultra-high definition makeup customized for brand campaigns, print magazines, catalog lookbooks, and professional catalog shoots.",
      duration: "Variable",
      popular: false
    }
  ],
  portfolio: [
    {
      id: "pt1",
      title: "Ethereal Bridal Royalty",
      category: "Bridal",
      imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?w=600&auto=format&fit=crop&q=80",
      description: "Classic red-lehenga bridal makeover with matching premium luxury diamonds, a clean crimson soft matte lip, and absolute symmetrical contour."
    },
    {
      id: "pt2",
      title: "Gold-Fleeted Masterclass Setting",
      category: "Education",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
      description: "In-action snapshot of our signature makeup masterclass. Demonstrating airbrush highlights, delicate blending, and professional brush control."
    },
    {
      id: "pt3",
      title: "Sunset Bronze Goddess",
      category: "Party",
      imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80",
      description: "Chic, warm, summery bronzed makeover paired with wet-look hair and highly natural freckles mapping for a premium resort look."
    },
    {
      id: "pt4",
      title: "Editorial Avant-Garde Glamour",
      category: "Editorial",
      imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80",
      description: "Vogue-inspired editorial feature featuring sharp graphic liners, wet-skin highlighter layering, and modern glass-skin finish."
    },
    {
      id: "pt5",
      title: "Delicate Pastel Bridesmaid",
      category: "Party",
      imageUrl: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&auto=format&fit=crop&q=80",
      description: "Subtle baby-pink flush and romantic loose wave curls designed for bridesmaid and reception celebration themes."
    },
    {
      id: "pt6",
      title: "Kashmiri Bridal Shimmer",
      category: "Bridal",
      imageUrl: "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=600&auto=format&fit=crop&q=80",
      description: "Enchanting traditional look featuring dynamic custom glitter eye pigments, rose-gold highlighter peaks, and traditional bridal headpieces."
    }
  ],
  testimonials: [
    {
      id: "tm1",
      name: "Bijal Gada",
      role: "Bridal Client",
      rating: 5,
      comment: "Sania did my makeup for my wedding and reception, and I have never felt more beautiful. She is an absolute magician with skin matching and kept me feeling fresh for 10+ hours. Travelling all the way to my venue, she felt like a dear friend!",
      date: "May 2026"
    },
    {
      id: "tm2",
      name: "Prerna Sharma",
      role: "Academy Student",
      rating: 5,
      comment: "Enrolling in Sania's Professional Educator Masterclass was the best decision for my beauty business. She breaks down complex shading and airbrush applications so elegantly. 100% recommend her courses list!",
      date: "April 2026"
    },
    {
      id: "tm3",
      name: "Sheena Kaur",
      role: "Destination Bride",
      rating: 5,
      comment: "Sania traveled internationally for my destination wedding. She curated two completely distinct looks—one traditional royal Punjabi look and one modern high-fashion Western party look. Pristine work and extremely punctual!",
      date: "Jan 2026"
    }
  ],
  faqs: [
    {
      id: "fq1",
      question: "Do you travel internationally or out-of-station for weddings?",
      answer: "Yes, absolutely! I am highly passionate about travelling worldwide for brides. Travel arrangements and styling schedules can be custom-planned upon booking confirmation."
    },
    {
      id: "fq2",
      question: "How can I book a slot and secure my dates?",
      answer: "Date bookings can be initiated through our WhatsApp Booking form. A partial deposit is required to lock the schedule, since slots fill up very quickly (especially on wedding-season weekends)."
    },
    {
      id: "fq3",
      question: "What products and brands do you use in your masterclasses?",
      answer: "I use and teach only premium luxury, dermatologist-approved cosmetic ranges including Chanel, Dior, NARS, Charlotte Tilbury, Estée Lauder, and Huda Beauty, ensuring long-lasting, skin-safe premium wear."
    },
    {
      id: "fq4",
      question: "Do you offer makeup trials prior to the main wedding day?",
      answer: "Yes, custom-tailored makeup trials can be arranged at my studio by appointment, allowing us to map out the perfect custom color harmonies and lash setups before your big day."
    }
  ]
};
