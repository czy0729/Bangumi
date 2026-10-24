/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 11:00:00
 *
 * 页面 Storybook 入口
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Blog as Component } from '@screens'

export default {
  title: 'screens/Blog',
  component: Component
}

export const Blog = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Blog')} />
    </StorybookList>
  </StorybookSPA>
)
