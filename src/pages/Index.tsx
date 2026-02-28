import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Zap, CheckCircle, BookOpen, Atom, Code, FlaskConical, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const steps = [
  { icon: MessageCircle, title: "Ask Your Doubt", desc: "Type your question, attach images, and select the subject." },
  { icon: Zap, title: "Get Matched", desc: "Your doubt is routed to the best available expert instantly." },
  { icon: CheckCircle, title: "Learn & Excel", desc: "Receive a detailed answer and track your learning progress." },
];

const subjects = [
  { icon: BookOpen, name: "Mathematics" },
  { icon: Atom, name: "Physics" },
  { icon: Code, name: "Computer Science" },
  { icon: FlaskConical, name: "Biology" },
];

const testimonials = [
  { name: "Priya S.", grade: "12th Science", text: "DoubtDesk helped me crack my calculus exam. The answers are super detailed!", rating: 5 },
  { name: "Arjun K.", grade: "11th Commerce", text: "Love the UI and how fast I get answers. Best platform for students!", rating: 5 },
  { name: "Neha R.", grade: "10th", text: "The image upload feature is a game-changer. I can snap my textbook and ask!", rating: 4 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/30 backdrop-blur-sm" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6 text-primary-foreground drop-shadow-lg"
          >
            Ask. Learn. <span className="gradient-text">Excel.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto"
          >
            Your academic doubts solved instantly. Ask questions, upload images, and get expert answers — all in one place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register">
              <Button size="lg" className="gradient-bg text-primary-foreground border-0 rounded-full px-8 text-base">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-background bg-background/20 text-background backdrop-blur-sm hover:bg-background/40">
                Login
              </Button>
            </Link>
          </motion.div>

          {/* Floating cards */}
          <div className="absolute top-1/4 left-8 hidden lg:block animate-float">
            <div className="glass-card p-3 px-4 text-sm text-left">
              <span className="text-primary font-semibold">Q:</span> What is Pythagoras theorem?
            </div>
          </div>
          <div className="absolute top-1/3 right-12 hidden lg:block animate-float-delayed">
            <div className="glass-card p-3 px-4 text-sm text-left">
              <span className="text-secondary font-semibold">Q:</span> Explain photosynthesis
            </div>
          </div>
          <div className="absolute bottom-1/4 left-1/4 hidden lg:block animate-float-slow">
            <div className="glass-card p-3 px-4 text-sm text-left">
              <span className="status-answered">✓ Answered</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-24 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl md:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-lg mx-auto">
            Three simple steps to get your doubts resolved
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="glass-card p-8 text-center hover-lift"
            >
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="font-display text-3xl md:text-4xl font-bold text-center mb-16">
            Subjects <span className="gradient-text">Supported</span>
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {subjects.map((s, i) => (
              <motion.div
                key={s.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="glass-card p-6 text-center hover-lift cursor-pointer"
              >
                <s.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="font-display font-semibold">{s.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 container mx-auto px-4">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="font-display text-3xl md:text-4xl font-bold text-center mb-16">
          What Students <span className="gradient-text">Say</span>
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="glass-card p-8 hover-lift"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-display font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.grade}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md gradient-bg flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xs">D</span>
            </div>
            <span className="font-display font-semibold">DoubtDesk</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 DoubtDesk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
