/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找漫画 Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Manga as Component } from '@screens'

export default {
  title: 'screens/Manga',
  component: Component
}

export const Manga = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Manga')} />
    </StorybookList>
  </StorybookSPA>
)
