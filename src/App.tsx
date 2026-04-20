import React, { useEffect, useRef, useState } from 'react';
import { Search, ArrowDown, Facebook, Instagram, Twitter, Dribbble, ArrowUpRight, Play, Zap, Palette, BarChart3, Shield, X } from 'lucide-react';
import { motion, useSpring, useMotionValueEvent, useInView } from 'motion/react';
import Hls from 'hls.js';

function HLSVideo({ src, className, style, desaturate = false }: { src: string, className?: string, style?: any, desaturate?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false });
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }
  }, [src]);

  return (
    <video 
      ref={videoRef} 
      className={className} 
      style={{ ...style, filter: desaturate ? 'saturate(0)' : undefined }}
      autoPlay 
      loop 
      muted 
      playsInline 
    />
  );
}

function BlurText({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: delay / 1000 + i * 0.1 }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMousePos({ x: window.innerWidth / 2 + 200, y: window.innerHeight / 2 });
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full bg-black text-white font-body selection:bg-white/30 overflow-x-hidden">
      
      {/* 1. NAVBAR (fixed, floating) */}
      <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 py-3 flex items-center justify-between pointer-events-auto">
        {/* Left: Logo image */}
        <div className="flex items-center justify-center bg-white/10 rounded-full h-12 w-12 border border-white/20 backdrop-blur-md">
           <Zap className="w-5 h-5 text-white" />
        </div>

        {/* Center: Liquid glass pill navigate */}
        <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1">
          <a href="#" className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors">Home</a>
          <a href="#" className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors">Services</a>
          <a href="#" className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors">Work</a>
          <a href="#" className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors">Process</a>
          <a href="#" className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors">Pricing</a>
          <button className="bg-white text-black font-semibold rounded-full px-4 py-1.5 text-sm ml-2 flex items-center gap-1 hover:bg-gray-200 transition-colors">
            Get Started
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* ORIGINAL ASD FISHES HERO (kept as requested) */}
      <div className="relative w-full h-screen overflow-hidden bg-[#020914] z-10">
        <div className="absolute inset-0 z-0">
          <video 
            src="https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/JellyFish/Hero%20Jelly.mp4"
            autoPlay loop muted playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
          {/* Black fade to blend into next sections smoothly */}
          <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
          <main className="flex-1 flex pointer-events-auto px-8 md:px-16 lg:px-24 relative pt-[12vh] md:pt-[20vh]">
            <div className="relative max-w-xl pl-4 md:pl-16 pt-6 md:pt-10 h-fit">
              <div className="absolute top-0 left-0 w-[40px] md:w-[80px] h-[2px] bg-white hidden md:block"></div>
              <div className="absolute top-0 left-0 w-[2px] h-full bottom-0 bg-white hidden md:block"></div>
              <p className="text-[10px] md:text-sm tracking-[0.4em] uppercase text-white/90 font-medium mb-6 flex items-center gap-4">
                 Beauty of the Ocean
              </p>
              <h1 className="text-6xl md:text-8xl lg:text-[140px] font-heading italic leading-[0.85] tracking-tighter mb-8 text-white drop-shadow-2xl">
                The Beauty of Fish
              </h1>
              <p className="text-sm md:text-base leading-[1.8] text-white/70 max-w-sm md:max-w-2xl font-light tracking-wide">
                Jellyfish are ancient, gelatinous marine invertebrates that have drifted in world oceans for over 500 million years, predating dinosaurs. Composed of over 95% water, they lack brains, hearts, or bones, utilizing trailing tentacles armed with stinging cells (nematocysts) to capture prey. These simple yet resilient creatures range in size from tiny to massive and are crucial to marine ecosystems.
              </p>
            </div>
          </main>

          <footer className="w-full px-8 md:px-16 lg:px-24 py-6 flex items-end justify-between pointer-events-auto pb-6 z-20">
            <div className="flex flex-col gap-6">
              <span className="text-xs md:text-sm font-light text-white/90 whitespace-nowrap">Follow Us</span>
              <div className="flex items-center gap-2 md:gap-3">
                <a href="#" className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Facebook className="w-3 h-3 md:w-4 md:h-4 fill-current" /></a>
                <a href="#" className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Instagram className="w-3 h-3 md:w-4 md:h-4" /></a>
                <a href="#" className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Twitter className="w-3 h-3 md:w-4 md:h-4 fill-current" /></a>
                <a href="#" className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Dribbble className="w-3 h-3 md:w-4 md:h-4" /></a>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <a href="#agency-hero" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white flex items-center justify-center hover:bg-white/20 transition-colors group bg-black/20 backdrop-blur-sm">
                <ArrowDown className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:translate-y-1 transition-transform" />
              </a>
              <div className="text-sm md:text-xl tracking-[0.5em] md:tracking-[0.8em] font-light uppercase pr-2 pl-2">
                WONDER
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* 2. AGENCY HERO SECTION */}
      <section id="agency-hero" className="relative w-full h-[1000px] overflow-hidden bg-black z-0 flex flex-col items-center pt-[150px]">
        {/* Background Video */}
        <video 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          poster="/images/hero_bg.jpeg"
          autoPlay loop muted playsInline
          className="absolute left-0 w-full h-auto min-h-screen object-cover z-0"
          style={{ top: '20%' }}
        />
        <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-b from-transparent to-black pointer-events-none z-0"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <div className="liquid-glass rounded-full px-1 py-1 flex items-center gap-3 mb-8">
            <span className="bg-white text-black rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ml-1">New</span>
            <span className="text-sm font-medium pr-4">Introducing AI-powered web design.</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-3xl tracking-[-2px] md:tracking-[-4px] mb-8 drop-shadow-lg">
            <BlurText text="The Website Your Brand Deserves" delay={100} />
          </h1>

          <motion.p 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-sm md:text-base text-white/80 font-body font-light leading-snug max-w-lg mb-10"
          >
            Stunning design. Blazing performance. Built by AI, refined by experts. This is web design, wildly reimagined.
          </motion.p>

          <motion.div 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex items-center gap-4"
          >
            <a 
              href="https://wa.me/27658024718"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 group hover:text-white/80 transition-colors pointer-events-auto"
            >
              Get Started
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <button 
              onClick={() => setShowVideo(true)}
              className="flex items-center gap-2 px-6 py-3 text-white/80 hover:text-white transition-colors pointer-events-auto"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch the Film
            </button>
          </motion.div>

          {/* Partners Bar */}
          <div className="mt-auto pt-48 pb-8 flex flex-col items-center w-full">
            <div className="liquid-glass rounded-full px-6 py-2 text-xs font-medium text-white/70 tracking-widest uppercase mb-8">
              Trusted by the teams behind
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-2xl md:text-3xl font-heading italic text-white/60">
              <span>Stripe</span>
              <span>Vercel</span>
              <span>Linear</span>
              <span>Notion</span>
              <span>Figma</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLUIDITY SECTION (New 3rd Background Section) */}
      <section className="relative w-full overflow-hidden bg-black flex flex-col items-center justify-center min-h-[800px] py-32 z-10">
        <video 
          src="https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/JellyFish/hf_20260420_190739_faca9778-d483-41d5-9f18-0735680b1ec3.mp4"
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        />
        <div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-black to-transparent z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-black to-transparent z-0 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
          <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white font-body mb-8">
            The Standard
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading italic tracking-tight leading-[0.8] text-white mb-8">
            <BlurText text="Fluidity in every pixel." delay={100} />
          </h2>
          <p className="text-white/70 font-body font-light text-base md:text-lg leading-relaxed max-w-xl mb-12">
            Design that moves with your users. We create interfaces that feel natural, responsive, and alive.
          </p>
        </div>
      </section>

      {/* 9. CTA + FOOTER */}
      <section className="relative w-full overflow-hidden bg-black flex flex-col items-center justify-end min-h-[600px] pt-32 pb-8 z-10">
        <video 
          src="https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/JellyFish/7c92e0f8-01eb-4dfc-9598-50f71bfab508.mp4"
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
        />
        <div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-black to-transparent z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-black to-transparent z-0 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mb-32">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic leading-[0.85] text-white mb-6">
            Your next website starts here.
          </h2>
          <p className="text-white/70 font-body font-light text-base leading-relaxed mb-10 max-w-lg">
            Book a free strategy call. See what AI-powered design can do. No commitment, no pressure. Just possibilities.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
            <a 
              href="https://wa.me/27658024718"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-strong rounded-full px-8 py-3.5 flex items-center gap-2 group text-sm"
            >
              Book a Call
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Footer Bar */}
        <footer className="relative z-10 w-full px-8 md:px-16 mt-auto max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 pointer-events-auto">
          <span className="text-white/40 font-body font-light text-xs mb-4 md:mb-0">
            &copy; 2026 Studio. All rights reserved.
          </span>
          <div className="flex items-center gap-8 text-white/40 font-body font-light text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </footer>
      </section>

      {/* Betta Fish layer, active on the whole screen! */}
      {mounted && <MouseFish mousePos={mousePos} />}

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12">
          <button 
            onClick={() => setShowVideo(false)}
            className="absolute top-8 right-8 text-white hover:text-white/70 transition-colors z-[110]"
          >
            <X className="w-10 h-10" />
          </button>
          <div className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.1)] z-[100] relative">
            <video 
              src="https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/JellyFish/Vortex%20Digi%20Labs%20-%20Intro%20(mini).mp4"
              autoPlay 
              controls 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MouseFish({ mousePos }: { mousePos: { x: number, y: number } }) {
  const springConfig = { damping: 40, stiffness: 80, mass: 1 };
  
  const smoothX = useSpring(mousePos.x, springConfig);
  const smoothY = useSpring(mousePos.y, springConfig);

  const rotation = useRef(0);
  const scaleX = useRef(1);
  const prevX = useRef(window.innerWidth / 2);
  const prevY = useRef(window.innerHeight / 2);
  const imgRef = useRef<HTMLImageElement>(null);

  useMotionValueEvent(smoothX, "change", (latestX) => {
    const latestY = smoothY.get();
    const deltaX = latestX - prevX.current;
    const deltaY = latestY - prevY.current;

    if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
      let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      
      if (deltaX < 0) {
        scaleX.current = -1;
        angle = 180 - angle; 
      } else {
        scaleX.current = 1;
      }
      
      rotation.current = angle * 0.4;
      
      if (imgRef.current) {
        imgRef.current.style.transform = `scaleX(${scaleX.current}) rotate(${rotation.current}deg)`;
      }
    }

    prevX.current = latestX;
    prevY.current = latestY;
  });

  return (
    <motion.div
      className="fixed top-0 left-0 w-[350px] h-[350px] md:w-[600px] md:h-[600px] pointer-events-none z-50 flex items-center justify-center mix-blend-screen drop-shadow-2xl"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%"
      }}
    >
      <img 
        ref={imgRef}
        src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be1?auto=format&fit=crop&q=80&w=800"
        className="w-full h-full object-contain transition-transform duration-200 ease-out"
        style={{
           WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 60%)',
           maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 60%)',
        }}
        alt="Betta Fish"
      />
    </motion.div>
  );
}
