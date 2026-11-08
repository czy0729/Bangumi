/*
 * @Author: czy0729
 * @Date: 2023-11-15 02:47:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * Storybook 入口
 */
import { StorybookList, StorybookSPA } from '@components'
import { Playground as Component } from '@screens'

export default {
  title: 'screens/Playground',
  component: Component
}

export const Playground = () => (
  <StorybookSPA>
    <StorybookList>
      <Component />
    </StorybookList>
  </StorybookSPA>
)
