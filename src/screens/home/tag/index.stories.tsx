/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:54:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * storybook 入口
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Tag as Component } from '@screens'

export default {
  title: 'screens/Tag',
  component: Component
}

export const Tag = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Tag')} />
    </StorybookList>
  </StorybookSPA>
)
