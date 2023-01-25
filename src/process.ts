import { errorHandler } from "./exceptions";

// Catch all unhandled errors
process.on("unhandledRejection", (reason: Error | any) => {
  console.error(`Unhandled Rejection: ${reason.message || reason}`);

  throw new Error(reason.message || reason);
});

process.on("uncaughtException", (error: Error) => {
  console.error(`Uncaught Exception: ${error.message}`);

  errorHandler.handleError(error);
});
