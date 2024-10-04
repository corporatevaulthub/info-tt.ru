export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
        printWidth: 250,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: "all",
        semi: true,
        bracketSameLine: true,
      },
    },
  ],
  printWidth: 200,
};
