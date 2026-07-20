import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  cta: string;
}

const services: Service[] = [
  {
    id: "wholesale",
    title: "Wholesale",
    description: "Premium cookies and dry cakes for retailers and distributors",
    icon: "📦",
    features: [
      "Bulk quantities available",
      "Competitive wholesale pricing",
      "Custom packaging options",
      "Dedicated account support",
      "Regular delivery schedules",
      "Quality guarantee",
    ],
    cta: "Request Wholesale Quote",
  },
  {
    id: "bulk",
    title: "Bulk Orders",
    description: "Large-scale orders for corporate gifts and events",
    icon: "🎁",
    features: [
      "Minimum order quantities",
      "Custom assortments",
      "Flexible delivery dates",
      "Corporate gifting solutions",
      "Personalized packaging",
      "Special pricing",
    ],
    cta: "Place Bulk Order",
  },
  {
    id: "contract",
    title: "Contract Manufacturing",
    description: "Custom recipe development and production for your brand",
    icon: "🏭",
    features: [
      "Custom recipe development",
      "Your brand specifications",
      "Quality assurance",
      "Flexible production volumes",
      "Packaging design support",
      "Compliance & certifications",
    ],
    cta: "Discuss Contract Manufacturing",
  },
  {
    id: "private-label",
    title: "Private Label",
    description: "Create your own branded cookie line with our expertise",
    icon: "🏷️",
    features: [
      "Brand identity development",
      "Recipe customization",
      "Packaging design",
      "Quality control",
      "Market support",
      "Scalable production",
    ],
    cta: "Start Private Label Program",
  },
];

export default function Services() {
  const [, navigate] = useLocation();

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Whether you're looking for wholesale supply, bulk orders, custom manufacturing, or private label solutions, Biskora has the expertise and capacity to meet your needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <CardTitle className="font-serif text-2xl text-foreground">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-6 flex-1">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-1">✓</span>
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300"
                    onClick={() => navigate("/contact")}
                  >
                    {service.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Partner With Us */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-card rounded-lg p-8 md:p-12 border border-border mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Why Partner With Biskora?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Expertise",
                description: "Decades of baking experience and industry knowledge",
              },
              {
                title: "Quality",
                description: "Rigorous quality control at every step of production",
              },
              {
                title: "Flexibility",
                description: "Customizable solutions tailored to your needs",
              },
              {
                title: "Reliability",
                description: "Consistent delivery and dependable partnerships",
              },
              {
                title: "Innovation",
                description: "Continuous development of new flavors and recipes",
              },
              {
                title: "Support",
                description: "Dedicated account management and customer service",
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
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent/20 text-accent font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8 md:p-12 text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Get in touch with our team to discuss your specific requirements and find the perfect solution for your business.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg"
            onClick={() => navigate("/contact")}
          >
            Contact Our Team
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
