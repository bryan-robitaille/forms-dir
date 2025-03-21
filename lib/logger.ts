import pino from "pino";
import pretty from "pino-pretty";

export const logMessage = pino(
  {
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    browser: {
      asObject: true,
      serialize: true,
    },
    formatters: {
      level: (label) => ({ level: label }),
    },

    base: null,
  },
  process.env.NODE_ENV === "development"
    ? pretty({
        colorize: true,
      })
    : undefined
);
