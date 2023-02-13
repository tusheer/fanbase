/* eslint-disable import/no-extraneous-dependencies */
const react = require('@vitejs/plugin-react');
const { defineConfig } = require('vite');
// const tsconfigPaths = require("vite-tsconfig-paths");

module.exports = defineConfig({
    plugins: [react()],
});
