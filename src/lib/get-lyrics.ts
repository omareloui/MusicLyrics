import { getLyrics as getLyricsFromGenius } from "genius-lyrics-api";

export async function getLyrics({
  title,
  artist,
}: {
  title: string;
  artist: string;
}): Promise<string> {
  const token = process.env.GENIUS_CLIENT_ACCESS_TOKEN;
  if (!token) throw new Error("You have to provide a token for Genius.");

  const options = {
    apiKey: token,
    title,
    artist,
    optimizeQuery: true,
  };
  const lyrics = await getLyricsFromGenius(options);
  return lyrics;
}
