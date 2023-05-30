import path from 'path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --max-warnings=0 --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const commands = {
  '*.{ts,tsx}': [buildEslintCommand],
};

export default commands;
