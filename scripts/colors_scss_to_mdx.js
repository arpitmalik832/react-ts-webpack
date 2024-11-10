/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirName = path.dirname(filename);

// Paths to the source SCSS file and target MDX file
const scssFilePath = path.join(
  dirName,
  '../static/styles/style-dictionary/colors.scss',
);
const mdxFilePath = path.join(dirName, '../src/stories/Colors/index.mdx');

// Read the SCSS file
const scssContent = fs.readFileSync(scssFilePath, 'utf8');

// Read the existing MDX file
let mdxContent = fs.readFileSync(mdxFilePath, 'utf8');

// Create a markdown code block with the SCSS content
const scssCodeBlock = `\`\`\`scss\n${scssContent}\n\`\`\``;

// Replace a placeholder in the MDX file with the SCSS code block
mdxContent = mdxContent.replace(
  '-- SCSS_CONTENT_PLACEHOLDER --',
  scssCodeBlock,
);

// Write the updated content back to the MDX file
fs.writeFileSync(mdxFilePath, mdxContent);

console.log('SCSS content has been copied to the MDX file.');
