import { green, red } from "https://deno.land/std@0.205.0/fmt/colors.ts";
import {folderExists, fileExists} from "../helpers/helpers.ts";

export default class EnviromentService {
  /**
   * Create a new .env enviroment file at the enviroments folders
   */
  public async createNewEnviroment(name: string) {
    await this.createEnviromentFolder();
    await this.createEnviromentFile(name);
    console.log(`${green('Enviroment succesfully created!')}`);
  }

  /**
   * Create if not exists the enviroment folder
   */
  private async createEnviromentFolder(): Promise<boolean> {
    if (!(await folderExists("enviroments"))) {
      await Deno.mkdir("./enviroments", { recursive: true });
    }

    return true;
  }

  /**
   * Create env file if not exists
   */
  private async createEnviromentFile(fileName: string): Promise<boolean> {
    const filePath = `enviroments/${fileName}.env`;

    if (await fileExists(filePath)) {
      console.error(`Enviroment ${red(fileName)} already exists!`);
      return Deno.exit(0);
    }

    const envContent = `ENV_NAME=${fileName}`;


    try {
      await Deno.writeTextFile(`./${filePath}`, envContent);
    } catch (error) {
      console.error("Error creating enviroment config file");
    }

    return true;
  }
}
