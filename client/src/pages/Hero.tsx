import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Hero() {
  const [, navigate] = useLocation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-background">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo/Brand */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex flex-col items-center">
            <span className="font-serif text-6xl font-bold">
              <span style={{ color: '#5C3317' }}>Bis</span>
              <span style={{ color: '#D4578A' }}>K</span>
              <span style={{ color: '#5C3317' }}>ora</span>
              <sup style={{ color: '#D4578A', fontSize: '0.5em', verticalAlign: 'super' }}>™</sup>
            </span>
            <span className="text-[#5C3317] text-lg md:text-xl font-medium mt-2">YOUR TASTY BITES.</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight"
        >
          Premium Cookies & Dry Cakes
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="tagline text-amber-900 mb-8 text-lg md:text-xl"
        >
          Premium Cookies & Dry Cakes | Healthy • Gourmet • Sugar-Free
        </motion.p>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Crafted with pure ingredients, no chemicals, no shortcuts. Experience the perfect blend of purity, rich taste, and modern indulgence in every bite.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/products")}
          >
            Explore Products
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg rounded-lg border-2 border-accent hover:bg-accent/10 transition-all duration-300"
            onClick={() => navigate("/contact")}
          >
            Get in Touch
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-muted-foreground text-sm">Scroll to explore</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
