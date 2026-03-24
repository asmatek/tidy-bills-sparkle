import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowRight, Lock, DollarSign, FileText, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import FAQSection from "@/components/FAQSection";

const promises = [
  { icon: <Lock className="w-6 h-6" />, title: "Fixed Rate, Period", desc: "Your rate per kWh is locked in regardless of how much you use. High AC month? Same rate." },
  { icon: <DollarSign className="w-6 h-6" />, title: "No Monthly Fee", desc: "No base charges, service fees, or minimum usage requirements eating into your savings." },
  { icon: <FileText className="w-6 h-6" />, title: "No Hidden Charges", desc: "No usage tiers, no demand charges, no surprise line items. What we quote is what you pay." },
  { icon: <Zap className="w-6 h-6" />, title: "100% Free Service", desc: "Providers pay us when we place your account. You never pay Nova a cent." },
];

const steps = [
  { num: "01", title: "Share Your Bill", desc: "Send us a recent electricity bill or tell us your address and average usage." },
  { num: "02", title: "We Shop 50+ Plans", desc: "We compare rates across dozens of providers to find the best fit for your home." },
  { num: "03", title: "You Save Money", desc: "We handle the switch — no interruption, no hassle. Just a lower bill next month." },
];

const faqItems = [
  { question: "Does my rate change if I use more electricity?", answer: "No. With a Nova residential fixed-rate plan, your rate per kWh is locked in regardless of how much you use. High AC month? Same rate. Low-usage month? Same rate." },
  { question: "Is there any cost to use Nova Energy?", answer: "Zero. Nova Energy is 100% free to customers. We're compensated by the electricity supplier when we place your account — you never pay us a cent." },
  { question: "Will my electricity service be interrupted during the switch?", answer: "No. Your electricity service runs continuously — the switch happens at the infrastructure level. You'll simply see a new supplier name on your next bill." },
  { question: "What happens when my electricity contract ends?", answer: "We reach out before your contract expires to review new options. You're never locked in forever — at renewal time, we find you the best available rate again." },
];

const ResidentialPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative px-[5vw] pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent" />
        <div className="absolute inset-0 hero-grid-bg" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-medium tracking-widest uppercase mb-8"
          >
            Residential Plans
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-5"
          >
            Home Electricity,
            <br />
            <span className="text-gradient-gold">Simplified</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto mb-8 leading-relaxed"
          >
            Fixed-rate plans with no usage tiers, no monthly fees, and no hidden charges. We find your best Texas rate — free.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            href="#quote"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-gold to-warm text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-gold/25"
          >
            Get Your Free Quote <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      {/* Simple Promise */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label="Our Promise"
            labelColor="gold"
            title="What You Get With Nova"
            subtitle="No gimmicks, no asterisks. Just honest electricity at the best rate we can find."
          />
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {promises.map((p, i) => (
              <GlassCard key={i} variant="gold">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold mb-1 text-foreground">{p.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-muted/20 border-y border-border">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            label="How It Works"
            labelColor="gold"
            title="Three Steps to a Lower Bill"
            subtitle="From first contact to savings — all handled in one business day."
            centered
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center font-heading font-bold text-sm text-gold relative z-10">
                  {s.num}
                </div>
                <h4 className="font-heading text-base font-bold text-foreground">{s.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection items={faqItems}>
        <SectionHeader
          label="FAQ"
          labelColor="gold"
          title="Common Questions"
          subtitle="Everything you need to know about switching your home electricity."
        />
      </FAQSection>

      {/* Quote Form */}
      <section id="quote" className="section-padding border-t border-border bg-muted/20">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            label="Get Started"
            labelColor="gold"
            title="Get Your Free Quote"
            subtitle="Fill out the form below and we'll find your best rate within one business day."
            centered
          />
          <div className="glass-card-gold rounded-2xl p-6 md:p-8 mt-10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! We'll be in touch within one business day.");
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">Full Name</label>
                  <input type="text" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-gold/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">Phone</label>
                  <input type="tel" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-gold/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">Email</label>
                <input type="email" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-gold/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">Service Address (City, TX)</label>
                <input type="text" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-gold/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">Average Monthly Usage (kWh)</label>
                <input type="text" placeholder="e.g. 1,200" className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-muted-foreground/50" />
              </div>
              <div className="bg-gold/5 border border-gold/20 rounded-xl px-4 py-3 flex items-start gap-3">
                <span className="text-gold text-lg">📄</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Have a recent bill? Email it to{" "}
                  <a href="mailto:contracts@gonovaenergy.com" className="text-gold font-medium">contracts@gonovaenergy.com</a>{" "}
                  and we'll extract your details automatically.
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold to-warm text-secondary-foreground font-heading font-bold text-sm tracking-wide hover:opacity-90 transition-opacity shadow-lg shadow-gold/25"
              >
                Get My Free Quote →
              </button>
              <p className="text-center text-xs text-muted-foreground">
                No spam. No obligation. Just savings.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResidentialPage;
