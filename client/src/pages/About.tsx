import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  const values = [
    {
      title: "Purity",
      description: "No chemicals, no shortcuts. Only the finest natural ingredients.",
      icon: "🌿",
    },
    {
      title: "Craftsmanship",
      description: "Each cookie is made with care and attention to detail.",
      icon: "🎨",
    },
    {
      title: "Quality",
      description: "Nutrient-rich ingredients that nourish your body.",
      icon: "✨",
    },
    {
      title: "Indulgence",
      description: "Modern, gourmet flavors that delight the senses.",
      icon: "🍪",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Story
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Biskora is more than just a bakery—it's a commitment to quality, purity, and the art of crafting exceptional cookies and dry cakes that nourish both body and soul.
          </p>
        </motion.div>

        {/* Brand Values */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {values.map((value, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <CardTitle className="font-serif text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-20 bg-card rounded-lg p-8 md:p-12 border border-border"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            At Biskora, we believe that premium quality doesn't have to compromise on health. We're dedicated to creating cookies and dry cakes that are:
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-accent mr-3 font-bold">✓</span>
              <span><strong>Healthy:</strong> Made with nutrient-rich ingredients, whole grains, and natural sweeteners</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 font-bold">✓</span>
              <span><strong>Gourmet:</strong> Featuring unique flavor combinations and premium ingredients</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 font-bold">✓</span>
              <span><strong>Pure:</strong> Free from artificial chemicals, preservatives, and additives</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 font-bold">✓</span>
              <span><strong>Sugar-Free Options:</strong> Perfect for those watching their sugar intake</span>
            </li>
          </ul>
        </motion.div>

        {/* Baking Process */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
            Our Baking Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Process Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg overflow-hidden h-96 md:h-full"
            >
              <img
                src="/manus-storage/biskora-hero-bg_181eebe7.png"
                alt="Baking Process"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Process Steps */}
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Selection",
                  description: "We carefully select the finest ingredients from trusted suppliers.",
                },
                {
                  step: "2",
                  title: "Preparation",
                  description: "Each ingredient is prepared with precision to ensure consistency.",
                },
                {
                  step: "3",
                  title: "Mixing",
                  description: "Our expert bakers blend ingredients using traditional techniques.",
                },
                {
                  step: "4",
                  title: "Baking",
                  description: "Baked to perfection in our state-of-the-art ovens.",
                },
                {
                  step: "5",
                  title: "Quality Check",
                  description: "Every batch undergoes rigorous quality control.",
                },
                {
                  step: "6",
                  title: "Packaging",
                  description: "Carefully packaged to maintain freshness and quality.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-accent-foreground font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8 md:p-12 text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Why Choose Biskora?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We're not just making cookies—we're crafting experiences. Every bite is a testament to our commitment to quality, health, and the joy of indulgence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">25+</div>
              <p className="text-muted-foreground">Unique Varieties</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <p className="text-muted-foreground">Natural Ingredients</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">Fresh</div>
              <p className="text-muted-foreground">Baked Daily</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
