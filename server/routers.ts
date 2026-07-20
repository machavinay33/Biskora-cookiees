import { publicProcedure, router, adminProcedure } from "./trpc";
import { z } from "zod";
import { createContactInquiry, getAllContactInquiries, updateContactInquiryStatus, createAdminUser, getAdminUserByEmail, createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "./db";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "./auth";

export const appRouter = router({
  auth: router({
    login: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(1),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const adminUser = await getAdminUserByEmail(input.email);
        if (!adminUser) {
          throw new Error("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(input.password, adminUser.passwordHash);
        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }

        await createSession(ctx.res, adminUser.id, true);
        return { success: true, user: { id: adminUser.id, email: adminUser.email, name: adminUser.name, role: adminUser.role } };
      }),
    logout: adminProcedure.mutation(async ({ ctx }) => {
      deleteSession(ctx.res);
      return { success: true };
    }),
    me: adminProcedure.query(({ ctx }) => {
      if (!ctx.session?.userId) {
        throw new Error("Not authenticated");
      }
      return { id: ctx.session.userId, isAdmin: ctx.session.isAdmin };
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(255),
          email: z.string().email(),
          phone: z.string().min(10).max(20),
          message: z.string().min(10).max(5000),
          orderType: z.string().min(1).max(100),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const inquiry = await createContactInquiry({
            name: input.name,
            email: input.email,
            phone: input.phone,
            message: input.message,
            orderType: input.orderType,
          });

          if (!inquiry) {
            throw new Error("Failed to create contact inquiry");
          }

          return {
            success: true,
            id: inquiry.id,
            message: "Thank you for your inquiry! We will get back to you soon.",
          };
        } catch (error) {
          console.error("[tRPC] Contact submission error:", error);
          throw new Error("Failed to submit contact inquiry");
        }
      }),
    getAll: adminProcedure.query(async () => {
      return await getAllContactInquiries();
    }),
    updateStatus: adminProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["new", "read", "responded"]),
        })
      )
      .mutation(async ({ input }) => {
        const updated = await updateContactInquiryStatus(input.id, input.status);
        if (!updated) {
          throw new Error("Failed to update inquiry status");
        }
        return { success: true, inquiry: updated };
      }),
  }),

  product: router({
    getAll: publicProcedure.query(async () => {
      return await getAllProducts();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getProductById(input.id);
      }),
    create: adminProcedure
      .input(
        z.object({
          name: z.string().min(1).max(255),
          description: z.string().optional(),
          category: z.string().max(100).optional(),
          price: z.number().int().positive(),
          highlights: z.array(z.string()).optional(),
          inStock: z.boolean().default(true),
        })
      )
      .mutation(async ({ input }) => {
        const newProduct = await createProduct(input);
        if (!newProduct) {
          throw new Error("Failed to create product");
        }
        return { success: true, product: newProduct };
      }),
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().min(1).max(255).optional(),
          description: z.string().optional(),
          category: z.string().max(100).optional(),
          price: z.number().int().positive().optional(),
          highlights: z.array(z.string()).optional(),
          inStock: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        const updatedProduct = await updateProduct(id, data);
        if (!updatedProduct) {
          throw new Error("Failed to update product");
        }
        return { success: true, product: updatedProduct };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const success = await deleteProduct(input.id);
        if (!success) {
          throw new Error("Failed to delete product");
        }
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
