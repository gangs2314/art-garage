export const faqData = [
  {
    id: 1,
    category: 'Booking',
    question: 'How do I book a consultation?',
    answer: 'You can book a consultation by clicking the WhatsApp button in the top right corner, calling us at +91 7795875799, or visiting our studio in Rajajinagar. We typically respond within 2-4 hours on WhatsApp.',
    keywords: ['book', 'appointment', 'consultation', 'reserve', 'schedule']
  },
  {
    id: 2,
    category: 'Booking',
    question: 'What is your minimum booking amount?',
    answer: 'Our minimum tattoo session is ₹5,000. Custom design consultations start at ₹2,000 (which is adjusted from your final tattoo cost). Larger pieces may require multiple sessions.',
    keywords: ['price', 'cost', 'minimum', 'booking amount', 'fee']
  },
  {
    id: 3,
    category: 'Booking',
    question: 'How far in advance should I book?',
    answer: 'We recommend booking 2-4 weeks in advance for standard designs. For custom artwork or larger pieces, book 4-6 weeks ahead. Rush bookings may be available - contact us directly.',
    keywords: ['advance', 'how long', 'waiting list', 'availability', 'schedule']
  },
  {
    id: 4,
    category: 'Aftercare',
    question: 'What should I do after getting a tattoo?',
    answer: 'Keep the tattoo clean and dry for the first 24 hours. Wash gently with unscented soap 2-3 times daily. Apply thin layers of fragrance-free moisturizer. Avoid direct sunlight, swimming, and intense workouts for 2 weeks. Wear loose clothing over the area.',
    keywords: ['aftercare', 'care', 'healing', 'maintenance', 'clean']
  },
  {
    id: 5,
    category: 'Aftercare',
    question: 'How long does a tattoo take to heal?',
    answer: 'Surface healing takes 2-3 weeks, but full healing (including the deeper skin layers) can take 4-6 weeks. Some designs may continue to settle for up to 3 months. Follow aftercare instructions closely to ensure proper healing.',
    keywords: ['healing', 'time', 'recover', 'days', 'weeks']
  },
  {
    id: 6,
    category: 'Design',
    question: 'Can you create custom designs?',
    answer: 'Yes! We specialize in custom artwork. Our artists will collaborate with you to bring your vision to life. We offer free design consultations to discuss your ideas and create the perfect tattoo for you.',
    keywords: ['custom', 'design', 'drawing', 'artwork', 'unique']
  },
  {
    id: 7,
    category: 'Design',
    question: 'What styles do you specialize in?',
    answer: 'We excel in Black & Gray, Realism, Japanese, Tribal, Geometric, Minimalist, and Watercolor styles. Check our portfolio to see examples. Our artists are experienced across multiple styles and can discuss what works best for your idea.',
    keywords: ['style', 'types', 'black and gray', 'color', 'Japanese', 'realism']
  },
  {
    id: 8,
    category: 'Studio',
    question: 'Where are you located?',
    answer: 'We\'re located in Rajajinagar, Bangalore. Click the "Locate Us" button in the top right to see our exact address and directions on the map.',
    keywords: ['location', 'address', 'where', 'directions', 'Rajajinagar']
  },
  {
    id: 9,
    category: 'Studio',
    question: 'Are you open on weekends?',
    answer: 'Yes, we\'re open on weekends. Our typical hours are 11 AM - 9 PM Tuesday to Sunday, with Monday closures for studio maintenance. Contact us for specific holiday hours.',
    keywords: ['hours', 'open', 'timing', 'weekend', 'closed', 'Monday']
  },
  {
    id: 10,
    category: 'Artists',
    question: 'Who are your tattoo artists?',
    answer: 'We have two main artists: Sude and Sagar. Both bring unique skills and perspectives. Sude specializes in black & gray and realism, while Sagar excels in geometric and Japanese styles. Check our Artists page for their portfolios.',
    keywords: ['artist', 'tattoo artist', 'Sude', 'Sagar', 'portfolio', 'experience']
  },
  {
    id: 11,
    category: 'General',
    question: 'Is the studio hygienic and safe?',
    answer: 'Absolutely! We follow strict hygiene protocols including sterilization of all equipment, use of disposable needles, and a clean, professional environment. We\'re certified and regularly inspected.',
    keywords: ['hygiene', 'clean', 'safe', 'sterilization', 'sanitation', 'certified']
  },
  {
    id: 12,
    category: 'General',
    question: 'Can I bring friends to watch?',
    answer: 'We allow one support person in the studio during your session. Multiple spectators can distract both the artist and client, affecting quality. Feel free to ask - we\'re flexible!',
    keywords: ['friends', 'watch', 'support', 'people', 'allowed']
  }
];

export const getCategoryEmoji = (category) => {
  const emojis = {
    'Booking': '📅',
    'Aftercare': '💊',
    'Design': '🎨',
    'Studio': '🏢',
    'Artists': '👨‍🎨',
    'General': '❓'
  };
  return emojis[category] || '❓';
};
