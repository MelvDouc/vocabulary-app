import { ZodError } from "zod";

export function flattenErrors(zodError: ZodError): string[] {
  return zodError.errors.map((e) => e.message);
}

export function getErrorMessages(arg: unknown): string[] {
  if (Array.isArray(arg))
    return arg.flatMap(getErrorMessages);

  if (arg instanceof ZodError)
    return flattenErrors(arg);

  if (arg instanceof Error)
    return [arg.message];

  if (typeof arg === "object" && arg !== null)
    return [arg.toString()];

  return [String(arg)];
}