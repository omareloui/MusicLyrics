import { Router } from "express";
import { AppError, HttpCode } from "../../exceptions";
import { LyricsController } from "../../controllers";
import { GetLyricsById, GetLyricsByTitleAndArtist } from "../../validate";

const router = Router();

const lyricsController = new LyricsController();

router.route("/").get(async (_req, res) => {
  const lyrics = await lyricsController.getAll();
  res.send(lyrics);
});

router.route("/:artist/:title").get(async (req, res) => {
  const { artist, title } = req.params;
  const album = req.query.album || (req.query.b as string | undefined);
  const data = GetLyricsByTitleAndArtist.safeParse({ artist, album, title });
  if (!data.success)
    throw new AppError({
      description: `Invalid data: ${data.error.errors
        .map(x => x.message)
        .join(", ")}`,
      httpCode: HttpCode.BAD_REQUEST,
    });

  const lyrics = await lyricsController.getByArtistAndTite(data.data);
  res.send(lyrics);
});

router.route("/:id").get((req, res) => {
  const { id: paramId } = req.params;
  if (!paramId)
    throw new AppError({
      description: "You have to provide and id.",
      httpCode: HttpCode.BAD_REQUEST,
    });

  const data = GetLyricsById.safeParse({ id: paramId });
  if (!data.success)
    throw new AppError({
      description: `Invalid data: ${data.error.errors
        .map(x => x.message)
        .join(", ")}`,
      httpCode: HttpCode.BAD_REQUEST,
    });

  const song = lyricsController.getById(data.data);
  res.send(song);
});

export default router;
