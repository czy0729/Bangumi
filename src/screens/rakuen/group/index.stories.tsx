/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 页面 Storybook 入口
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Group as Component } from '@screens'

export default {
  title: 'screens/Group',
  component: Component
}

export const Group = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Group')} />
    </StorybookList>
  </StorybookSPA>
)
