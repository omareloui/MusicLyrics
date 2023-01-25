#!/usr/bin/env node

import { spawn } from "node:child_process";
import { LyricsController } from "../controllers/lyrics.controller";

const lyricsController = new LyricsController();

const cmus = spawn("cmus-remote", ["-Q"]);
const grep = spawn("grep", ["-P", "^tag (artist|album|title) "]);
const sed = spawn("sed", ["s/^tag \\(artist\\|album\\|title\\) //"]);

cmus.stdout.pipe(grep.stdin);
grep.stdout.pipe(sed.stdin);

let finalData = "";

sed.stdout.on("data", data => {
  finalData += data.toString();
});

sed.on("exit", async () => {
  finalData = finalData.trim();
  const [artist, album, title] = finalData.split("\n");
  const lyrics = await lyricsController.getByArtistAndTite({
    artist,
    album,
    title,
  });
  console.log(lyrics);
});
