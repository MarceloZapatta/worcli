import { green } from "https://deno.land/std@0.205.0/fmt/colors.ts";
import {currentEnviroment, helpDocumentation} from "./help-documentation.ts";
import EnviromentService from "./services/enviroment-service.ts";

export default class App {
  enviromentService: EnviromentService;

  constructor() {
    this.enviromentService = new EnviromentService();
  }

  async showHelpDocs() {
    await helpDocumentation();
  }

  showCurrentEviroment() {
    currentEnviroment();
  }

  processArg(args: string[]) {
    this.showCurrentEviroment();

    const arg = args[0];

    switch (arg) {
      case "make:enviroment":
        this.makeEnviroment(args[1]);
        break;
      case "make:project":
        this.makeProject(args[1]);
        break;
      case "enviroment:activate":
        this.setCurrentEnviroment(args[1]);
        break;
      default:
        this.showCommandNotFound(arg);
        break;
    }
  }

  async makeEnviroment(name: string) {
    await this.enviromentService.createNewEnviroment(name);
  }

  async setCurrentEnviroment(name: string) {
    await this.enviromentService.setCurrentEnviroment(name);
  }

  makeProject(arg: string) {
    return true;
  }

  showCommandNotFound(arg: string) {
    console.log(`The command ${green(arg)} was not found.`);
  }
}
