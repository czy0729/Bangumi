/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 14:43:56
 *
 * 用户日志页 Storybook 入口
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Blogs as Component } from '@screens'

export default {
  title: 'screens/Blogs',
  component: Component
}

export const Blogs = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Blogs')} />
    </StorybookList>
  </StorybookSPA>
)
