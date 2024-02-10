/**
 * @type {import('prettier').Config}
 * https://prettier.io/docs/en/options
 */
module.exports = {
  htmlWhitespaceSensitivity: 'ignore',
  importOrder: ['^[a-zA-Z0-9-]+', '^@', '^[./]', '^[../]'],
  jsxSingleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 120,
  proseWrap: 'never',
  quoteProps: 'consistent',
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  tailwindFunctions: ['cls', 'clsx']
}
