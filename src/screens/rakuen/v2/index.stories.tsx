/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 超展开页 Storybook 入口
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Rakuen as Component } from '@screens'

export default {
  title: 'screens/Rakuen',
  component: Component
}

export const Rakuen = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Rakuen')} />
    </StorybookList>
  </StorybookSPA>
)
