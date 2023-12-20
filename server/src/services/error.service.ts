import { ZodError } from "zod";

const formatErrors = (error: unknown, defaultMessage?: string): string[] => {
  if (error instanceof ZodError)
    return error.issues.map((issue) => issue.message);

  if (error instanceof Error)
    return [error.message];

  if (Array.isArray(error))
    return error.map((item) => String(item));

  return [defaultMessage ?? "An error occurred."];
};

export default {
  formatErrors,
};