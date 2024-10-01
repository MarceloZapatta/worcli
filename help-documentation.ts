import { red, green, blue, bold, brightYellow, underline,  } from "https://deno.land/std@0.205.0/fmt/colors.ts";

export default async function helpDocumentation() {
  console.log(`worKLI ${await getCurrentVersion()}`);
  console.log('What you want to do?');
  console.log(brightYellow('help'));
  console.log(` ${green('help')} shows this worKLI helper`);
  console.log(brightYellow('make'));
  console.log(` ${green('make:enviroment')} creates a new enviroment`);
  console.log(` ${green('make:project')} creates a new project`);
}

async function getCurrentVersion() {
  const packageJson = await Deno.readTextFile("./package.json");
  const parsed = JSON.parse(packageJson);
  return parsed.version;
}
