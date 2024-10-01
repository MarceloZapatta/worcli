#!/usr/bin/env node

import App from "./app.ts";

const app = new App();

const args = Deno.args;

if (args.length === 0) {
  await app.printHelpDocs();
  Deno.exit(1);
}

app.processArg(args);