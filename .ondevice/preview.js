/*
 * @Author: czy0729
 * @Date: 2024-01-13 22:06:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-13 22:06:00
 */
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds'

export const decorators = [withBackgrounds]
export const parameters = {
  backgrounds: [
    { name: 'plain', value: 'white', default: true },
    { name: 'warm', value: 'hotpink' },
    { name: 'cool', value: 'deepskyblue' }
  ],
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
