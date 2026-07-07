import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Store, ShoppingBasket, Wheat, Beef, ExternalLink,
  Phone, Clock, Star, Navigation, Layers, Compass, Copy, Check, Map, Activity, Globe
} from "lucide-react";

const STORES = [
  {
    id: "korzinka",
    name: "Korzinka Supermarket",
    icon: Store,
    color: "#10b981",
    description: "Tashkentdagi eng yirik supermarket tarmog'i",
    products: ["Yangi mevalar", "Organik sabzavotlar", "Sut mahsulotlari", "Proteinli taomlar", "Tabiiy choylar"],
    address: "Toshkent shahri, Qoratosh ko'chasi, 5A",
    phone: "+998 71 200-10-01",
    hours: "08:00 – 23:00",
    rating: 4.8,
    lat: 41.3168,
    lng: 69.2435,
    x: 42,
    y: 35,
    mapQuery: "Korzinka supermarket Tashkent",
  },
  {
    id: "oloy",
    name: "Oloy Bozori",
    icon: ShoppingBasket,
    color: "#f59e0b",
    description: "Toshkentning eng mashhur an'anaviy bozori",
    products: ["Yangi sabzavotlar", "Sariq va qizil sabzi", "Baharatlar", "Zog'ora nonlar", "Quruq mevalar"],
    address: "Toshkent, Amir Temur shoh ko'chasi",
    phone: "+998 71 237-54-64",
    hours: "06:00 – 19:00",
    rating: 4.9,
    lat: 41.3235,
    lng: 69.2818,
    x: 52,
    y: 48,
    mapQuery: "Oloy bazaar Tashkent",
  },
  {
    id: "protein",
    name: "Sport & Protein Shop",
    icon: Beef,
    color: "#a855f7",
    description: "Sport ovqatlanish va protein mahsulotlari do'koni",
    products: ["Oqsil kukunlari", "Protein barlar", "Multivitaminlar", "Kreatinlar", "BCAA shakes"],
    address: "Toshkent, Chilonzor 3-kvartal",
    phone: "+998 90 123-45-67",
    hours: "09:00 – 21:00",
    rating: 4.7,
    lat: 41.2783,
    lng: 69.2081,
    x: 28,
    y: 62,
    mapQuery: "Sport protein shop Chilonzor Tashkent",
  },
  {
    id: "healthy",
    name: "Healthy Bakery & Cafe",
    icon: Wheat,
    color: "#3b82f6",
    description: "Sog'lom va organik non, bulka va pishiriqlar",
    products: ["Tam donli nonlar", "Avokadoli tost", "Suli bo'tqalari", "Granola parfe", "Vegan shirinliklar"],
    address: "Toshkent, Mirzo Ulug'bek tumani",
    phone: "+998 91 234-56-78",
    hours: "07:30 – 22:00",
    rating: 4.9,
    lat: 41.3267,
    lng: 69.3275,
    x: 74,
    y: 30,
    mapQuery: "Healthy Bakery Mirzo Ulugbek Tashkent",
  },
  {
    id: "makro",
    name: "Makro Supermarket",
    icon: Store,
    color: "#ef4444",
    description: "Yirik ulgurji-chakana savdo markazi",
    products: ["Premium baliqlar", "Mol go'shti", "Smoothies", "Tabiiy o'tli choylar", "Import ozuqalar"],
    address: "Toshkent, Shayxontohur tumani",
    phone: "+998 71 150-20-20",
    hours: "08:00 – 22:00",
    rating: 4.6,
    lat: 41.3218,
    lng: 69.2312,
    x: 60,
    y: 68,
    mapQuery: "Makro supermarket Shayhantahur Tashkent",
  },
];

const checkIsOpen = (hoursStr: string): boolean => {
  try {
    const now = new Date();
    const tzOffset = 5;
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const uzTime = new Date(utcTime + (3600000 * tzOffset));
    const currentMinutes = uzTime.getHours() * 60 + uzTime.getMinutes();
    const normalized = hoursStr.replace(/\s+/g, "").replace(/–/g, "-");
    const [startStr, endStr] = normalized.split("-");
    const [startH, startM] = startStr.split(":").map(Number);
    const [endH, endM] = endStr.split(":").map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    if (startMinutes <= endMinutes) {
      return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    } else {
      return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
    }
  } catch {
    return true;
  }
};

export function LocationsSection() {
  const [activeStore, setActiveStore] = useState(STORES[0].id);
  const [radarRotation, setRadarRotation] = useState(0);
  const [mapTab, setMapTab] = useState<"hologram" | "google">("google");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const active = STORES.find((s) => s.id === activeStore) ?? STORES[0];

  useEffect(() => {
    setMapLoaded(false);
  }, [activeStore]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarRotation((prev) => (prev + 1.5) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentStoreIsOpen = checkIsOpen(active.hours);
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(active.mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const googleMapDirectUrl = `https://www.google.com/maps/search/${encodeURIComponent(active.mapQuery)}`;

  return (
    <section className="relative overflow-hidden px-4 py-24 bg-background/40 border-t border-white/5">
      <style>{`
        :root:not(.light) .google-map-iframe {
          filter: invert(90%) hue-rotate(180deg) saturate(75%) brightness(95%) contrast(105%);
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/10 h-[500px] w-[500px] rounded-full bg-chart-4/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4.5 py-1.5 text-xs font-bold text-primary uppercase tracking-wider"
          >
            <MapPin className="h-3.5 w-3.5" /> Savdo Nuqtalari
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold md:text-5xl tracking-tight"
          >
            Sog'lom Hayot <span className="text-gradient">Do'konlari</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-muted-foreground font-medium"
          >
            Kerakli organik mahsulotlar va foydali ozuqalarni Toshkent shahridagi hamkor do'kon va bozorlarimizdan tezda topishingiz mumkin.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* Store List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Hamkorlar Ro'yxati</span>
              <span className="text-xs text-primary font-bold flex items-center gap-1.5 bg-primary/10 px-2 py-0.5 rounded-md border border-primary/10">
                <Layers className="h-3 w-3" /> {STORES.length} ta nuqta
              </span>
            </div>

            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {STORES.map((store, i) => {
                const isActive = store.id === activeStore;
                const isOpen = checkIsOpen(store.hours);
                return (
                  <motion.button
                    key={store.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setActiveStore(store.id)}
                    className="w-full text-left rounded-2xl p-4 transition-all duration-300 relative overflow-hidden group border"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, rgba(255,255,255,0.03), ${store.color}08)`
                        : "rgba(255,255,255,0.02)",
                      borderColor: isActive ? `${store.color}50` : "rgba(255,255,255,0.05)",
                      boxShadow: isActive ? `0 10px 30px ${store.color}10, inset 0 0 12px ${store.color}05` : "none",
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-full"
                        style={{ backgroundColor: store.color }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                    <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex items-center gap-3.5 relative z-10">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: isActive ? `${store.color}25` : "rgba(255,255,255,0.05)",
                          border: `1px solid ${isActive ? store.color + "40" : "rgba(255,255,255,0.1)"}`,
                        }}
                      >
                        <store.icon className="h-5 w-5" style={{ color: isActive ? store.color : "#94a3b8" }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`font-bold text-sm transition-colors ${isActive ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                            {store.name}
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                            <span className={`text-[9px] font-bold ${isOpen ? "text-emerald-400" : "text-rose-400"}`}>
                              {isOpen ? "Ochiq" : "Yopiq"}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-white/40 truncate mt-0.5">{store.address}</p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, idx) => (
                              <Star key={idx} className={`h-2.5 w-2.5 ${idx < Math.floor(store.rating) ? "text-yellow-400 fill-yellow-400" : "text-white/15"}`} />
                            ))}
                          </div>
                          <span className="text-[10px] text-white/40 font-bold">{store.rating}</span>
                          <span className="text-[10px] text-white/25">•</span>
                          <span className="text-[10px] text-white/40 flex items-center gap-0.5">
                            <Clock className="h-2.5 w-2.5" /> {store.hours}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Map + Details */}
          <div className="space-y-5">
            {/* Map container */}
            <div className="glass border border-white/5 rounded-[2.2rem] overflow-hidden bg-[#0a0f0d]/50">
              {/* Map header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: active.color }} />
                  <span className="text-sm font-bold text-white/80">{active.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${currentStoreIsOpen ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"}`}>
                    {currentStoreIsOpen ? "● Ochiq" : "● Yopiq"}
                  </span>
                </div>

                <div className="flex bg-black/40 border border-white/5 p-1 rounded-xl gap-1 backdrop-blur-md">
                  <button
                    onClick={() => setMapTab("hologram")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative ${mapTab === "hologram" ? "text-primary" : "text-white/40 hover:text-white/60"}`}
                  >
                    {mapTab === "hologram" && (
                      <motion.div
                        layoutId="activeMapTab"
                        className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Compass className="h-3.5 w-3.5 relative z-10" />
                    <span className="relative z-10">Hologramma</span>
                  </button>
                  <button
                    onClick={() => setMapTab("google")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative ${mapTab === "google" ? "text-primary" : "text-white/40 hover:text-white/60"}`}
                  >
                    {mapTab === "google" && (
                      <motion.div
                        layoutId="activeMapTab"
                        className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Globe className="h-3.5 w-3.5 relative z-10" />
                    <span className="relative z-10">Google Maps</span>
                  </button>
                </div>
              </div>

              {/* Map View */}
              <div className="relative h-[420px] w-full overflow-hidden bg-gradient-to-br from-[#060c09] to-[#040810]">
                <AnimatePresence mode="wait">
                  {mapTab === "hologram" ? (
                    <motion.div
                      key="hologram"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {/* Grid */}
                      <svg className="absolute inset-0 h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="radar-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(16,185,129,0.03)" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#radar-grid)" />
                        <path d="M -50 180 Q 220 80 400 240 Q 550 320 750 200" stroke="rgba(16,185,129,0.05)" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <path d="M 150 -50 Q 200 200 350 250 Q 520 310 650 420" stroke="rgba(59,130,246,0.04)" strokeWidth="6" fill="none" strokeLinecap="round" />
                        <path d="M 0 280 Q 320 230 450 110 Q 580 -10 800 70" stroke="rgba(168,85,247,0.03)" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <path d="M 320 -50 L 320 500" stroke="rgba(255,255,255,0.015)" strokeWidth="1.5" strokeDasharray="6,6" />
                        <path d="M -50 220 L 850 220" stroke="rgba(255,255,255,0.015)" strokeWidth="1.5" strokeDasharray="6,6" />
                      </svg>

                      {/* Radar sweep */}
                      <div
                        className="absolute pointer-events-none origin-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
                        style={{
                          background: "conic-gradient(from 0deg, rgba(16,185,129,0.08) 0deg, rgba(16,185,129,0) 90deg)",
                          transform: `translate(-50%, -50%) rotate(${radarRotation}deg)`,
                        }}
                      />

                      {/* HUD overlays */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/50 border border-white/5 rounded-lg px-2.5 py-1 backdrop-blur text-[10px] text-white/50 font-bold uppercase tracking-wider">
                        <Compass className="h-3 w-3 text-primary animate-spin" style={{ animationDuration: "12s" }} />
                        <span>GRID SYSTEM ACTIVE</span>
                      </div>
                      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/50 border border-white/5 rounded-lg px-2.5 py-1 backdrop-blur text-[10px] text-primary font-bold uppercase tracking-wider">
                        <Activity className="h-3 w-3 animate-pulse" />
                        <span>TASHKENT_SEC_01</span>
                      </div>
                      <div className="absolute bottom-4 right-4 z-10 font-mono text-[9px] text-white/40 space-y-0.5 text-right pointer-events-none bg-black/30 p-2 rounded border border-white/5 backdrop-blur-sm">
                        <div>LAT: {active.lat}° N</div>
                        <div>LNG: {active.lng}° E</div>
                        <div className="text-primary font-bold">SYNC: SECURE_LINK</div>
                      </div>

                      {/* Active target reticle */}
                      <motion.div
                        initial={false}
                        animate={{ left: `${active.x}%`, top: `${active.y}%` }}
                        transition={{ type: "spring", stiffness: 90, damping: 15 }}
                        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-30"
                      >
                        <div className="relative w-16 h-16 flex items-center justify-center">
                          <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2" style={{ borderColor: active.color }} />
                          <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2" style={{ borderColor: active.color }} />
                          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2" style={{ borderColor: active.color }} />
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2" style={{ borderColor: active.color }} />
                          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: active.color }} />
                        </div>
                      </motion.div>

                      {/* Store pins */}
                      {STORES.map((store) => {
                        const isActive = store.id === activeStore;
                        return (
                          <button
                            key={store.id}
                            onClick={() => setActiveStore(store.id)}
                            className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
                            style={{ left: `${store.x}%`, top: `${store.y}%` }}
                          >
                            {isActive && (
                              <motion.div
                                animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-full"
                                style={{ background: store.color }}
                              />
                            )}
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                              transition={isActive ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
                              className="relative flex h-10 w-10 items-center justify-center rounded-xl shadow-2xl transition-all border"
                              style={{
                                background: isActive ? store.color : "rgba(10,12,18,0.92)",
                                borderColor: store.color,
                                boxShadow: isActive ? `0 0 25px ${store.color}70` : `0 4px 12px rgba(0,0,0,0.5)`,
                              }}
                            >
                              <store.icon className="h-5 w-5" style={{ color: isActive ? "#ffffff" : store.color }} />
                            </motion.div>
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/90 border border-white/10 px-2 py-0.5 text-[9px] font-bold text-white opacity-40 group-hover:opacity-100 transition-opacity backdrop-blur">
                              {store.name}
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`google-${activeStore}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full bg-[#0a0a0c]"
                    >
                      {!mapLoaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070c0b] gap-3 z-10">
                          <div className="relative">
                            <span className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin block" />
                            <Globe className="absolute inset-0 m-auto h-4 w-4 text-primary/50" />
                          </div>
                          <span className="text-xs font-bold text-white/50 tracking-wider">Google Maps yuklanmoqda...</span>
                          <span className="text-[10px] text-white/25">{active.address}</span>
                        </div>
                      )}
                      <iframe
                        key={activeStore}
                        title={active.name}
                        src={googleMapEmbedUrl}
                        width="100%"
                        height="100%"
                        className="border-0 w-full h-full transition-opacity duration-700 google-map-iframe"
                        style={{ opacity: mapLoaded ? 1 : 0 }}
                        onLoad={() => setMapLoaded(true)}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Store Details Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStore}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-[2rem] p-6 relative overflow-hidden"
                style={{
                  border: `1px solid ${active.color}25`,
                  background: `linear-gradient(145deg, rgba(10,15,12,0.98), rgba(6,8,12,0.98))`,
                  boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 40px ${active.color}05`,
                }}
              >
                <div className="absolute top-0 inset-x-0 h-[1.5px]" style={{ backgroundColor: active.color }} />

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
                      style={{ background: `${active.color}15`, borderColor: `${active.color}30` }}
                    >
                      <active.icon className="h-7 w-7" style={{ color: active.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{active.name}</h3>
                      <p className="text-sm text-white/50 mt-0.5">{active.description}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.floor(active.rating) ? "text-yellow-400 fill-yellow-400" : "text-white/20"}`} />
                        ))}
                        <span className="text-xs text-white/50 font-bold ml-1">({active.rating})</span>
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${currentStoreIsOpen ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${currentStoreIsOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                    {currentStoreIsOpen ? "Hozir Ochiq" : "Hozir Yopiq"}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div
                    onClick={() => handleCopy(active.address)}
                    className="glass rounded-xl p-3 border border-white/[0.04] flex items-center justify-between gap-3 cursor-pointer group hover:bg-white/[0.03] hover:border-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                        <MapPin className="h-4 w-4 text-primary" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Manzil</div>
                        <div className="text-xs text-white/80 font-semibold truncate">{active.address}</div>
                      </div>
                    </div>
                    <button className="text-white/30 group-hover:text-primary transition-colors shrink-0">
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  <a
                    href={`tel:${active.phone.replace(/\s+/g, "")}`}
                    className="glass rounded-xl p-3 border border-white/[0.04] flex items-center gap-3 hover:bg-white/[0.03] hover:border-white/10 transition-all group"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                      <Phone className="h-4 w-4 text-primary" />
                    </span>
                    <div>
                      <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Telefon</div>
                      <div className="text-xs text-white/80 font-semibold group-hover:text-primary transition-colors">{active.phone}</div>
                    </div>
                  </a>

                  <div className="glass rounded-xl p-3 border border-white/[0.04] flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                      <Clock className="h-4 w-4 text-primary" />
                    </span>
                    <div>
                      <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Ish vaqti</div>
                      <div className="text-xs text-white/80 font-semibold">{active.hours}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-2.5 text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-primary" /> Mavjud Mahsulotlar:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.products.map((p) => (
                      <span
                        key={p}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-white/80 transition-all hover:border-primary/20 hover:text-white hover:-translate-y-0.5 cursor-default"
                      >
                        ✦ {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <motion.a
                    href={googleMapDirectUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white shadow-xl transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${active.color}, ${active.color}cc)`,
                      boxShadow: `0 10px 25px ${active.color}30`,
                    }}
                  >
                    <Navigation className="h-4 w-4" />
                    Google Maps da ko'rish
                    <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                  </motion.a>

                  <motion.button
                    onClick={() => setMapTab("google")}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold border border-white/10 glass transition-all hover:border-primary/20"
                  >
                    <Map className="h-4 w-4 text-primary" />
                    Xaritada ko'rish
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
