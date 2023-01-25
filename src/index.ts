import "dotenv/config";

import Express, { Response, Request, NextFunction } from "express";
import { router } from "./routes";
import "./process";

import { errorHandler } from "./exceptions";

const app = Express();

const PORT = process.env.PORT || 3000;

app.use("/api", router);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  errorHandler.handleError(err, res);
});

app.listen(PORT, () => {
  console.info(`Listening on http://localhost:${PORT}`);
});
