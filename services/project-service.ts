import { green, red } from "https://deno.land/std@0.205.0/fmt/colors.ts";
import { folderExists } from "../helpers/helpers.ts";
import EnviromentService from "./enviroment-service.ts";

export default class ProjectService {
  enviromentService: EnviromentService;

  constructor () {
    this.enviromentService = new EnviromentService();
  }

  /**
   * Create a new .env enviroment file at the env folders
   */
  public async createNewProject(name: string) {
    await this.createProjectFolder(name);
    this.createRunFile(name);
    console.log(`${green('Project succesfully created!')}`);
  }

  /**
   * Create if not exists the project folder
   */
  private async createProjectFolder(name: string): Promise<boolean> {
    if (await folderExists(`./enviroments/${this.enviromentService.getCurrentEnviroment()}/${name}`)) {
      console.error(`Project [${red(name)}] already exists!`);
      return Deno.exit(0)
    }
    
    await Deno.mkdir(`./enviroments/${this.enviromentService.getCurrentEnviroment()}/${name}`);
    return true;
  }

  /**
   * Create if not exists the project folder
   */
  private createRunFile(name: string): boolean {
    let templateBash = '#!/usr/bin/env bash\n';
    templateBash += '# This is the run file for your project\n';
    templateBash += '# Please include any scripts you use to run your project\n';

    Deno.writeTextFileSync(`./enviroments/${this.enviromentService.getCurrentEnviroment()}/${name}/run.sh`, templateBash);
    return true;
  }
}
