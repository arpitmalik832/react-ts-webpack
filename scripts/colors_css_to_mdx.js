/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirName = path.dirname(filename);

// Path to your CSS file
const cssFilePath = path.join(
  dirName,
  '../static/styles/postcss-processed/index.css',
);

// Path to your mdx file
const mdxFilePath = path.join(dirName, '../src/stories/Colors/index.mdx');

// Read the CSS file
const cssContent = fs.readFileSync(cssFilePath, 'utf8');

// Regular expression to match color custom properties
const colorRegex =
  /--(background)-[a-zA-Z0-9-]+:\s*(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|rgb\([^)]+\)|rgba\([^)]+\)|[a-zA-Z]+)/g;

// Extract color variables
const colorVariables = [];
let res = [];
let match;

function deduplicate(array) {
  return [...new Set(array)];
}

while (colorRegex.exec(cssContent) !== null) {
  match = colorRegex.exec(cssContent);
  const [fullMatch] = match;
  const variableName = fullMatch.split(':')[0].trim();
  colorVariables.push(variableName);

  res = deduplicate(colorVariables);
}

// Create a markdown code block with the SCSS content
const scssCodeBlock = `\`\`\`scss\n${res.map((i, ind) => `${ind !== 0 ? '\n' : ''}${i}`).join('')}\n\`\`\``;

// Read the existing MDX file
let mdxContent = fs.readFileSync(mdxFilePath, 'utf8');

// Replace a placeholder in the MDX file with the SCSS code block
mdxContent = mdxContent.replace('-- CSS_COLOR_CONTENT --', scssCodeBlock);

// Write the updated content back to the MDX file
fs.writeFileSync(mdxFilePath, mdxContent);

console.log(`Color variables have been extracted and saved to mdx file`);
