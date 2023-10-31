import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

type SettingItem = {
  title: string;
  value: string;
};
export const saveItemsToSetting = async (
  items: SettingItem[],
  force?: boolean
) => {
  const settingsPath = "../contracts-typechain/settings";
  let currentData: { [key: string]: string } = {};

  // Check if settings file exists
  if (existsSync(`${settingsPath}/settings.json`)) {
    const rawData = readFileSync(`${settingsPath}/settings.json`, "utf-8");
    currentData = JSON.parse(rawData);
  }

  // Merge/overwrite the new data
  // Merge/overwrite the new data
  for (const item of items) {
    currentData[item.title] = item.value;
  }

  // Check if settings directory exists
  if (!existsSync(settingsPath)) {
    mkdirSync(settingsPath, { recursive: true });
  }

  // Save the merged/updated data back to file
  const json = JSON.stringify(currentData, null, 2); // The third parameter makes the output more readable
  writeFileSync(`${settingsPath}/settings.json`, json, "utf-8");
};
