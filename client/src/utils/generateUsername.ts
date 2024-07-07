function generateUsername(names: string | string[]): string {
  let username = "";

  if (typeof names === "string") {
    username = names.toLowerCase().replace(/\s/g, "-");
  } else if (Array.isArray(names)) {
    username = names
      .map((name) => name.toLowerCase().replace(/\s/g, "-"))
      .join("-");
  }

  return username;
}

export default generateUsername;
