const sasRegex = /\bS[-,.]*A[-,.]*S\b/i;

export const isCompany = (name) => sasRegex.test(name);

export const firstLastInitialName = (name) => {
  const nameData = name.toUpperCase().split(" ");
  const result = nameData.map((name) => name[0]);
  return [result[0], result[result.length - 1]].join("");
};
