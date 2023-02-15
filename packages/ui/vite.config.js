/* eslint-disable import/no-extraneous-dependencies */
const react = require('@vitejs/plugin-react');
const { defineConfig } = require('vite');
const { configDefaults } = require('vitest/config');
// const tsconfigPaths = require("vite-tsconfig-paths");

module.exports = defineConfig({
    plugins: [react()],
    test: {
        exclude: [...configDefaults.exclude, 'components/*.{test,spec}.{ts,tsx}', "hooks/*.{test,spec}.{ts,tsx}", "utils/*.{test,spec}.{ts,tsx}"],
        globals: true,
        environment: 'happy-dom',
    },
});
