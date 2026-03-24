import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Home, ArrowRight, Shield, Clock, DollarSign, Search, Phone, Repeat } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { num: "50+", label: "Plans Compared" },
  { num: "0¢", label: "Cost to You" },
  { num: "1", label: "Business Day" },
  { num: "TX", label: "Statewide" },
];

const whyItems = [
  { icon: <Search className="w-6 h-6" />, title: "We Shop, You Save", desc: "We compare 50+ electricity plans across Texas so you don't have to. One call, best rate." },
  { icon: <DollarSign className="w-6 h-6" />, title: "100% Free Service", desc: "Providers pay us — you never pay a cent. No hidden fees, no catch." },
  { icon: <Shield className="w-6 h-6" />, title: "Zero Risk", desc: "No interruption to your power. We just change who bills you — same wires, better price." },
  { icon: <Clock className="w-6 h-6" />, title: "Fast Turnaround", desc: "Get a custom quote in one business day. We handle the paperwork and the switch." },
  { icon: <Repeat className="w-6 h-6" />, title: "Renewal Alerts", desc: "We watch your contract and find your next best rate before it expires." },
  { icon: <Phone className="w-6 h-6" />, title: "Personal Support", desc: "Talk to real people who know Texas energy. Not a chatbot — a trusted advisor." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-[5vw] pt-32 pb-20 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 hero-grid-bg animate-grid-drift z-0" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-electric/25 bg-electric/10 text-electric text-xs font-medium tracking-widest uppercase mb-8"
          >
            ⚡ Texas Electricity Broker
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          >
            Lower Your <span className="text-gradient-electric">Electric Bill</span>
            <br />
            Without Lifting a <span className="text-gradient-gold">Finger</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            We shop 50+ Texas electricity plans for your home or business — for free.
            Get a lower rate in one business day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/commercial"
              className="group glass-card-electric rounded-2xl p-6 text-left flex flex-col gap-3 hover:border-electric/30 transition-all duration-300 hover:-translate-y-1 max-w-xs w-full"
            >
              <Building2 className="w-8 h-8 text-electric" />
              <p className="text-[10px] tracking-widest uppercase font-semibold text-electric">Commercial</p>
              <p className="font-heading text-lg font-bold text-foreground">Business Electricity</p>
              <p className="text-xs text-muted-foreground">Offices, restaurants, warehouses & industrial.</p>
              <span className="flex items-center gap-1 text-sm text-electric font-medium mt-1">
                Get Your Rate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="/residential"
              className="group glass-card-gold rounded-2xl p-6 text-left flex flex-col gap-3 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 max-w-xs w-full"
            >
              <Home className="w-8 h-8 text-gold" />
              <p className="text-[10px] tracking-widest uppercase font-semibold text-gold">Residential</p>
              <p className="font-heading text-lg font-bold text-foreground">Home Electricity</p>
              <p className="text-xs text-muted-foreground">Fixed rates, no tiers, no monthly fees.</p>
              <span className="flex items-center gap-1 text-sm text-gold font-medium mt-1">
                Get Your Rate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-[5vw] py-12 border-y border-border bg-muted/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <p className="font-heading text-3xl font-bold text-electric">{s.num}</p>
              <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Nova */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="Why Nova Energy"
            title="Your Energy, Our Expertise"
            subtitle="We handle everything — from rate comparison to contract management. You just enjoy the savings."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {whyItems.map((item, i) => (
              <GlassCard key={i}>
                <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center text-electric mb-4">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding border-t border-border bg-muted/20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <GlassCard variant="electric" hover={false}>
            <span className="inline-block text-[10px] tracking-widest uppercase font-semibold text-electric bg-electric/10 px-3 py-1 rounded-full mb-4">
              Commercial
            </span>
            <h3 className="text-xl font-bold mb-3 text-foreground">Business Electricity Plans</h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Custom rates for offices, restaurants, warehouses, retail, and industrial. We negotiate directly with providers.
            </p>
            <ul className="space-y-2 mb-6">
              {["Custom load-profile analysis", "Multi-location bundling", "Contract renewal management"].map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-electric font-bold mt-0.5">✓</span> {b}
                </li>
              ))}
            </ul>
            <Link to="/commercial" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-electric/40 text-electric text-sm font-medium hover:bg-electric/10 transition-colors">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>

          <GlassCard variant="gold" hover={false}>
            <span className="inline-block text-[10px] tracking-widest uppercase font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full mb-4">
              Residential
            </span>
            <h3 className="text-xl font-bold mb-3 text-foreground">Home Electricity Plans</h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Fixed-rate plans with no usage tiers, no monthly fees, and no hidden charges. Simple and straightforward.
            </p>
            <ul className="space-y-2 mb-6">
              {["Fixed rate per kWh", "No monthly service fee", "No usage-tier pricing"].map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-gold font-bold mt-0.5">✓</span> {b}
                </li>
              ))}
            </ul>
            <Link to="/residential" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gold/40 text-gold text-sm font-medium hover:bg-gold/10 transition-colors">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
