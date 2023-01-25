import { getLyrics } from "../lib/get-lyrics";
import {
  CreateLyrics,
  GetLyricsById,
  GetLyricsByTitleAndArtist,
} from "../validate";

import { PrismaClient } from "@prisma/client";
import { AppError, HttpCode } from "../exceptions";

const prisma = new PrismaClient();

export class LyricsController {
  getAll() {
    return prisma.song.findMany();
  }

  getById({ id }: GetLyricsById) {
    return prisma.song.findUnique({ where: { id } });
  }

  async getByArtistAndTite(info: GetLyricsByTitleAndArtist): Promise<string> {
    const { title, artist } = info;
    const existing = await prisma.song.findFirst({
      where: { title: title.toLowerCase(), artist: artist.toLowerCase() },
      select: { lyrics: true },
    });
    if (existing) return existing.lyrics;

    const lyrics = await getLyrics({ title, artist });
    if (!lyrics)
      throw new AppError({
        description: `Can't find the lyrics for "${title}" by "${artist}".`,
        httpCode: HttpCode.NOT_FOUND,
      });

    await this.create({ ...info, lyrics });

    return lyrics;
  }

  async create({ lyrics, title, artist, album }: CreateLyrics) {
    try {
      const created = await prisma.song.create({
        data: {
          title: title.toLowerCase(),
          artist: artist.toLowerCase(),
          album: album?.toLowerCase(),
          lyrics,
        },
      });
      return created;
    } catch (e) {
      throw new AppError({
        description: "Something went wrong while creating the lyrics entry.",
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
