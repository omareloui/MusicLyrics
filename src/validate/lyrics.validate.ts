import { z } from "zod";

export const CreateLyrics = z.object({
  title: z.string(),
  artist: z.string(),
  album: z.optional(z.string()),
  lyrics: z.string(),
});

export type CreateLyrics = z.infer<typeof CreateLyrics>;

export const GetLyricsByTitleAndArtist = z.object({
  title: z.string(),
  artist: z.string(),
  album: z.optional(z.string()),
});

export type GetLyricsByTitleAndArtist = z.infer<
  typeof GetLyricsByTitleAndArtist
>;

export const GetLyricsById = z.object({
  id: z.string().uuid(),
});

export type GetLyricsById = z.infer<typeof GetLyricsById>;
