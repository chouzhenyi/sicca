/** @format */

export const propsDisplay = (data) => {
  if (data instanceof Object) {
    const result = Object.keys(data)
      .map((key) => {
        return `${key}: ${data[key]},`;
      })
      .join("\n");
    return result;
  }
  return "{}";
};
