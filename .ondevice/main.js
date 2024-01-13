/*
 * @Author: czy0729
 * @Date: 2024-01-13 22:05:57
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-13 22:05:57
 */
module.exports = {
  stories: ['../src/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-ondevice-notes',
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-backgrounds',
    '@storybook/addon-ondevice-actions'
  ]
}
