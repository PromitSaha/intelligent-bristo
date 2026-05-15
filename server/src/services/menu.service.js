import fs from "fs";
import path from "path";

const menuPath = path.resolve(
  "src/data/menu.json"
);

export const getMenuItems = () => {
  const data =
    fs.readFileSync(menuPath, "utf-8");

  return JSON.parse(data);
};