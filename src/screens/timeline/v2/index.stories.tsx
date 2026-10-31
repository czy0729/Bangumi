/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-31 00:00:00
 *
 * 时间胶囊页 Storybook 入口
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Timeline as Component } from '@screens'

export default {
  title: 'screens/Timeline',
  component: Component
}

export const Timeline = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Timeline')} />
    </StorybookList>
  </StorybookSPA>
)
