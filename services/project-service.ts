export default class ProjectService() {
  /**
   * Create a new .env enviroment file at the env folders
   */
  public async createNewProject(name: string) {
    await this.createEnviromentFolder();
    await this.createEnviromentFile(name);
    console.log(`${green('Enviroment succesfully created!')}`);
  }
}
