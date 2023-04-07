module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web',
    {
      name: 'storybook-dark-mode',
      parameters: {
        defaultTheme: 'Dark'
      }
    }
  ],
  core: {
    builder: 'webpack5'
  },
  framework: '@storybook/react'
}
