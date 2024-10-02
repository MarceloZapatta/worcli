import { green } from 'https://deno.land/std@0.205.0/fmt/colors.ts';
import { currentEnviroment, helpDocumentation } from './help-documentation.ts';
import EnviromentService from './services/enviroment-service.ts';
import EnviromentNotFound from './exceptions/enviroment-not-found.ts';
import ProjectService from './services/project-service.ts';

export default class App {
  enviromentService: EnviromentService;
  projectService: ProjectService;

  constructor() {
    this.enviromentService = new EnviromentService();
    this.projectService = new ProjectService();
  }

  async showHelpDocs() {
    await helpDocumentation();
  }

  showCurrentEviroment() {
    currentEnviroment();
  }

  async processArg(args: string[]) {
    this.showCurrentEviroment();

    const arg = args[0];

    try {
      switch (arg) {
        case 'make:enviroment':
          await this.makeEnviroment(args[1]);
          break;
        case 'make:project':
          await this.makeProject(args[1]);
          break;
        case 'enviroment:activate':
          await this.setCurrentEnviroment(args[1]);
          break;
        default:
          this.showCommandNotFound(arg);
          break;
      }
    } catch (error) {
      if (error instanceof EnviromentNotFound) {
        console.error('No enviroment is active.');
        return Deno.exit(0);
      }

      throw error;
    }
  }

  async makeEnviroment(name: string) {
    await this.enviromentService.createNewEnviroment(name);
  }

  async setCurrentEnviroment(name: string) {
    await this.enviromentService.setCurrentEnviroment(name);
  }

  async makeProject(arg: string) {
    await this.projectService.createNewProject(arg);
  }

  showCommandNotFound(arg: string) {
    console.log(`The command ${green(arg)} was not found.`);
  }
}
