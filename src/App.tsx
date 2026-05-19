/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import confetti from 'canvas-confetti';
import {Heart, Sparkles, Stars, Gift, Cloud, Zap, Moon, Bed} from 'lucide-react';
import jusika from './jusika.jpg';

const PopcornIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4" />
    <path d="M10 22 9 8h6l-1 14" />
    <path d="M20 22 18 8" />
    <path d="M4 22 6 8" />
  </svg>
);

const FriesIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 11V7" />
    <path d="M9 11V5" />
    <path d="M13 11V6" />
    <path d="M17 11V8" />
    <path d="M21 11V7" />
    <path d="M5 11h16l-2 11H7L5 11Z" />
  </svg>
);


function BirthdayCounter() {
  const birth = new Date(2003, 4, 20, 0, 0, 0, 0); // May 20, 2003 (month is 0-indexed)
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const thisYearBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate(), 0, 0, 0, 0);
  const lastBirthday = now >= thisYearBirthday
    ? thisYearBirthday
    : new Date(now.getFullYear() - 1, birth.getMonth(), birth.getDate(), 0, 0, 0, 0);

  const ageYears = lastBirthday.getFullYear() - birth.getFullYear();
  const sinceMs = now.getTime() - lastBirthday.getTime();
  const msInDay = 1000 * 60 * 60 * 24;
  const daysSince = Math.floor(sinceMs / msInDay);
  const hoursSince = Math.floor((sinceMs / (1000 * 60 * 60)) % 24);
  const minutesSince = Math.floor((sinceMs / (1000 * 60)) % 60);
  const secondsSince = Math.floor((sinceMs / 1000) % 60);

  return (
    <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-pink-50 shadow-sm">
      <div className="text-sm md:text-base text-stone-600">Current age:</div>
      <div className="text-lg md:text-2xl font-bold text-rose-500">{ageYears} years</div>
      <div className="text-sm md:text-base text-stone-600">+</div>
      <div className="text-lg md:text-2xl font-black text-yellow-400">
        {daysSince}d {String(hoursSince).padStart(2, '0')}:{String(minutesSince).padStart(2, '0')}:{String(secondsSince).padStart(2, '0')}
      </div>
      <div className="text-sm md:text-base text-stone-600">since birthday</div>
    </div>
  );
}

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const startCelebration = () => {
    setHasStarted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff9999', '#bae6fd', '#f5d0fe', '#fef08a', '#fda4af']
    });
    
    setTimeout(() => {
      setShowMessage(true);
    }, 1000);
  };

  useEffect(() => {
    if (hasStarted) {
      const interval = setInterval(() => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#bae6fd', '#fecdd3', '#f5d0fe']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#bae6fd', '#fecdd3', '#f5d0fe']
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [hasStarted]);

  return (
    <div className="min-h-screen bg-anime-magic relative overflow-x-hidden no-scrollbar flex flex-col items-center justify-start md:justify-center p-4 py-8 md:py-4">
      {/* Anime Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ x: ['100%', '-100%'], y: [0, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 opacity-40 text-blue-100"
        >
          <Cloud size={120} />
        </motion.div>
        <motion.div 
          animate={{ x: ['-100%', '100%'], y: [0, -30, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-0 opacity-30 text-rose-100"
        >
          <Cloud size={180} />
        </motion.div>
        
        {/* Floating Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300 opacity-20"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.4, 0.1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5 
            }}
            style={{ 
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%'
            }}
          >
            <Sparkles size={20 + Math.random() * 30} />
          </motion.div>
        ))}
      </div>

      {!hasStarted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10 w-full max-w-sm px-2"
        >
          <div className="bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-4 border-pink-100 shadow-2xl animate-pulse-soft">
            <div className="mb-4 md:mb-6 flex justify-center gap-2">
              <Zap className="text-yellow-400 fill-yellow-200" size={24} />
              <Zap className="text-yellow-400 fill-yellow-200" size={24} />
              <Zap className="text-yellow-400 fill-yellow-200" size={24} />
            </div>
            <h1 className="font-display text-4xl md:text-6xl mb-4 md:mb-6 text-rose-500 font-black tracking-tighter">
              oh ano, saan, sino, bakit, <br/>
              <span className="text-blue-400">sa panong</span><br/>
              paraan?
            </h1>
            <p className="font-sans text-lg md:text-xl mb-8 md:mb-10 text-stone-500 font-medium">
              "akala mo talaga eh"
            </p>
            <button 
              onClick={startCelebration}
              className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-sans font-bold px-8 md:px-12 py-4 md:py-5 rounded-full text-xl md:text-2xl shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center gap-3 md:gap-4 mx-auto group"
            >
              <Sparkles className="group-hover:rotate-45 transition-transform" />
              what the fork?
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="w-full max-w-5xl flex flex-col items-center">
          {/* Main Title with Anime Vibes */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-6 md:mb-10"
          >
            <h1 className="font-display text-5xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-rose-400 to-pink-600 font-black drop-shadow-lg leading-tight uppercase px-2">
              HAPI BORTDAY <br className="md:hidden" /> JUSIKA
            </h1>
            <div className="h-1.5 w-24 md:h-2 md:w-32 bg-yellow-300 mx-auto rounded-full mt-2 md:mt-4" />
          </motion.div>

          {/* Birthday Counter */}
          <div className="text-center mb-6">
            <BirthdayCounter />
          </div>

          <div className="relative">
            {/* Image Frame - Anime Polaroid Style */}
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotate: 10 }}
              animate={{ scale: 1, opacity: 1, rotate: -2 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative z-10 p-3 md:p-5 bg-white shadow-[0_20px_50px_rgba(251,113,133,0.3)] rounded-2xl border-2 border-pink-50 overflow-hidden max-w-[85vw] md:max-w-xl"
            >
                <div className="relative group">
                <img
                  src={jusika}
                  alt="Jusika"
                  className="w-full rounded-xl transition-transform duration-500 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-4 md:mt-6 flex justify-between items-center px-2">
                <span className="font-sans font-bold text-lg md:text-xl text-stone-700 italic">"nyahahah tumatanda ka na"</span>
                <div className="flex gap-2">
                  <Heart className="text-rose-500 fill-rose-500 animate-bounce" size={24} />
                  <Stars className="text-yellow-400 fill-yellow-400 animate-pulse" size={24} />
                </div>
              </div>
            </motion.div>

            {/* Decorative Floating Symbols */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 45, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-12 -right-12 text-blue-400 z-20"
            >
              <Stars size={80} className="drop-shadow-md" />
            </motion.div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-8 -left-12 text-rose-400 z-20"
            >
              <Heart size={80} className="drop-shadow-md" />
            </motion.div>
          </div>

          {/* Festive Message Box */}
          <AnimatePresence>
            {showMessage && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 md:mt-16 text-center max-w-2xl px-4 md:px-6 w-full"
              >
                <div className="bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-4 border-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 md:p-4">
                    <Sparkles className="text-yellow-400" />
                  </div>
                  
                  <p className="font-sans text-xl md:text-3xl font-bold text-stone-800 leading-snug mb-8 md:mb-10">
                    sana magbagong buhay ka na at <br/>
                    <span className="text-rose-500 underline decoration-yellow-300 decoration-4">maging mabait ka na</span><br/>
                    sakin &lt;3
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 md:gap-8">
                    <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center bg-rose-50 p-2 md:p-4 rounded-2xl md:rounded-3xl border-2 border-rose-100">
                      <div className="p-2 md:p-3 bg-white rounded-xl md:rounded-2xl mb-1 md:mb-2 shadow-sm">
                        <Moon size={24} className="text-rose-400" />
                      </div>
                      <span className="text-[8px] md:text-xs uppercase tracking-tighter text-stone-600 font-black">KEEP BEDROTTING</span>
                    </motion.div>
                    <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center bg-blue-50 p-2 md:p-4 rounded-2xl md:rounded-3xl border-2 border-blue-100">
                      <div className="p-2 md:p-3 bg-white rounded-xl md:rounded-2xl mb-1 md:mb-2 shadow-sm">
                        <FriesIcon size={24} />
                      </div>
                      <span className="text-[8px] md:text-xs uppercase tracking-tighter text-stone-600 font-black">Eat Fries</span>
                    </motion.div>
                    <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center bg-purple-50 p-2 md:p-4 rounded-2xl md:rounded-3xl border-2 border-purple-100">
                      <div className="p-2 md:p-3 bg-white rounded-xl md:rounded-2xl mb-1 md:mb-2 shadow-sm">
                        <Bed size={24} className="text-purple-400" />
                      </div>
                      <span className="text-[8px] md:text-xs uppercase tracking-tighter text-stone-600 font-black">MATULOG KA NAMAN</span>
                    </motion.div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <motion.a
                      href="https://upload.wikimedia.org/wikipedia/en/0/04/Philippine_Peso_PHP%E2%82%B11000_Bank_Note.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-sans font-black py-4 px-8 rounded-2xl shadow-xl hover:shadow-emerald-200/50 transition-all text-sm md:text-lg border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1"
                    >
                      <Gift size={24} />
                      regalo ko sayo (tipirin mo)
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Big Sparkle Trigger */}
          <motion.button
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              confetti({
                particleCount: 80,
                spread: 100,
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
              });
            }}
            className="mt-8 mb-20 md:mb-10 p-4 md:p-6 bg-yellow-300 rounded-full shadow-[0_10px_30px_rgba(251,191,36,0.5)] border-4 border-white animate-anime-float"
          >
            <Sparkles size={32} className="text-white md:size-40" />
          </motion.button>
        </div>
      )}

      {/* Falling Anime Sparkles/Hearts */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: Math.random() * 100 + "%", y: "-10%", opacity: 0 }}
            animate={{ 
              y: "110%",
              x: (Math.random() * 100) + "%",
              opacity: [0, 0.8, 0.8, 0],
              rotate: 720
            }}
            transition={{ 
              duration: 8 + Math.random() * 12,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "linear"
            }}
            className="absolute text-pink-300"
          >
            <Heart size={Math.random() * 20 + 10} className={i % 2 === 0 ? "fill-pink-200" : ""} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
