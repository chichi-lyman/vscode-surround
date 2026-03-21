import { builtinSnippets } from "../../src/config/defaults";

describe("builtinSnippets", () => {
  it("should have 23 built-in snippets", () => {
    expect(Object.keys(builtinSnippets)).toHaveLength(23);
  });

  it("should have unique labels", () => {
    const labels = Object.values(builtinSnippets).map((s) => s.label);
    const uniqueLabels = new Set(labels);
    expect(uniqueLabels.size).toBe(labels.length);
  });

  it("every snippet should have required fields", () => {
    for (const [key, snippet] of Object.entries(builtinSnippets)) {
      expect(snippet.label).toBeTruthy();
      expect(snippet.snippet).toBeTruthy();
      expect(snippet._source).toBe("builtin");
      expect(snippet._key).toBe(key);
      expect(snippet.commandName).toBe(key);
    }
  });

  it("element snippet should have languageIds", () => {
    expect(builtinSnippets.element.languageIds).toEqual([
      "html",
      "typescriptreact",
      "javascriptreact",
      "jsx",
      "markdown",
    ]);
  });
});
