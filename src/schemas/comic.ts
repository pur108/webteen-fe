import { z } from "zod";

export const tagTranslationSchema = z.object({
  id: z.string(),
  tag_id: z.string(),
  language: z.string(),
  name: z.string(),
});

export const tagSchema = z.object({
  id: z.string(),
  slug: z.string(),
  type: z.string(),
  translations: z.array(tagTranslationSchema).optional().nullable(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const creatorSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().optional(),
  role: z.string().optional(),
  avatar: z.string().nullable().optional(),
  is_banned: z.boolean().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const comicTranslationSchema = z.object({
  id: z.string(),
  comic_id: z.string(),
  language_code: z.string(),
  title: z.string(),
  synopsis: z.string().optional().nullable(),
  alternative_title: z.string().optional().nullable(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const chapterTranslationSchema = z.object({
  id: z.string(),
  chapter_id: z.string(),
  language_code: z.string(),
  title: z.string().optional().nullable(),
});

export const chapterImageSchema = z.object({
  id: z.string(),
  chapter_id: z.string(),
  image_url: z.string(),
  order: z.number(),
});

export const chapterSchema = z.object({
  id: z.string(),
  comic_id: z.string(),
  chapter_number: z.number(),
  status: z
    .enum([
      "chapter_draft",
      "chapter_pending_review",
      "chapter_scheduled",
      "chapter_published",
      "chapter_rejected",
    ])
    .optional(),
  thumbnail_url: z.string().optional().nullable(),
  published_at: z.string().nullable().optional(),
  images: z.array(chapterImageSchema).optional().nullable(),
  translations: z.array(chapterTranslationSchema).optional().nullable(),
});

export const comicSchema = z.object({
  id: z.string(),
  creator_id: z.string(),
  creator: creatorSchema.optional().nullable(),
  tags: z.array(tagSchema).optional().nullable(),
  cover_image_url: z.string(),
  publish_status: z.enum([
    "comic_draft",
    "comic_pending_review",
    "comic_scheduled",
    "comic_published",
    "comic_rejected",
  ]),
  serialization_status: z.enum(["ongoing", "completed", "hiatus"]).optional(),
  visibility: z.string().optional(),
  nsfw: z.boolean().optional(),
  schedule_publish_at: z.string().nullable().optional(),
  approved_at: z.string().nullable().optional(),
  rejection_reason: z.string().optional().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  translations: z.array(comicTranslationSchema).optional().nullable(),
  chapters: z.array(chapterSchema).optional().nullable(),
  views: z.number().optional(),
});

export const comicsResponseSchema = z.array(comicSchema);

export const comicAuthorSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export const createComicSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  cover_image_url: z.url("Please upload a cover image"),
  tags: z.array(z.uuid()).optional(),
  translations: z
    .array(
      z.object({
        language: z.string(),
        title: z.string(),
        description: z.string().optional(),
      })
    )
    .optional(),
});

export const createChapterSchema = z.object({
  chapter_number: z.number().min(1, "Chapter number is required"),
  image_urls: z.array(z.url()).min(1, "At least one page is required"),
  translations: z
    .array(
      z.object({
        language: z.string(),
        title: z.string().optional(),
      })
    )
    .optional(),
});

export type Tag = z.infer<typeof tagSchema>;
export type Comic = z.infer<typeof comicSchema>;
export type Chapter = z.infer<typeof chapterSchema>;
export type ChapterImage = z.infer<typeof chapterImageSchema>;
export type CreateComicInput = z.infer<typeof createComicSchema>;
export type CreateChapterInput = z.infer<typeof createChapterSchema>;
