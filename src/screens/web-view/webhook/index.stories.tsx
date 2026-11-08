/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * Storybook 入口
 */
import { StorybookList, StorybookSPA } from '@components'
import { Webhook as Component } from '@screens'

export default {
  title: 'screens/Webhook',
  component: Component
}

export const Webhook = () => (
  <StorybookSPA>
    <StorybookList>
      <Component />
    </StorybookList>
  </StorybookSPA>
)
