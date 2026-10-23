/*
 * @Author: czy0729
 * @Date: 2023-04-11 20:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 10:00:00
 *
 * 页面 Storybook 入口
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { LoginV2 as Component } from '@screens'

export default {
  title: 'screens/LoginV2',
  component: Component
}

export const LoginV2 = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('LoginV2')} />
    </StorybookList>
  </StorybookSPA>
)
