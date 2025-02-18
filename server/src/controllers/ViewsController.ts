import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { type Context, Controller, HttpMethod, RequestMapping } from "$server/deps.js";

@Controller()
export default class ViewsController {
  private output: Buffer | null = null;

  @RequestMapping("/.*", { methods: [HttpMethod.Get] })
  async index({ response }: Context) {
    this.output ??= await readFile(join("client", "index.html"));
    response.html(this.output);
  }
}