import {
  workspace,
  Disposable,
  Uri,
  RelativePattern,
  FileSystemWatcher,
} from "vscode";

/**
 * Creates file system watchers for config directories.
 * Calls `onConfigChanged` (debounced) when any .json file changes.
 */
export function createConfigWatchers(
  globalDir: string,
  projectDir: string | undefined,
  onConfigChanged: () => void
): Disposable[] {
  const disposables: Disposable[] = [];
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;

  function debouncedReload() {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(onConfigChanged, 300);
  }

  function watchDir(dirPath: string): FileSystemWatcher {
    const pattern = new RelativePattern(Uri.file(dirPath), "*.json");
    const watcher = workspace.createFileSystemWatcher(pattern);
    watcher.onDidCreate(debouncedReload);
    watcher.onDidChange(debouncedReload);
    watcher.onDidDelete(debouncedReload);
    return watcher;
  }

  // Watch global config directory
  disposables.push(watchDir(globalDir));

  // Watch project config directory
  if (projectDir) {
    disposables.push(watchDir(projectDir));
  }

  return disposables;
}
