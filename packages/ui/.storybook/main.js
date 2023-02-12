const { mergeConfig } = require('vite');

module.exports = {
  stories: ['../components/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials',],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['@storybook/addon-a11y', "@storybook/addon-interactions", "@storybook/addon-actions"],
      },
    });
  },

};