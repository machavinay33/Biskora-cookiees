import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-card border-t border-border mt-20"
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-col items-start">
              <span className="font-serif text-2xl font-bold">
                <span style={{ color: '#5C3317' }}>Bis</span>
                <span style={{ color: '#D4578A' }}>K</span>
                <span style={{ color: '#5C3317' }}>ora</span>
                <sup style={{ color: '#D4578A', fontSize: '0.5em', verticalAlign: 'super' }}>™</sup>
              </span>
              <span className="text-[#5C3317] text-xs font-medium mt-1">YOUR TASTY BITES.</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Premium cookies and dry cakes crafted with purity, quality, and modern indulgence.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-serif font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-muted-foreground hover:text-accent transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/services" className="text-muted-foreground hover:text-accent transition-colors">
                  Services
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-serif font-bold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="tel:+918076329675"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  +91 80763 29675
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918076329675"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@biskora.com"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  info@biskora.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-serif font-bold text-foreground mb-4">Follow Us</h4>
            <div className="space-y-2">
              <a
                href="https://instagram.com/biskoraofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-muted-foreground hover:text-accent transition-colors text-sm"
              >
                Instagram: @biskoraofficial
              </a>
              <p className="text-muted-foreground text-sm">
                📍 New Delhi, India
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground"
        >
          <p>
            &copy; {currentYear} Biskora Cookies. All rights reserved. | Premium Cookies & Dry Cakes
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
