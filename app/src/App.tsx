import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, MapPin, Clock, Star, 
  Instagram, Facebook, Youtube, ChevronRight,
  Dumbbell, Flame, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'PROGRAMS', id: 'programs' },
    { label: 'TIMETABLE', id: 'timetable' },
    { label: 'PRICING', id: 'pricing' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="relative bg-navy-dark min-h-screen">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 lg:px-12 py-4 flex items-center justify-between bg-gradient-to-b from-navy-dark/95 to-transparent backdrop-blur-sm">
        {/* Dragon Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="/dragon-logo.png" 
            alt="GYM NITRO Logo" 
            className="h-14 w-auto logo-glow"
          />
          <div className="hidden sm:block font-display font-black text-xl tracking-tight text-white">
            GYM <span className="text-red-accent">NITRO</span>
          </div>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-mono text-xs uppercase tracking-widest text-white/70 hover:text-red-accent transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Button 
            onClick={() => setBookingDialogOpen(true)}
            className="bg-red-accent text-white font-semibold px-6 py-2 rounded-md hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-red"
          >
            BOOK FREE TRIAL
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button 
            className="absolute top-6 right-6 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={28} />
          </button>
          <img 
            src="/dragon-logo.png" 
            alt="GYM NITRO Logo" 
            className="h-24 w-auto logo-glow mb-4"
          />
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-display font-bold text-2xl uppercase text-white hover:text-red-accent transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Button 
            onClick={() => {
              setMobileMenuOpen(false);
              setBookingDialogOpen(true);
            }}
            className="bg-red-accent text-white font-semibold px-8 py-4 rounded-md mt-4 shadow-red"
          >
            BOOK FREE TRIAL
          </Button>
        </div>
      )}

      {/* Section 1: Hero */}
      <section className="min-h-screen bg-navy-dark relative z-10">
        <div className="absolute inset-0">
          {/* Background Image */}
          <img 
            src="/background.jpg" 
            alt="Gym Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/70 to-navy-dark/50" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 pt-20">
          {/* Left: Logo & Quote */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
            <img 
              src="/dragon-logo.png" 
              alt="GYM NITRO Logo" 
              className="h-32 lg:h-48 w-auto logo-glow mb-6 animate-fade-in-up"
            />
            
            {/* Quote */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <p className="quote-text text-white/80 text-xl lg:text-2xl italic font-light pl-6 mb-2">
                More than just a place to lift
              </p>
              <p className="text-red-accent font-mono text-xs uppercase tracking-widest">
                — A Brotherhood of Iron
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Button 
                onClick={() => setBookingDialogOpen(true)}
                className="bg-red-accent text-white font-semibold px-8 py-6 rounded-md text-base hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-red"
              >
                BOOK FREE TRIAL
              </Button>
              <button 
                onClick={() => scrollToSection('timetable')}
                className="text-white/70 hover:text-red-accent underline underline-offset-4 text-sm flex items-center justify-center gap-2 transition-colors"
              >
                View timetable <ChevronRight size={16} />
              </button>
            </div>
          </div>
          
          {/* Right: Headlines */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <span className="headline-xl text-white block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">VICTORY</span>
              <span className="headline-xl text-red-accent block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">OR DEATH</span>
            </div>
            <p className="mt-6 text-white/60 text-sm lg:text-base max-w-md animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Established 2017 • El Kelâa des Sraghna • 09:00–22:00
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Motivation */}
      <section className="min-h-screen relative z-20">
        <div className="absolute inset-0">
          <img 
            src="/workout.png" 
            alt="Workout" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-dark/70" />
        </div>
        
        <div id="motivation" className={`animate-on-scroll relative z-10 h-screen flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ${isVisible('motivation') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div>
            <h2 className="headline-xl text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">NO PAIN</h2>
            <h2 className="headline-xl text-red-accent text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">NO GAIN</h2>
          </div>
          <p className="mt-8 text-white/70 text-lg max-w-md">
            Show up. Do the work. Repeat.
          </p>
          <Button 
            onClick={() => setBookingDialogOpen(true)}
            className="mt-8 bg-red-accent text-white font-semibold px-10 py-6 rounded-md hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-red"
          >
            JOIN NOW
          </Button>
        </div>
      </section>

      {/* Section 3: Programs */}
      <section id="programs" className={`animate-on-scroll min-h-screen bg-navy-dark z-30 py-20 lg:py-0 flex items-center transition-all duration-1000 ${isVisible('programs') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full flex flex-col lg:flex-row items-center px-6 lg:px-16">
          {/* Left Content */}
          <div className={`lg:w-[45%] mb-12 lg:mb-0 transition-all duration-1000 delay-100 ${isVisible('programs') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <h2 className="headline-lg text-white text-5xl sm:text-6xl lg:text-7xl">MAKE YOUR</h2>
            <h2 className="headline-lg text-red-accent text-5xl sm:text-6xl lg:text-7xl mb-6">BODY</h2>
            <p className="text-white/70 text-base lg:text-lg max-w-md mb-8">
              Small-group classes. Personal coaching. Real progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('timetable')}
                className="bg-red-accent text-white font-semibold px-8 py-6 rounded-md hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-red"
              >
                SEE CLASSES
              </Button>
              <button 
                onClick={() => scrollToSection('trainers')}
                className="text-white/70 hover:text-red-accent underline underline-offset-4 text-sm flex items-center gap-2 transition-colors"
              >
                Meet the trainers <ChevronRight size={16} />
              </button>
            </div>
          </div>
          
          {/* Right Cards */}
          <div className="lg:w-[55%] w-full space-y-4">
            {[
              { title: 'STRENGTH BASE', desc: 'Build power with barbells, dumbbells, and bodyweight.', tag: '45 MIN', icon: Dumbbell },
              { title: 'HIIT BURN', desc: 'Short bursts, big output. Cardio + conditioning.', tag: '30 MIN', icon: Flame },
              { title: 'MOBILITY FLOW', desc: 'Recover, stretch, and move without pain.', tag: '30 MIN', icon: Heart },
            ].map((program, index) => (
              <div 
                key={index}
                className={`glass-card rounded-xl p-6 flex items-start gap-4 hover:border-red-accent/50 transition-all hover:-translate-y-1 cursor-pointer ${isVisible('programs') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="p-3 rounded-lg bg-red-accent/10">
                  <program.icon className="text-red-accent" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-white text-lg">{program.title}</h3>
                    <span className="class-pill">{program.tag}</span>
                  </div>
                  <p className="text-white/60 text-sm">{program.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Trainers */}
      <section id="trainers" className="min-h-screen relative z-40">
        <div className="absolute inset-0">
          <img 
            src="/trainer1.png" 
            alt="Trainer" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/60 to-transparent" />
        </div>
        
        <div id="trainer-section" className={`animate-on-scroll relative z-10 h-screen flex flex-col justify-center px-6 lg:px-16 transition-all duration-1000 ${isVisible('trainer-section') ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`transition-all duration-1000 delay-100 ${isVisible('trainer-section') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <h2 className="headline-lg text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">TRAIN</h2>
            <h2 className="headline-lg text-red-accent text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-8">INSANE</h2>
            <p className="text-white/70 text-base lg:text-lg max-w-md mb-8">
              Coaching that adapts to you—form, pacing, and recovery.
            </p>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="w-fit bg-red-accent text-white font-semibold px-8 py-6 rounded-md hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-red"
            >
              MEET THE TEAM
            </Button>
          </div>
          
          <div className="absolute bottom-8 left-6 lg:left-16 font-mono text-xs uppercase tracking-wider text-white/50">
            COACH YASSINE / STRENGTH & CONDITIONING
          </div>
        </div>
      </section>

      {/* Section 5: Nutrition */}
      <section className="min-h-screen relative z-50">
        <div className="absolute inset-0">
          <img 
            src="/healthy_meal.jpg" 
            alt="Healthy Meal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-navy-dark/80 via-navy-dark/50 to-transparent" />
        </div>
        
        <div id="nutrition" className={`animate-on-scroll relative z-10 h-screen flex flex-col items-end justify-center px-6 lg:px-16 text-right transition-all duration-1000 ${isVisible('nutrition') ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`transition-all duration-1000 delay-100 ${isVisible('nutrition') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            <h2 className="headline-lg text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">EAT</h2>
            <h2 className="headline-lg text-red-accent text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-8">CLEAN</h2>
            <p className="text-white/70 text-base lg:text-lg max-w-md mb-8 ml-auto">
              Simple meal plans that support your training without complicating your life.
            </p>
            <Button 
              onClick={() => setBookingDialogOpen(true)}
              className="w-fit bg-red-accent text-white font-semibold px-8 py-6 rounded-md hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-red"
            >
              GET THE PLAN
            </Button>
            
            <div className="mt-8 flex gap-6 font-mono text-xs uppercase tracking-wide text-white/50 justify-end">
              <span>Macro-friendly</span>
              <span>Prep-friendly</span>
              <span>Flexible swaps</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Pricing */}
      <section id="pricing" className={`animate-on-scroll bg-navy-dark py-20 lg:py-32 px-6 lg:px-16 z-50 transition-all duration-1000 ${isVisible('pricing') ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible('pricing') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="headline-lg text-white text-4xl sm:text-5xl lg:text-6xl mb-4">CHOOSE YOUR PLAN</h2>
          <p className="text-white/60 text-base lg:text-lg">Train weekly or commit monthly—cancel anytime.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {[
            { name: '3 DAYS / WEEK', price: '299', period: 'month', desc: 'Perfect for balance.', features: ['3 sessions/week', 'Open gym access', 'Basic nutrition guide'] },
            { name: '5 DAYS / WEEK', price: '449', period: 'month', desc: 'Most popular for fast progress.', features: ['5 sessions/week', 'Unlimited open gym', 'Personalized nutrition', 'Monthly check-in'], popular: true },
            { name: 'UNLIMITED', price: '599', period: 'month', desc: 'All access + nutrition check-ins.', features: ['Unlimited classes', 'Priority booking', '1-on-1 coaching', 'Full meal plans'] },
          ].map((plan, index) => (
            <div 
              key={index}
              className={`glass-card rounded-2xl p-8 relative hover:-translate-y-1.5 transition-all duration-700 ${plan.popular ? 'border-t-2 border-red-accent' : ''} ${isVisible('pricing') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-accent text-white font-mono text-xs uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-display font-bold text-white text-xl mb-2">{plan.name}</h3>
              <p className="text-white/50 text-sm mb-6">{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-white/50 text-lg">DH</span>
                <span className="font-display font-bold text-white text-4xl">{plan.price}</span>
                <span className="text-white/50 text-sm">/{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => setBookingDialogOpen(true)}
                className={`w-full py-6 rounded-md font-semibold transition-all hover:-translate-y-0.5 ${plan.popular ? 'bg-red-accent text-white hover:bg-red-dark shadow-red' : 'border-2 border-red-accent text-red-accent hover:bg-red-accent hover:text-white'}`}
              >
                START NOW
              </Button>
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${isVisible('pricing') ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            onClick={() => setBookingDialogOpen(true)}
            variant="outline"
            className="border-red-accent text-red-accent hover:bg-red-accent hover:text-white px-10 py-6 rounded-md"
          >
            BOOK FREE TRIAL
          </Button>
        </div>
      </section>

      {/* Section 7: Timetable */}
      <section id="timetable" className={`animate-on-scroll bg-navy-light py-20 lg:py-32 px-6 lg:px-16 z-50 transition-all duration-1000 ${isVisible('timetable') ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`mb-12 transition-all duration-1000 ${isVisible('timetable') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="headline-lg text-white text-4xl sm:text-5xl lg:text-6xl mb-4">WEEKLY SCHEDULE</h2>
          <p className="text-white/60 text-base lg:text-lg">Reserve your spot. Arrive 10 minutes early.</p>
        </div>
        
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="timetable-header text-left">Time</th>
                <th className="timetable-header">Monday</th>
                <th className="timetable-header">Tuesday</th>
                <th className="timetable-header">Wednesday</th>
                <th className="timetable-header">Thursday</th>
                <th className="timetable-header">Friday</th>
                <th className="timetable-header">Saturday</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: '09:00', classes: ['STRENGTH', 'HIIT', 'STRENGTH', 'HIIT', 'STRENGTH', 'OPEN GYM'] },
                { time: '11:00', classes: ['HIIT', 'STRENGTH', 'MOBILITY', 'STRENGTH', 'HIIT', 'STRENGTH'] },
                { time: '13:00', classes: ['OPEN GYM', 'OPEN GYM', 'OPEN GYM', 'OPEN GYM', 'OPEN GYM', 'OPEN GYM'] },
                { time: '17:00', classes: ['STRENGTH', 'HIIT', 'STRENGTH', 'HIIT', 'STRENGTH', '-'] },
                { time: '19:00', classes: ['HIIT', 'MOBILITY', 'HIIT', 'STRENGTH', 'MOBILITY', '-'] },
              ].map((row, index) => (
                <tr key={index} className={`transition-all duration-700 ${isVisible('timetable') ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${200 + index * 50}ms` }}>
                  <td className="timetable-cell font-mono text-white/70">{row.time}</td>
                  {row.classes.map((cls, i) => (
                    <td key={i} className="timetable-cell text-center">
                      {cls !== '-' ? (
                        <span className={`class-pill ${cls === 'OPEN GYM' ? 'bg-white/10 text-white/70' : ''}`}>
                          {cls}
                        </span>
                      ) : (
                        <span className="text-white/30">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {[
            { day: 'Monday', classes: [{ time: '09:00', name: 'STRENGTH' }, { time: '11:00', name: 'HIIT' }, { time: '17:00', name: 'STRENGTH' }, { time: '19:00', name: 'HIIT' }] },
            { day: 'Tuesday', classes: [{ time: '09:00', name: 'HIIT' }, { time: '11:00', name: 'STRENGTH' }, { time: '17:00', name: 'HIIT' }, { time: '19:00', name: 'MOBILITY' }] },
            { day: 'Wednesday', classes: [{ time: '09:00', name: 'STRENGTH' }, { time: '11:00', name: 'MOBILITY' }, { time: '17:00', name: 'STRENGTH' }, { time: '19:00', name: 'HIIT' }] },
          ].map((day, index) => (
            <div key={index} className={`glass-card rounded-xl p-4 transition-all duration-700 ${isVisible('timetable') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${300 + index * 100}ms` }}>
              <h3 className="font-display font-bold text-white mb-3">{day.day}</h3>
              <div className="grid grid-cols-2 gap-2">
                {day.classes.map((cls, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                    <span className="font-mono text-xs text-white/50">{cls.time}</span>
                    <span className="class-pill text-xs">{cls.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: Contact */}
      <section id="contact" className={`animate-on-scroll bg-navy-dark py-20 lg:py-32 px-6 lg:px-16 z-50 transition-all duration-1000 ${isVisible('contact') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div className={`transition-all duration-1000 ${isVisible('contact') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h2 className="headline-lg text-white text-4xl sm:text-5xl mb-8">BOOK YOUR FIRST SESSION</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-white/50 mb-2">Name</label>
                  <Input className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-red-accent" placeholder="Your name" />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-white/50 mb-2">Phone</label>
                  <Input className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-red-accent" placeholder="0678-267729" />
                </div>
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-white/50 mb-2">Email</label>
                <Input className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-red-accent" placeholder="your@email.com" />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-white/50 mb-2">Goal</label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent className="bg-navy-light border-white/10">
                      <SelectItem value="strength">Build Strength</SelectItem>
                      <SelectItem value="weight">Lose Weight</SelectItem>
                      <SelectItem value="endurance">Improve Endurance</SelectItem>
                      <SelectItem value="general">General Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-white/50 mb-2">Preferred Time</label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-navy-light border-white/10">
                      <SelectItem value="morning">Morning (09:00-12:00)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (13:00-16:00)</SelectItem>
                      <SelectItem value="evening">Evening (17:00-22:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-white/50 mb-2">Message</label>
                <Textarea className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-red-accent min-h-[120px]" placeholder="Tell us about your fitness goals..." />
              </div>
              <Button className="w-full bg-red-accent text-white font-semibold py-6 rounded-md hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-red">
                REQUEST BOOKING
              </Button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible('contact') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="rounded-2xl overflow-hidden mb-8">
              <img src="/trainer2.png" alt="Gym" className="w-full h-64 object-cover object-top" />
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-red-accent/10">
                  <Phone className="text-red-accent" size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-1">Phone</h4>
                  <p className="text-white font-semibold">0678-267729</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-red-accent/10">
                  <MapPin className="text-red-accent" size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-1">Address</h4>
                  <p className="text-white font-semibold">3H8M+5J9, El Kelâa des Sraghna</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-red-accent/10">
                  <Clock className="text-red-accent" size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-1">Hours</h4>
                  <p className="text-white font-semibold">Mon–Sat: 09:00–22:00</p>
                  <p className="text-white/50 text-sm">Sunday: Closed</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-red-accent/10">
                  <Star className="text-red-accent" size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-1">Rating</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-red-accent fill-red-accent" size={16} />
                    ))}
                    <span className="text-white font-semibold ml-2">5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Footer */}
      <footer className="bg-navy-dark py-16 px-6 lg:px-16 border-t border-white/10 z-50">
        <div id="footer" className={`animate-on-scroll max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible('footer') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <img 
            src="/dragon-logo.png" 
            alt="GYM NITRO Logo" 
            className="h-20 w-auto logo-glow mx-auto mb-6"
          />
          <h2 className="headline-lg text-white text-3xl sm:text-4xl lg:text-5xl mb-4">STAY CONNECTED</h2>
          <p className="text-white/60 mb-8">Follow the journey. Tag us: <span className="text-red-accent">#GYMNITRO</span></p>
          
          <div className="flex justify-center gap-6 mb-12">
            {[
              { icon: Instagram, href: '#' },
              { icon: Facebook, href: '#' },
              { icon: Youtube, href: '#' },
            ].map((social, index) => (
              <a 
                key={index}
                href={social.href}
                className="p-4 rounded-full bg-white/5 hover:bg-red-accent/20 hover:text-red-accent transition-all hover:-translate-y-1"
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
          
          <div className="font-mono text-xs uppercase tracking-wider text-white/40">
            © GYM NITRO • 5-STAR RATED • 0678-267729
          </div>
        </div>
      </footer>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="bg-navy-light border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-2xl flex items-center gap-3">
              <img src="/dragon-logo.png" alt="Logo" className="h-10 w-auto" />
              BOOK FREE TRIAL
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Fill in your details and we'll contact you to confirm your session.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 mt-4">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-white/50 mb-2">Name</label>
              <Input className="bg-white/5 border-white/10 text-white placeholder:text-white/30" placeholder="Your name" />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-white/50 mb-2">Phone</label>
              <Input className="bg-white/5 border-white/10 text-white placeholder:text-white/30" placeholder="0678-267729" />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-white/50 mb-2">Preferred Day</label>
              <Select>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent className="bg-navy-light border-white/10">
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="tuesday">Tuesday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={() => setBookingDialogOpen(false)}
              className="w-full bg-red-accent text-white font-semibold py-6 rounded-md hover:bg-red-dark shadow-red"
            >
              CONFIRM BOOKING
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
