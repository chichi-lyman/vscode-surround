import * as path from "path";
import { workspace, window, Uri } from "vscode";
import { ISurroundSnippet, ISurroundConfigFile, ISurroundConfigItem } from "./types";
import { getGlobalConfigDir } from "./loader";

/**
 * Export snippets from settings.json to a file-based config.
 * Groups snippets by languageIds to create efficient config groups.
 */
export async function exportSettingsToFile(): Promise<void> {
  const config = workspace.getConfiguration("surround");
  const withConfig = config.get<Record<string, ISurroundSnippet>>("with", {}) || {};
  const custom = config.get<Record<string, ISurroundSnippet>>("custom", {}) || {};

  // Collect all snippets from settings
  const allSnippets: { key: string; snippet: ISurroundSnippet }[] = [];

  for (const [key, value] of Object.entries(withConfig)) {
    if (typeof value === "object" && value.label) {
      allSnippets.push({ key, snippet: value });
    }
  }

  for (const [key, value] of Object.entries(custom)) {
    if (typeof value === "object" && value.label) {
      allSnippets.push({ key, snippet: value });
    }
  }

  if (allSnippets.length === 0) {
    window.showInformationMessage(
      "Surround: No snippets found in settings.json to export."
    );
    return;
  }

  // Group snippets by their languageIds signature
  const groups = new Map<string, { languages?: string[]; snippets: ISurroundSnippet[] }>();

  for (const { key, snippet } of allSnippets) {
    const langKey = snippet.languageIds
      ? JSON.stringify([...snippet.languageIds].sort())
      : "__all__";

    if (!groups.has(langKey)) {
      groups.set(langKey, {
        languages: snippet.languageIds,
        snippets: [],
      });
    }

    // Create a clean snippet without languageIds (it's on the group)
    const cleanSnippet: ISurroundSnippet = {
      label: snippet.label,
      snippet: snippet.snippet,
      commandName: key,
    };
    if (snippet.description) {
      cleanSnippet.description = snippet.description;
    }
    if (snippet.detail) {
      cleanSnippet.detail = snippet.detail;
    }
    if (snippet.disabled) {
      cleanSnippet.disabled = snippet.disabled;
    }

    groups.get(langKey)!.snippets.push(cleanSnippet);
  }

  // Build config items: use groups for multi-snippet language sets,
  // standalone snippets when a group has no languages
  const items: ISurroundConfigItem[] = [];

  for (const [langKey, group] of groups) {
    if (langKey === "__all__" && group.snippets.length === 1) {
      // Single snippet with no language restriction -> standalone
      items.push(group.snippets[0]);
    } else if (langKey === "__all__") {
      // Multiple snippets with no language restriction -> group without languages
      items.push({ snippets: group.snippets });
    } else if (group.snippets.length === 1) {
      // Single snippet with languages -> standalone with languageIds
      items.push({
        ...group.snippets[0],
        languageIds: group.languages,
      });
    } else {
      // Multiple snippets with same languages -> group
      items.push({
        languages: group.languages,
        snippets: group.snippets,
      });
    }
  }

  const configFile: ISurroundConfigFile = { items };
  const jsonContent = JSON.stringify(configFile, null, 2);

  // Write to global config directory
  const globalDir = getGlobalConfigDir();
  const globalDirUri = Uri.file(globalDir);
  const outputFile = Uri.joinPath(globalDirUri, "default.json");

  // Check if file already exists
  try {
    await workspace.fs.stat(outputFile);
    const overwrite = await window.showWarningMessage(
      `Surround: "${path.join(globalDir, "default.json")}" already exists. Overwrite?`,
      "Yes",
      "No"
    );
    if (overwrite !== "Yes") {
      return;
    }
  } catch {
    // File doesn't exist — create the directory
    try {
      await workspace.fs.createDirectory(globalDirUri);
    } catch {
      // Directory might already exist
    }
  }

  await workspace.fs.writeFile(
    outputFile,
    Buffer.from(jsonContent, "utf-8")
  );

  const openFile = await window.showInformationMessage(
    `Surround: Snippets exported to ${path.join(globalDir, "default.json")}.`,
    "Open File"
  );

  if (openFile === "Open File") {
    const doc = await workspace.openTextDocument(outputFile);
    await window.showTextDocument(doc);
  }
}
