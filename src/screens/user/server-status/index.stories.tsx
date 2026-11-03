/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 19:54:58
 */
import { StorybookList, StorybookSPA } from '@components'
import { ServerStatus as Component } from '@screens'

export default {
  title: 'screens/ServerStatus',
  component: Component
}

export const ServerStatus = () => (
  <StorybookSPA>
    <StorybookList>
      <Component />
    </StorybookList>
  </StorybookSPA>
)
