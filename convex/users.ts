import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: {
    username: v.string(),
    fullName: v.string(),
    email: v.string(),
    bio: v.optional(v.string()),
    image: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("createUser called with args:", args);

    try {
      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
        .first();

        // await ctx.auth.getUserIdentity() 

      if (existingUser) {
        console.log(`User with clerkId ${args.clerkId} already exists`);
        return { status: "existing_user", userId: existingUser._id };
      }

      const userId = await ctx.db.insert("users", {
        username: args.username,
        fullName: args.fullName,
        email: args.email,
        bio: args.bio,
        image: args.image,
        clerkId: args.clerkId,
        followers: 0,
        following: 0,
        posts: 0,
      });

      console.log(`User created with ID: ${userId}`);
      return { status: "created", userId };
    } catch (error) {
      console.error("Error in createUser mutation:", error);
      throw new Error(`Failed to create user: ${error}`);
    }
  },
});