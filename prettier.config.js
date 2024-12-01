/**
 * @type {import('prettier').Config}
 * https://prettier.io/docs/en/options
 */
module.exports = {
  bracketSameLine: true,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^(?!(.*)[.]scss$)(@/)(.*)$',
    '',
    '^(?!(.*)[.]scss$)[.](.*)$',
    '',
    '.scss$'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  jsxSingleQuote: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  printWidth: 110,
  proseWrap: 'never',
  quoteProps: 'consistent',
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  tailwindFunctions: ['cls', 'clsx']
}
