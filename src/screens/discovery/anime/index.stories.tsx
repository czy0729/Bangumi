/*
 * @Author: czy0729
 * @Date: 2023-04-09 08:54:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 页面 Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Anime as Component } from '@screens'

export default {
  title: 'screens/Anime',
  component: Component
}

export const Anime = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Anime')} />
    </StorybookList>
  </StorybookSPA>
)
