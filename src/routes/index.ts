import "express-async-errors"; // To catch all async errors
import { Router } from "express";

import lyricsRoute from "./api/lyrics.route";

const router = Router();

router.use("/lyrics", lyricsRoute);

export { router };
