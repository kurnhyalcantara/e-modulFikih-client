export const toCapitalize = (word) => {
  let wordCommon = word.split(" ");
  for (let i = 0; i < wordCommon.length; i++) {
    wordCommon[i] =
      wordCommon[i].charAt(0).toUpperCase() + wordCommon[i].substr(1);
  }
  return wordCommon.join(" ").toString();
};
