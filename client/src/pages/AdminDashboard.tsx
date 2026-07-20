import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z.preprocess(
    (val) => Number(val), 
    z.number().int().positive("Price must be a positive integer").min(1, "Price must be at least 1")), // Price in cents
  highlights: z.string().optional(), // Comma separated string for highlights
  inStock: z.boolean().default(true),
});

type ProductFormInputs = z.infer<typeof productSchema>;

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { data: authStatus, isLoading: isLoadingAuth } = trpc.auth.me.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation();

  const { data: inquiries, isLoading: isLoadingInquiries, refetch: refetchInquiries } = trpc.contact.getAll.useQuery();
  const updateInquiryStatusMutation = trpc.contact.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Inquiry status updated!");
      refetchInquiries();
    },
    onError: (error) => {
      toast.error(`Failed to update inquiry status: ${error.message}`);
    },
  });

  const { data: products, isLoading: isLoadingProducts, refetch: refetchProducts } = trpc.product.getAll.useQuery();
  const createProductMutation = trpc.product.create.useMutation({
    onSuccess: () => {
      toast.success("Product created successfully!");
      refetchProducts();
      setOpenAddProductDialog(false);
    },
    onError: (error) => {
      toast.error(`Failed to create product: ${error.message}`);
    },
  });
  const updateProductMutation = trpc.product.update.useMutation({
    onSuccess: () => {
      toast.success("Product updated successfully!");
      refetchProducts();
      setOpenEditProductDialog(false);
    },
    onError: (error) => {
      toast.error(`Failed to update product: ${error.message}`);
    },
  });
  const deleteProductMutation = trpc.product.delete.useMutation({
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      refetchProducts();
    },
    onError: (error) => {
      toast.error(`Failed to delete product: ${error.message}`);
    },
  });

  const [activeTab, setActiveTab] = useState("inquiries");
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [openEditProductDialog, setOpenEditProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const { register: registerProduct, handleSubmit: handleSubmitProduct, formState: { errors: productErrors }, reset: resetProductForm } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
  });

  const { register: registerEditProduct, handleSubmit: handleSubmitEditProduct, formState: { errors: editProductErrors }, reset: resetEditProductForm } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
  });

  if (isLoadingAuth) {
    return <div className="flex justify-center items-center min-h-screen">Loading authentication...</div>;
  }

  if (!authStatus?.isAdmin) {
    navigate("/admin/login");
    return null;
  }

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success("Logged out successfully!");
      navigate("/admin/login");
    } catch (error: any) {
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  const handleUpdateInquiryStatus = (id: number, status: string) => {
    updateInquiryStatusMutation.mutate({ id, status: status as any });
  };

  const handleAddProduct = async (data: ProductFormInputs) => {
    const highlightsArray = data.highlights ? data.highlights.split(",").map(s => s.trim()) : [];
    await createProductMutation.mutateAsync({ ...data, highlights: highlightsArray });
  };

  const handleEditProduct = async (data: ProductFormInputs) => {
    if (!editingProduct) return;
    const highlightsArray = data.highlights ? data.highlights.split(",").map(s => s.trim()) : [];
    await updateProductMutation.mutateAsync({ id: editingProduct.id, ...data, highlights: highlightsArray });
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProductMutation.mutateAsync({ id });
    }
  };

  const openEditDialog = (product: any) => {
    setEditingProduct(product);
    resetEditProductForm({ ...product, highlights: product.highlights?.join(", ") });
    setOpenEditProductDialog(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="secondary">
          Logout
        </Button>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-card border-r border-border p-4">
          <nav className="space-y-2">
            <Button variant={activeTab === "inquiries" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("inquiries")}>
              Inquiries
            </Button>
            <Button variant={activeTab === "products" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("products")}>
              Products
            </Button>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-muted/40">
          {activeTab === "inquiries" && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingInquiries ? (
                  <div>Loading inquiries...</div>
                ) : inquiries && inquiries.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Order Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inquiries.map((inquiry) => (
                        <TableRow key={inquiry.id}>
                          <TableCell>{inquiry.id}</TableCell>
                          <TableCell>{inquiry.name}</TableCell>
                          <TableCell>{inquiry.email}</TableCell>
                          <TableCell>{inquiry.phone}</TableCell>
                          <TableCell>{inquiry.orderType}</TableCell>
                          <TableCell>
                            <Select
                              value={inquiry.status}
                              onValueChange={(value) => handleUpdateInquiryStatus(inquiry.id, value)}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="read">Read</SelectItem>
                                <SelectItem value="responded">Responded</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">View Message</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Message from {inquiry.name}</DialogTitle>
                                  <DialogDescription>{inquiry.email} | {inquiry.phone}</DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <p>{inquiry.message}</p>
                                </div>
                                <DialogFooter>
                                  <Button type="button" onClick={() => handleUpdateInquiryStatus(inquiry.id, "read")}>Mark as Read</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No inquiries found.</p>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "products" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Products Management</CardTitle>
                <Dialog open={openAddProductDialog} onOpenChange={setOpenAddProductDialog}>
                  <DialogTrigger asChild>
                    <Button onClick={() => resetProductForm()}>Add New Product</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                      <DialogDescription>Fill in the details for the new product.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitProduct(handleAddProduct)} className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" {...registerProduct("name")} className="col-span-3" />
                        {productErrors.name && <p className="col-span-4 text-red-500 text-sm text-right">{productErrors.name.message}</p>}
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Textarea id="description" {...registerProduct("description")} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                        <Input id="category" {...registerProduct("category")} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Price (in cents)</Label>
                        <Input id="price" type="number" {...registerProduct("price")} className="col-span-3" />
                        {productErrors.price && <p className="col-span-4 text-red-500 text-sm text-right">{productErrors.price.message}</p>}
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="highlights" className="text-right">Highlights (comma-separated)</Label>
                        <Input id="highlights" {...registerProduct("highlights")} className="col-span-3" />
                      </div>
                      <div className="flex items-center space-x-2 col-span-4 justify-end">
                        <Checkbox id="inStock" {...registerProduct("inStock")} />
                        <Label htmlFor="inStock">In Stock</Label>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Product</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {isLoadingProducts ? (
                  <div>Loading products...</div>
                ) : products && products.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.id}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${(product.price / 100).toFixed(2)}</TableCell>
                          <TableCell>{product.inStock ? "In Stock" : "Out of Stock"}</TableCell>
                          <TableCell className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>Edit</Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No products found.</p>
                )}

                {/* Edit Product Dialog */}
                <Dialog open={openEditProductDialog} onOpenChange={setOpenEditProductDialog}>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                      <DialogDescription>Modify the details of the product.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitEditProduct(handleEditProduct)} className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">Name</Label>
                        <Input id="edit-name" {...registerEditProduct("name")} className="col-span-3" />
                        {editProductErrors.name && <p className="col-span-4 text-red-500 text-sm text-right">{editProductErrors.name.message}</p>}
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-description" className="text-right">Description</Label>
                        <Textarea id="edit-description" {...registerEditProduct("description")} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-category" className="text-right">Category</Label>
                        <Input id="edit-category" {...registerEditProduct("category")} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-price" className="text-right">Price (in cents)</Label>
                        <Input id="edit-price" type="number" {...registerEditProduct("price")} className="col-span-3" />
                        {editProductErrors.price && <p className="col-span-4 text-red-500 text-sm text-right">{editProductErrors.price.message}</p>}
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-highlights" className="text-right">Highlights (comma-separated)</Label>
                        <Input id="edit-highlights" {...registerEditProduct("highlights")} className="col-span-3" />
                      </div>
                      <div className="flex items-center space-x-2 col-span-4 justify-end">
                        <Checkbox id="edit-inStock" {...registerEditProduct("inStock")} />
                        <Label htmlFor="edit-inStock">In Stock</Label>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
