/** @format */
import chalk from "chalk";

export const renderLog = (text) => {
  const str = new Array(10).fill("*").join("");
  return console.log(chalk.blueBright(`${str} ${text} ${str}`));
};
