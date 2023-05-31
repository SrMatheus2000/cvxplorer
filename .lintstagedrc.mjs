import path from 'path';

const buildEslintCommand = (filenames) =>
  `eslint --fix --max-warnings=0 ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

const commands = {
  '*.{ts,tsx}': [buildEslintCommand],
};

export default commands;
