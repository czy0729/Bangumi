/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:08:58
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { UserSetting as Component } from '@screens'

export default {
  title: 'screens/UserSetting',
  component: Component
}

export const UserSetting = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('UserSetting')} />
    </StorybookList>
  </StorybookSPA>
)
