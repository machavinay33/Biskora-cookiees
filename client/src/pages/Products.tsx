import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  category?: string;
  description?: string;
  price: number;
  highlights?: string[];
  inStock: boolean;
}



const categories = ["All"];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: products, isLoading, refetch } = trpc.product.getAll.useQuery();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    if (products) {
      const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean))) as string[];
      setAvailableCategories(["All", ...uniqueCategories]);
      setFilteredProducts(
        selectedCategory === "All"
          ? products
          : products.filter((p) => p.category === selectedCategory)
      );
    }
  }, [products, selectedCategory]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading products...</div>;
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Cookie Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of premium cookies and dry cakes, each crafted with the finest ingredients and traditional techniques.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {availableCategories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-accent text-accent-foreground"
                  : "hover:border-accent"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                <div className="relative overflow-hidden h-64 bg-muted">
                  <motion.img
                    src="/placeholder-cookie.png"
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">Out of Stock</span>
                    </div>
                  )}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-foreground">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {product.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300"
                    onClick={() => product.inStock ? (window.location.href = "/contact") : null}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Inquire Now" : "Out of Stock"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
