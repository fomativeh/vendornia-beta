export const removeNonNumericCharacters = (input: string) => {
    const match = input.match(/^[^0-9]+/);
    const prefix = match ? match[0] : "";
    const numericPart = input.slice(prefix.length).replace(/[^0-9]+/g, "");
    return prefix + numericPart;
  };