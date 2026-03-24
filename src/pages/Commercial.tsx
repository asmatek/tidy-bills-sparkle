import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Shield, BarChart3, Clock, Users, FileCheck, Upload, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import FAQSection from "@/components/FAQSection";

const whyItems = [
  { icon: <BarChart3 className="w-6 h-6" />, title: "Load-Profile Analysis", desc: "We analyze your actual usage patterns to find the plan structure that saves you the most." },
  { icon: <Users className="w-6 h-6" />, title: "Multi-Location Bundling", desc: "Multiple locations? We negotiate volume discounts across all your meters." },
  { icon: <Shield className="w-6 h-6" />, title: "Contract Protection", desc: "We review every clause so you understand what you're signing — no surprises." },
  { icon: <Clock className="w-6 h-6" />, title: "Renewal Management", desc: "We track your contract end dates and start shopping your next rate months in advance." },
  { icon: <FileCheck className="w-6 h-6" />, title: "Bill Auditing", desc: "We review your bills for overcharges, incorrect meter reads, and billing errors." },
  { icon: <Building2 className="w-6 h-6" />, title: "All Business Types", desc: "Offices, restaurants, warehouses, retail, medical, industrial — we've done it all." },
];

const billLines = [
  { label: "Energy Charge (1,200 kWh × 8.5¢)", value: "$102.00", tip: "The rate you pay per kWh — this is what Nova negotiates down." },
  { label: "TDU Delivery Charge", value: "$42.50", tip: "Paid to your local utility (Oncor, CenterPoint, etc.) for delivering power." },
  { label: "TDU Metering Charge", value: "$3.42", tip: "Monthly charge for maintaining your electric meter." },
  { label: "Taxes & Fees", value: "$8.12", tip: "State and local taxes applied to your electricity usage." },
];

const billSteps = [
  { title: "Energy Charge", desc: "This is the only line item Nova can change — and it's usually the largest. We negotiate this rate directly." },
  { title: "TDU (Delivery) Charges", desc: "Set by your local utility and the same regardless of provider. Nova can't change these, but we make sure they're correct." },
  { title: "The Nova Difference", desc: "Most businesses overpay 15–30% on their energy charge alone. We find the gap and close it." },
];

const faqItems = [
  { question: "Will switching providers affect my service or cause an outage?", answer: "No. Texas has a deregulated energy market. The physical delivery of power is always handled by your local TDU (like Oncor or CenterPoint). Switching providers only changes who bills you — there is zero interruption." },
  { question: "How does Nova Energy make money if it's free for me?", answer: "Electricity providers pay us a referral fee when you sign up through us — similar to how insurance brokers work. This fee is built into every plan regardless of how you sign up, so using us doesn't cost you anything extra." },
  { question: "What if I'm locked into a contract?", answer: "We check your contract end date and set a reminder to find you a better plan when you're eligible. We can also lock in your renewal rate before your current contract expires." },
];

const CommercialPage = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const names = Array.from(fileList).map((f) => f.name);
    setFiles((prev) => [...prev, ...names]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-[5vw] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-electric/5 via-transparent to-transparent" />
        <div className="absolute inset-0 hero-grid-bg animate-grid-drift" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-electric/25 bg-electric/10 text-electric text-xs font-medium tracking-widest uppercase mb-8"
          >
            ⚡ Commercial Electricity
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          >
            <span className="text-gradient-electric">Commercial Rates</span>
            <br />
            That Mean Business
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
          >
            We compare 50+ commercial electricity plans across Texas and find the rate that fits your business. Free, fast, no obligation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-electric to-electric/80 text-primary-foreground font-semibold text-sm hover:-translate-y-0.5 transition-all shadow-lg shadow-electric/25"
            >
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#bill"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground text-sm hover:border-electric hover:bg-electric/5 transition-all"
            >
              Understand Your Bill
            </a>
          </motion.div>

          {/* Hero stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-10 mt-16 pt-10 border-t border-border flex-wrap"
          >
            {[
              { num: "50+", label: "Plans" },
              { num: "$0", label: "Our Fee" },
              { num: "15-30%", label: "Avg. Savings" },
              { num: "1 Day", label: "Turnaround" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-heading text-2xl font-bold text-foreground">
                  {s.num}
                </p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Nova */}
      <section className="section-padding bg-deep">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="Why Nova"
            title="Built for Business"
            subtitle="From single storefronts to multi-location enterprises, we tailor our service to your operation."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {whyItems.map((item, i) => (
              <GlassCard key={i} variant="electric">
                <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center text-electric mb-4">
                  {item.icon}
                </div>
                <h3 className="font-heading text-base font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How to Read Your Bill */}
      <section id="bill" className="section-padding">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label="Understand Your Bill"
            title="Know What You're Paying For"
            subtitle="Most businesses don't realize how much of their bill is negotiable. Here's a breakdown."
          />
          <div className="grid md:grid-cols-2 gap-10 mt-12 items-start">
            {/* Bill Visual */}
            <GlassCard hover={false}>
              <div className="bg-electric/10 rounded-xl px-4 py-3 mb-5 flex justify-between items-center">
                <span className="font-heading font-bold text-foreground">Sample Commercial Bill</span>
                <span className="font-heading font-bold text-xl text-gold">$156.04</span>
              </div>
              {billLines.map((line, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-border last:border-b-0 text-sm group relative">
                  <span className="text-muted-foreground flex items-center gap-1">
                    {line.label}
                    <span className="inline-flex w-4 h-4 rounded-full bg-electric text-primary-foreground text-[9px] font-bold items-center justify-center cursor-help" title={line.tip}>
                      ?
                    </span>
                  </span>
                  <span className="text-foreground font-medium">{line.value}</span>
                </div>
              ))}
              <div className="bg-gold/5 border border-gold/20 rounded-xl px-4 py-3 mt-5 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <p className="text-xs text-muted-foreground">
                  Most businesses overpay <strong className="text-gold">15–30%</strong> on the energy charge alone.
                </p>
              </div>
            </GlassCard>

            {/* Bill Steps */}
            <div className="space-y-6">
              {billSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric to-electric/70 text-primary-foreground font-bold text-sm flex items-center justify-center flex-shrink-0 font-heading">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold mb-1 text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection items={faqItems}>
        <SectionHeader
          label="FAQ"
          title="Common Questions"
          subtitle="Everything you need to know about commercial electricity brokerage."
        />
      </FAQSection>

      {/* Contact / Upload Form */}
      <section id="contact" className="section-padding relative overflow-hidden">
        <div className="absolute -top-24 -right-48 w-[600px] h-[600px] rounded-full bg-electric/5 blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            {/* Info */}
            <div className="md:col-span-2">
              <SectionHeader
                label="Get Started"
                title="Get Your Custom Rate"
                subtitle="Send us your bill and we'll deliver a custom rate comparison within one business day."
              />
              <div className="mt-8 space-y-5">
                {[
                  { icon: "📊", title: "50+ Plans Compared", desc: "We check every available provider in your area." },
                  { icon: "🔒", title: "No Lock-In Required", desc: "Get your quote with zero obligation." },
                  { icon: "⚡", title: "One Business Day", desc: "Fast turnaround so you can make informed decisions." },
                ].map((f, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-lg">{f.icon}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-0.5">{f.title}</h4>
                      <p className="text-xs text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              <div className="glass-card-electric rounded-2xl p-6 md:p-8">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you! We'll send your custom rate within one business day.");
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">Full Name</label>
                      <input type="text" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-electric/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">Business Name</label>
                      <input type="text" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-electric/50 transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">Email</label>
                      <input type="email" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-electric/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">Phone</label>
                      <input type="tel" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-electric/50 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">Service Address</label>
                    <input type="text" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-electric/50 transition-colors" />
                  </div>

                  {/* Upload zone */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">Upload Your Bill (Optional)</label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors relative ${
                        dragOver ? "border-electric bg-electric/5" : "border-border hover:border-electric/40"
                      }`}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                    >
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={(e) => handleFiles(e.target.files)}
                      />
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-electric">Click to upload</strong> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">PDF, PNG, JPG up to 10MB</p>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {files.map((name, i) => (
                          <div key={i} className="flex items-center justify-between bg-electric/5 border border-electric/15 rounded-lg px-3 py-2 text-sm">
                            <span className="text-foreground truncate">{name}</span>
                            <button type="button" onClick={() => setFiles((f) => f.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive ml-2">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">Notes (Optional)</label>
                    <textarea rows={3} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-electric/50 transition-colors resize-vertical" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-electric to-electric/80 text-primary-foreground font-heading font-bold text-sm tracking-wide hover:-translate-y-0.5 transition-all shadow-lg shadow-electric/25"
                  >
                    Submit & Get Your Rate →
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    Free analysis. No obligation. Your data stays private.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommercialPage;
