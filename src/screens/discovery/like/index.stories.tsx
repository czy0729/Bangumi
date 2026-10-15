/*
 * @Author: czy0729
 * @Date: 2024-08-06 03:08:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 *
 * 猜你喜欢 Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Like as Component } from '@screens'

export default {
  title: 'screens/Like',
  component: Component
}

export const Like = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Like')} />
    </StorybookList>
  </StorybookSPA>
)
