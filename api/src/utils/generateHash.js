const allCharacters = () => {
  let characters = "";
  let i = 48;
  while (i <= 122) {
    if (i === 58) {
      i = 65;
      continue;
    }
    if (i === 91) {
      i = 97;
      continue;
    }
    characters += String.fromCharCode(i);
    i++;
  }

  characters += "!@#$%¨&*()_-+=[]|;:,.<>?^~";
  return characters.split("");
};

const generateHash = (str) => {
  const hashDivisor = 13 || process.env.HASH_DIVISOR;
  let passwordHash = "";
  const characters = allCharacters();
  const charactersLength = characters.length;
  for (const c of str.split("")) {
    const charCode = c.charCodeAt(0) % charactersLength;
    const index = (charCode * hashDivisor) % charactersLength;
    passwordHash += characters[index];
  }
  return passwordHash;
};

export default generateHash;
