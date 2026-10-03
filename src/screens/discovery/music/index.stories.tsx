/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 00:00:00
 *
 * 找音乐 Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Music as Component } from '@screens'

export default {
  title: 'screens/Music',
  component: Component
}

export const Music = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Music')} />
    </StorybookList>
  </StorybookSPA>
)
