import { green } from "https://deno.land/std@0.205.0/fmt/colors.ts";
import helpDocumentation from "./help-documentation.ts";
import EnviromentService from "./services/enviroment-service.ts";

export default class App {
  async printHelpDocs() {
    await helpDocumentation();
  }

  processArg(args: string[]) {
    const arg = args[0];

    switch (arg) {
      case "make:enviroment":
        this.makeEnviroment(args[1]);
        break;
      case "make:project":
        this.makeProject(args[1]);
      default:
        this.showCommandNotFound(arg);
        break;
    }
  }

  async makeEnviroment(name: string) {
    const enviromentService = new EnviromentService();
    await enviromentService.createNewEnviroment(name);
  }

  makeProject() {
    return true;
  }

  showCommandNotFound(arg: string) {
    console.log(`The command ${green(arg)} was not found.`);
  }
}
