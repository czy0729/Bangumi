/*
 * @Author: czy0729
 * @Date: 2024-10-11 04:08:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 06:25:58
 *
 * 照片墙页面 Storybook 用例
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Milestone as Component } from '@screens'

export default {
  title: 'screens/Milestone',
  component: Component
}

export const Milestone = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Milestone')} />
    </StorybookList>
  </StorybookSPA>
)
