import { IResolvedSnippet } from "./types";

/** Built-in snippets keyed by their original command key (e.g. "if" -> "surround.with.if") */
export const builtinSnippets: Record<string, IResolvedSnippet> = {
  if: {
    label: "if",
    description: "if ($condition) { ... }",
    snippet: "if(${1:condition}) {\n\t$TM_SELECTED_TEXT\n}$0",
    commandName: "if",
    _source: "builtin",
    _key: "if",
  },
  ifElse: {
    label: "if/else",
    description: "if ($condition) { ... } else { $else }",
    snippet:
      "if(${1:condition}) {\n\t$TM_SELECTED_TEXT\n} else {\n\t$2\n}$0",
    commandName: "ifElse",
    _source: "builtin",
    _key: "ifElse",
  },
  tryCatch: {
    label: "try/catch",
    description: "try { ... } catch (err) { $catchBlock }",
    snippet:
      "try {\n\t$TM_SELECTED_TEXT\n} catch (err) {\n\t$1\n}$0",
    commandName: "tryCatch",
    _source: "builtin",
    _key: "tryCatch",
  },
  tryFinally: {
    label: "try/finally",
    description: "try { ... } finally { $finalBlock }",
    snippet: "try {\n\t$TM_SELECTED_TEXT\n} finally {\n\t$1\n}$0",
    commandName: "tryFinally",
    _source: "builtin",
    _key: "tryFinally",
  },
  tryCatchFinally: {
    label: "try/catch/finally",
    description:
      "try { ... } catch (err) {$catchBlock} finally { $finalBlock }",
    snippet:
      "try {\n\t$TM_SELECTED_TEXT\n} catch (err) {\n\t$1\n} finally {\n\t$2\n}$0",
    commandName: "tryCatchFinally",
    _source: "builtin",
    _key: "tryCatchFinally",
  },
  for: {
    label: "for",
    description: "for ($1) { ... }",
    snippet: "for ($1) {\n\t$TM_SELECTED_TEXT\n}$0",
    commandName: "for",
    _source: "builtin",
    _key: "for",
  },
  fori: {
    label: "fori",
    description: "for (let i = 0; ... ; i = i + 1) { ... }",
    snippet:
      "for (let ${1:i} = ${2:0}; ${3:conditions}; $1 = $1 + 1) {\n\t$TM_SELECTED_TEXT\n}$0",
    commandName: "fori",
    _source: "builtin",
    _key: "fori",
  },
  forEach: {
    label: "forEach",
    description: "items.forEach((item) => { ... })",
    snippet:
      "${1:items}.forEach((${2:item}) => {\n\t$TM_SELECTED_TEXT\n})$0",
    commandName: "forEach",
    _source: "builtin",
    _key: "forEach",
  },
  forEachAsync: {
    label: "forEachAsync",
    description: "items.forEach(async (item) => { ... })",
    snippet:
      "${1:items}.forEach(async (${2:item}) => {\n\t$TM_SELECTED_TEXT\n})$0",
    commandName: "forEachAsync",
    _source: "builtin",
    _key: "forEachAsync",
  },
  forEachFn: {
    label: "forEachFn",
    description: "items.forEach(function (item) { ... })",
    snippet:
      "${1:items}.forEach(function (${2:item}) {\n\t$TM_SELECTED_TEXT\n})$0",
    commandName: "forEachFn",
    _source: "builtin",
    _key: "forEachFn",
  },
  forEachAsyncFn: {
    label: "forEachAsyncFn",
    description: "items.forEach(async function (item) { ... })",
    snippet:
      "${1:items}.forEach(async function (${2:item}) {\n\t$TM_SELECTED_TEXT\n})$0",
    commandName: "forEachAsyncFn",
    _source: "builtin",
    _key: "forEachAsyncFn",
  },
  arrowFunction: {
    label: "arrowFunction",
    description: "const $name = ($params) => { ... }",
    snippet:
      "const ${1:fnName} = (${2:params}) => {\n\t$TM_SELECTED_TEXT\n}$0",
    commandName: "arrowFunction",
    _source: "builtin",
    _key: "arrowFunction",
  },
  asyncArrowFunction: {
    label: "asyncArrowFunction",
    description: "const $name = async ($params) => { ... }",
    snippet:
      "const ${1:fnName} = async (${2:params}) => {\n\t$TM_SELECTED_TEXT\n}$0",
    commandName: "asyncArrowFunction",
    _source: "builtin",
    _key: "asyncArrowFunction",
  },
  functionDeclaration: {
    label: "functionDeclaration",
    description: "function $name ($params) { ... }",
    snippet:
      "function ${1:name} (${2:params}) {\n\t$TM_SELECTED_TEXT\n}$0",
    commandName: "functionDeclaration",
    _source: "builtin",
    _key: "functionDeclaration",
  },
  asyncFunctionDeclaration: {
    label: "asyncFunctionDeclaration",
    description: "async function $name ($params) { ... }",
    snippet:
      "async function ${1:name} (${2:params}) {\n\t$TM_SELECTED_TEXT\n}$0",
    commandName: "asyncFunctionDeclaration",
    _source: "builtin",
    _key: "asyncFunctionDeclaration",
  },
  functionExpression: {
    label: "functionExpression",
    description: "const $name = function ($params) { ... }",
    snippet:
      "const ${1:name} = function (${2:params}) {\n\t$TM_SELECTED_TEXT\n}$0",
    commandName: "functionExpression",
    _source: "builtin",
    _key: "functionExpression",
  },
  asyncFunctionExpression: {
    label: "asyncFunctionExpression",
    description: "const $name = async function ($params) { ... }",
    snippet:
      "const ${1:name} = async function (${2:params}) {\n\t$TM_SELECTED_TEXT\n}$0",
    commandName: "asyncFunctionExpression",
    _source: "builtin",
    _key: "asyncFunctionExpression",
  },
  iife: {
    label: "IIFE",
    description: "(function $name($params){ ... })($arguments);",
    snippet:
      "(function ${1:name}(${2:params}){\n\t$TM_SELECTED_TEXT\n})(${3:arguments});$0",
    commandName: "iife",
    _source: "builtin",
    _key: "iife",
  },
  element: {
    label: "<element></element>",
    description: "<element>...</element>",
    snippet: "<${1}$2>$TM_SELECTED_TEXT</$1>$0",
    languageIds: ["html", "typescriptreact", "javascriptreact", "jsx", "markdown"],
    commandName: "element",
    _source: "builtin",
    _key: "element",
  },
  comment: {
    label: "comment",
    description: "/** ...  */",
    snippet: "/**\n\t$TM_SELECTED_TEXT\n*/$0",
    commandName: "comment",
    _source: "builtin",
    _key: "comment",
  },
  region: {
    label: "#region",
    description: "#region $regionName ... #endregion",
    snippet: "// #region ${1:regionName}\n$TM_SELECTED_TEXT\n// #endregion$0",
    commandName: "region",
    _source: "builtin",
    _key: "region",
  },
  templateLiteral: {
    label: "Template Literal",
    description: "`...` (Also replaces single and double quotes with backtick)",
    snippet: "`${TM_SELECTED_TEXT/['\"](.*?)['\"]/$1/g}`$0",
    commandName: "templateLiteral",
    _source: "builtin",
    _key: "templateLiteral",
  },
  templateLiteralVariable: {
    label: "Template Literal Variable",
    description:
      "`${...}` (Also replaces single and double quotes with backtick)",
    snippet:
      "`$1\\${${TM_SELECTED_TEXT/['\"](.*?)['\"]/$1/g}}$2`$0",
    commandName: "templateLiteralVariable",
    _source: "builtin",
    _key: "templateLiteralVariable",
  },
};
