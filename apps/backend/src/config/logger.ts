import pino from "pino";
import { env } from "./env";

const developmentLogger = pino({
  level: env.LOG_LEVEL,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});

const productionLogger = pino({
  level: env.LOG_LEVEL,
});

export const logger =
  env.NODE_ENV === "development"
    ? developmentLogger
    : productionLogger;