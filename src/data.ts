import { Product, Testimonial, Benefit } from './types';

// Let's import our generated image paths directly using relative references
export const IMAGES = {
  heroBanner: '/src/assets/images/gym_hero_banner_1782676327833.jpg',
  hoodie: '/src/assets/images/hoodie_product_1782676341957.jpg',
  dumbbell: '/src/assets/images/dumbbell_product_1782676356187.jpg',
  supplement: '/src/assets/images/supplement_product_1782676369664.jpg',
  tracker: '/src/assets/images/tracker_product_1782676384367.jpg',
};

export const PRODUCTS: Product[] = [
  {
    id: 'ironpulse-stealth-hoodie',
    name: 'IronPulse Stealth Hoodie',
    tagline: 'Engineered for high-intensity training and premium comfort.',
    price: 79.00,
    compareAtPrice: 95.00,
    category: 'apparel',
    primaryImage: IMAGES.hoodie,
    hoverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 142,
    inStock: true,
    badge: 'BEST SELLER',
    features: [
      'Four-way stretch performance weave',
      'Moisture-wicking, thermal-regulated interior',
      'Stealth zipper pockets for secure storage',
      'Double-lined athletic hood with toggle-drawcords'
    ],
    colors: ['Matte Black', 'Stealth Grey', 'Pulse Green'],
    sizes: ['S', 'M', 'L', 'XL'],
    details: {
      description: 'The IronPulse Stealth Hoodie is the ultimate hybrid of premium lifestyle design and high-level athletic utility. Engineered with heavy-duty performance fibers, this hoodie provides thermal insulation on cold mornings while releasing excess body heat during max effort sets. Features laser-cut breathability ports and structured flatlock seams to eradicate chafing.',
      materials: '68% Ultra-dense Tech Cotton, 27% Recycled Performance Polyester, 5% Spandex Elastane.',
      usage: 'Machine wash cold on gentle cycle with similar colors. Air dry flat to protect active thermal coating. Do not iron directly over the neon-green trim details.'
    }
  },
  {
    id: 'ironforge-dumbbells',
    name: 'IronForge Adjustable Dumbbells',
    tagline: 'Replace 15 pairs of dumbbells with a single heavy-duty mechanism.',
    price: 349.00,
    compareAtPrice: 399.00,
    category: 'gear',
    primaryImage: IMAGES.dumbbell,
    hoverImage: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 94,
    inStock: true,
    badge: 'SALE',
    features: [
      'Dial-select adjustment from 5 to 52.5 lbs',
      'Ultra-durable powder-coated steel plates',
      'Anti-slip knurled grip pattern for heavy lifts',
      'Includes custom drop-resistant storage tray'
    ],
    colors: ['Matte Black'],
    sizes: ['One Size'],
    details: {
      description: 'Ditch the cluttered rack. The IronForge Adjustable Dumbbells use a heavy-duty rotary selection core to let you adjust weight instantly from 5 lbs up to 52.5 lbs. Perfectly counter-balanced plates ensure noise-free lifting, and the knurled chrome grip provides professional bar feedback for compound and isolation movements.',
      materials: 'CNC-machined industrial carbon steel, laser-etched nylon composite backing, urethane-coated plates.',
      usage: 'Rotate the selection dials only when the dumbbells are sitting flat inside their matching storage tray. Keep dial mechanism free of sweat and moisture.'
    }
  },
  {
    id: 'hyperiso-whey-protein',
    name: 'HyperIso Whey Isolate',
    tagline: 'Ultra-pure cold-filtered isolate for fast-absorbing muscle recovery.',
    price: 59.00,
    category: 'nutrition',
    primaryImage: IMAGES.supplement,
    hoverImage: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: 318,
    inStock: true,
    badge: 'NEW FORMULA',
    features: [
      '26g of pure micro-filtered protein per scoop',
      '0g added sugar / 0g fat / less than 1g carbs',
      'Rich in natural BCAAs and Essential Amino Acids',
      'Incredibly smooth mixability with no gritty residue'
    ],
    colors: ['Double Chocolate', 'Cookies & Cream', 'Pulse Vanilla'],
    sizes: ['2.2 lbs', '4.4 lbs'],
    details: {
      description: 'HyperIso is synthesized using state-of-the-art cold-flow micro-filtration to preserve crucial protein micro-fractions. Designed for immediate absorption post-training, it speeds up amino acid delivery to tired muscles, initiating rapid hypertrophy and soreness relief. Naturally sweetened with zero bloating or heavy stomach feeling.',
      materials: '90% Whey Protein Isolate, Natural Flavors, Stevia Leaf Extract, Sunflower Lecithin (for seamless mixing).',
      usage: 'Add 1 scoop to 8-10 oz of cold water or nut milk. Shake vigorously for 15 seconds. Consume within 30 minutes of finishing your workout.'
    }
  },
  {
    id: 'velopulse-smart-band',
    name: 'VeloPulse Smart Tracker',
    tagline: 'Sub-millimeter athletic telemetry tracked in real-time.',
    price: 129.00,
    compareAtPrice: 159.00,
    category: 'tech',
    primaryImage: IMAGES.tracker,
    hoverImage: 'https://images.unsplash.com/photo-1510017808632-957d76841e26?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    reviewsCount: 88,
    inStock: true,
    badge: 'LIMITLESS TECH',
    features: [
      'Continuous heart rate variability & SpO2 tracking',
      'Haptic form-guidance and dynamic workout pacing',
      '7-day battery life with rapid magnetic charger',
      'IronPulse Companion App integrations with zero subscription'
    ],
    colors: ['Stealth Black', 'Pulse Neon Green', 'Carbon White'],
    sizes: ['Standard'],
    details: {
      description: 'The VeloPulse Smart Tracker is a distraction-free screen band engineered specifically for athletes. It measures cardiovascular strain, central nervous system fatigue, and active calorie burn. Syncs in real-time with training dashboards to help you optimize work-to-rest intervals and prevent overtraining.',
      materials: 'Medical-grade hypoallergenic silicone strap, anodized space aluminum bezel, scratch-resistant sapphire crystal glass.',
      usage: 'Wear tightly approximately two fingers above your wrist bone for perfect optical sensor contact. Device is fully waterproof up to 50 meters.'
    }
  },
  {
    id: 'ironpulse-combat-joggers',
    name: 'IronPulse Combat Joggers',
    tagline: 'Lightweight, wind-resistant pant for mobility and speed.',
    price: 65.00,
    category: 'apparel',
    primaryImage: 'https://images.unsplash.com/photo-1517438476312-10d79c09450d?q=80&w=600&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=600&auto=format&fit=crop',
    rating: 4.5,
    reviewsCount: 79,
    inStock: true,
    features: [
      'Water-repellent DWR outer coating',
      'Deep ergonomic cargo slots for large phones',
      'Ankle cuff zippers for immediate ventilation',
      'Heavy-duty tactical waist buckle'
    ],
    colors: ['Matte Black', 'Stealth Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    details: {
      description: 'The IronPulse Combat Joggers are built for outdoor conditioning and winter gym runs. The durable outer nylon shell deflects freezing winds and light rain, while the high-density micro-fleece lining preserves optimal lower-limb warmth.',
      materials: '84% Tech Nylon, 16% Spandex Blend with DWR hydrophobic coating.',
      usage: 'Wash inside-out in warm water. Avoid fabric softeners as they can strip the water-repellent coating.'
    }
  },
  {
    id: 'carbon-grip-gloves',
    name: 'Carbon Grip Gym Gloves',
    tagline: 'Reinforced palms for heavy lifting and heavy-duty reps.',
    price: 35.00,
    category: 'gear',
    primaryImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 51,
    inStock: true,
    features: [
      'Integrated heavy-duty wrist wraps for compression',
      'Synthetic leather palms padded with high-density gel',
      'Pull tabs for simple and quick sweaty removal',
      'Mesh upper layer for maximum hand ventilation'
    ],
    colors: ['Carbon Black', 'Pulse Green'],
    sizes: ['M', 'L', 'XL'],
    details: {
      description: 'Eliminate blisters and wrist fatigue on heavy pulling days. The Carbon Grip Gym Gloves feature double-stitched leather palms infused with traction gel, backed by thick elastic wraps that lock your wrists safely into a neutral position.',
      materials: 'Amara synthetic leather palm, premium Neoprene wrist bands, polyester mesh weave.',
      usage: 'Fasten the wrist straps firmly but comfortably to ensure blood flow is not restricted. Air dry after every heavy lift session.'
    }
  },
  {
    id: 'thermafuel-pre-workout',
    name: 'ThermaFuel Pre-Workout',
    tagline: 'Explosive energy and laser focus with no post-crash jitters.',
    price: 45.00,
    category: 'nutrition',
    primaryImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 204,
    inStock: false,
    badge: 'OUT OF STOCK',
    features: [
      '350mg Caffeine anhydrous for explosive energy',
      '6000mg L-Citrulline for massive muscle pumps',
      '3200mg Beta-Alanine for lactic-acid buffering',
      'Added L-Theanine for calm focus and no jitter spikes'
    ],
    colors: ['Sour Green Apple', 'Pulse Cherry Bomb'],
    sizes: ['30 Servings'],
    details: {
      description: 'ThermaFuel is the gold standard for high-octane workouts. Specially formulated to provide continuous nitric oxide enhancement alongside clean mental stimulants, it gives you the energy to blast through plateaus without immediate crash cycles.',
      materials: 'Natural flavor extracts, citric acid, beta-carotene, sucralose, silicon dioxide.',
      usage: 'Mix 1 scoop with 10-12 oz of cold water. Drink 20-30 minutes before starting your workout. First-time users should test tolerance with half a scoop.'
    }
  },
  {
    id: 'sonicpulse-massager',
    name: 'SonicPulse Massage Gun',
    tagline: 'Quiet-glide percussion therapy for elite myofascial release.',
    price: 189.00,
    compareAtPrice: 249.00,
    category: 'tech',
    primaryImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 67,
    inStock: true,
    badge: 'SALE',
    features: [
      'High-torque brush-less motor with QuietGlide technology',
      '5 speed settings up to 3200 percussions per minute',
      'Includes 6 interchangeable massage attachments',
      'Heavy-duty rechargeable lithium battery (4 hours of use)'
    ],
    colors: ['Matte Black', 'Stealth Silver'],
    sizes: ['One Size'],
    details: {
      description: 'The SonicPulse Gun penetrates deep into sore muscle fibers to stimulate local blood flow, accelerate cellular repair, and break up dense scar tissue. Running on whisper-quiet brushless motors, it delivers deep impact treatment without hand vibratory fatigue.',
      materials: 'Impact-resistant polycarbonate casing, brushed metal accents, rubberized fatigue-free grip.',
      usage: 'Gently float the massager over muscle groups for 30-60 seconds per area. Do not apply directly to bones, joints, or spine.'
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcus Vance',
    role: 'Competitive Bodybuilder & Coach',
    rating: 5,
    text: 'The adjustable dumbbells are absolute bulletproof tanks. The rotary click mechanism is crisp, solid, and holds up to rapid drop-sets easily. IronPulse Gear is unmatched.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't2',
    name: 'Sarah Jenkins',
    role: 'CrossFit Athlete',
    rating: 5,
    text: 'I literally live in my Stealth Hoodie. It handles cold morning sprints, absorbs heavy sweat, and has discrete pockets that keep my phone flush against my hip while running.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't3',
    name: 'Dr. Evelyn Carter',
    role: 'Sports Physiotherapist',
    rating: 5,
    text: 'I recommend the SonicPulse Massager to all my elite athletes. The precision percussion frequency accelerates lactic acid flushing and restores range of motion significantly faster than passive rest.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop'
  }
];

export const BENEFITS: Benefit[] = [
  {
    icon: 'strength',
    title: 'High Quality',
    desc: 'Every piece of apparel is double-stitched and stress-tested; every piece of gear is CNC-machined to withstand elite power workouts.'
  },
  {
    icon: 'result',
    title: 'Proven Results',
    desc: 'Formulated and co-designed alongside elite professional trainers, nutritionists, and sports scientists to accelerate athletic outcomes.'
  },
  {
    icon: 'trust',
    title: 'Trusted Brand',
    desc: 'Over 150,000 satisfied athletes worldwide, backed by secure Shopify transactions, lifetime guarantees, and 24/7 technical support.'
  }
];
