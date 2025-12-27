import type { AsyncResult } from "$server/types.js";
import { ZodError } from "zod";

export function asyncWrapper<Args extends unknown[], Data, Err>(
  getData: (...args: Args) => Promise<Data>,
  handleError: (error: unknown) => Err,
): (...args: Args) => AsyncResult<Data, Err> {
  return async (...args) => {
    try {
      const res = await getData(...args);
      return [res, null];
    } catch (error) {
      return [null, handleError(error)];
    }
  };
}

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