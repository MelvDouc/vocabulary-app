import { readFile } from "node:fs/promises";
import { join } from "node:path";
import mime from "mime";
import {
  Controller,
  HttpMethod,
  RequestMapping,
  type Context,
  type NextFunction
} from "$server/deps.js";

@Controller()
export default class MiddlewareController {
  @RequestMapping("/.+", { methods: [HttpMethod.Get] })
  async staticMiddleware({ request, response }: Context, next: NextFunction) {
    try {
      const contentType = this.getContentType(request.url);

      if (!contentType)
        throw new Error();

      const filePath = join(process.cwd(), request.url);
      const buffer = await readFile(filePath);
      response.setContentType(contentType);
      response.end(buffer);
    } catch {
      next();
    }
  }

  private getContentType(filePath: string): string | null {
    return mime.getType(filePath);
  }
}