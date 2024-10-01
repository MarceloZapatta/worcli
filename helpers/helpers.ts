/**
 * Checks if the folder exists and is not a file
 */
export async function folderExists(folder: string): Promise<boolean> {
  let stat: false | Deno.FileInfo = false;
  try {
    stat = await Deno.stat(`./${folder}`);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      stat = false;
    } else {
      throw error;
    }
  }

  return stat && stat.isDirectory;
}

/**
 * Checks if the folder exists and is not a file
 */
export async function fileExists(filePath: string): Promise<boolean> {
  let stat: false | Deno.FileInfo = false;
  try {
    stat = await Deno.stat(`./${filePath}`);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      stat = false;
    } else {
      throw error;
    }
  }

  return stat && stat.isFile;
}
