module.exports = {
  plugins: ["@typescript-eslint"],
  extends: ['turbo', 'prettier', "eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/recommended-requiring-type-checking"],
  rules: {
    "no-console": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "react/react-in-jsx-scope": "off",
    "@next/next/no-img-element": "off"
  }
};
