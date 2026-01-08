import { z } from "zod";
import { comicSchema } from "./comic";

export const libraryFolderItemSchema = z.object({
  id: z.uuid(),
  folder_id: z.uuid(),
  comic_id: z.uuid(),
  comic: comicSchema.optional(),
  order: z.number(),
  added_at: z.string(),
});

export const libraryFolderSchema = z.object({
  id: z.uuid(),
  user_id: z.uuid(),
  name: z.string(),
  slug: z.string().optional(),
  is_public: z.boolean(),
  is_default: z.boolean(),
  items: z.array(libraryFolderItemSchema).optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const createFolderSchema = z.object({
  name: z
    .string()
    .min(1, "Folder name is required")
    .max(50, "Folder name is too long"),
});

export const libraryCheckSchema = z.object({
  in_library: z.boolean(),
});

export type LibraryFolder = z.infer<typeof libraryFolderSchema>;
export type LibraryFolderItem = z.infer<typeof libraryFolderItemSchema>;
export type CreateFolderInput = z.infer<typeof createFolderSchema>;
