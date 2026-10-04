const RESTAURANT = {
  name: "MK Store",
  nameUrdu: "ایم کے اسٹور",
  logoImg: "",
  nameFont: "Bebas Neue",
  tagline: "Cooling Fans • Splitters • Electrical Accessories",
  whatsapp: "923234382586",
  address: "",
  currency: "Rs",
  poweredBy: "Qalbi Studio",

  delivery: {
    charge: 200,
    freeAbove: 5000,
    note: "Rs 5,000+ par free delivery — city ke andar"
  },

  categories: [
    "Cooling Fans",
    "Splitters",
    "Audio & Handsfree",
    "LED & Lighting",
    "Electrical",
    "Accessories"
  ],

  items: [
    { id: 1,  cat: "Cooling Fans", emoji: "🌀", img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Whole-house-fan-installed.JPG/330px-Whole-house-fan-installed.JPG", name: 'Exhaust Fan 12"',    nameUrdu: "ایگزاسٹ فین",     desc: "High speed, wall mount",        price: 2500,  popular: true },
    { id: 2,  cat: "Cooling Fans", emoji: "🌀", img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Hatari_18_inch_fan.jpg/330px-Hatari_18_inch_fan.jpg", name: 'Pedestal Fan 18"',  nameUrdu: "پیڈیسٹل فین",    desc: "3 speed, oscillating",          price: 4800,  popular: true },
    { id: 3,  cat: "Cooling Fans", emoji: "🌀", img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Ventilatore_a_soffitto_%283%29.png/330px-Ventilatore_a_soffitto_%283%29.png", name: 'Ceiling Fan 56"',   nameUrdu: "سیلنگ فین",       desc: "Power save, 5 year warranty",   price: 6500 },
    { id: 4,  cat: "Cooling Fans", emoji: "🌀", name: 'Wall Mount Fan',      nameUrdu: "وال ماونٹ فین",    desc: "Space saving",                  price: 3900 },
    { id: 5,  cat: "Cooling Fans", emoji: "❄️", name: "Room Cooler 60L",     nameUrdu: "روم کولر",         desc: "Ice box + honeycomb pads",      price: 12500, popular: true },
    { id: 6,  cat: "Cooling Fans", emoji: "💨", name: "USB Desk Fan",        nameUrdu: "یای ایس بی فین",   desc: "Portable, silent",              price: 950 },

    { id: 7,  cat: "Splitters",    emoji: "📡", name: "Coax Splitter 2-Way", nameUrdu: "کوکس سپلٹر",      desc: "Gold plated, signal loss free", price: 350 },
    { id: 8,  cat: "Splitters",    emoji: "📡", name: "Coax Splitter 4-Way", nameUrdu: "4 وے سپلٹر",       desc: "For cable TV distribution",     price: 650,  popular: true },
    { id: 9,  cat: "Splitters",    emoji: "🖥️", name: "HDMI Splitter 1x2",   nameUrdu: "ایچ ڈی ایم آئی سپلٹر", desc: "1080p support, plug & play", price: 1800 },
    { id: 10, cat: "Splitters",    emoji: "🎧", name: "Audio Splitter",      nameUrdu: "آڈیو سپلٹر",      desc: "3.5mm, 2 way",                  price: 450 },
    { id: 11, cat: "Splitters",    emoji: "📶", name: "Signal Booster",      nameUrdu: "سگنل بوسٹر",      desc: "Coax amplifier, 20dB gain",     price: 1200 },

    { id: 12, cat: "LED & Lighting", emoji: "💡", name: "LED Bulb 12W",      nameUrdu: "ایل ای ڈی بلب",    desc: "Warm + cool white",             price: 250,  popular: true },
    { id: 13, cat: "LED & Lighting", emoji: "💡", name: "LED Tube 4ft",      nameUrdu: "ایل ای ڈی ٹیوب",  desc: "Non-dimmable",                  price: 450 },
    { id: 14, cat: "LED & Lighting", emoji: "🔦", name: "Flood Light 50W",   nameUrdu: "فلائٹ لائٹ",      desc: "IP66, outdoor",                 price: 1800 },
    { id: 15, cat: "LED & Lighting", emoji: "🌈", img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/RBG-LED.jpg/330px-RBG-LED.jpg", name: "RGB LED Strip 5m", nameUrdu: "آر جی بی اسٹریپ", desc: "Remote + colour change", price: 1100 },

    { id: 16, cat: "Electrical",   emoji: "🔌", img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Tricklestar_Plug_Strip.jpg/330px-Tricklestar_Plug_Strip.jpg", name: "Extension Board",  nameUrdu: "ایکسٹینشن بورڈ", desc: "4 socket + switch + surge",     price: 850,  popular: true },
    { id: 17, cat: "Electrical",   emoji: "⚙️", name: "Fan Regulator",      nameUrdu: "فین ریگولیٹر",    desc: "Speed controller, knob type",   price: 700 },
    { id: 18, cat: "Electrical",   emoji: "⚡", name: "MCB 32 Amp",         nameUrdu: "ایم سی بی",        desc: "Safety breaker",                price: 550 },
    { id: 19, cat: "Electrical",   emoji: "🔘", name: "Switch & Socket",    nameUrdu: "سچ اور ساکٹ",     desc: "Pack of 6",                     price: 600 },

    { id: 20, cat: "Accessories",  emoji: "📏", img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/RG-59.jpg/330px-RG-59.jpg", name: "Coax Cable (meter)", nameUrdu: "کوکیس کیبل", desc: "RG-6 quality",                   price: 30 },
    { id: 21, cat: "Accessories",  emoji: "🔗", name: "HDMI Cable 1.5m",    nameUrdu: "ایچ ڈی ایم آئی کیبل", desc: "4K support",                 price: 400 },
    { id: 22, cat: "Accessories",  emoji: "📱", name: "Universal AC Remote", nameUrdu: "یونیورسل ریموٹ", desc: "All brands compatible",        price: 750,  popular: true },
    { id: 23, cat: "Accessories",  emoji: "📏", name: "Fan Downrod",        nameUrdu: "فین ڈاؤن راڈ",    desc: "Steel, 1.2m",                   price: 300 },

    { id: 24, cat: "Audio & Handsfree", emoji: "🎧", img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/S%C5%82uchawki_referencyjne_K-701_firmy_AKG.jpg/330px-S%C5%82uchawki_referencyjne_K-701_firmy_AKG.jpg", name: "Over-Ear Headphone", nameUrdu: "ہیڈ فون", desc: "Deep bass, padded",              price: 1200, popular: true },
    { id: 25, cat: "Audio & Handsfree", emoji: "🎧", name: "Bluetooth Headphone", nameUrdu: "بلوٹوتھ ہیڈ فون", desc: "20hr battery, foldable",    price: 2500, popular: true },
    { id: 26, cat: "Audio & Handsfree", emoji: "🎧", img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/JH16_Pro.png/330px-JH16_Pro.png", name: "Wired Handsfree", nameUrdu: "ہینڈفری", desc: "Mic + volume control",           price: 350 },
    { id: 27, cat: "Audio & Handsfree", emoji: "🎶", name: "Wireless Earbuds",  nameUrdu: "وائرلیس ایئر بڈز", desc: "ANC, charging case",         price: 3500 },
    { id: 28, cat: "Audio & Handsfree", emoji: "🔊", name: "Mini BT Speaker",   nameUrdu: "اسپیکر",          desc: "Portable, 10hr playtime",         price: 1800 }
  ]
};
