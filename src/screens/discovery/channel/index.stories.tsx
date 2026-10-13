/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:50:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 页面 Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Channel as Component } from '@screens'

export default {
  title: 'screens/Channel',
  component: Component
}

export const Channel = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Channel')} />
    </StorybookList>
  </StorybookSPA>
)
