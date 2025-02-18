import { type Context, Controller, HttpMethod, RequestMapping } from "$server/deps.js";
import wordModel from "$server/models/word.model.js";

@Controller({ prefix: "/api/v1" })
export default class ApiController {
  @RequestMapping("/languages", { methods: [HttpMethod.Get] })
  async languages({ response }: Context) {
    const languages = await wordModel.getLanguages();
    response.json(languages);
  }
}