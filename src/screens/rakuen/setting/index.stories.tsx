/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { RakuenSetting as Component } from '@screens'

export default {
  title: 'screens/RakuenSetting',
  component: Component
}

export const RakuenSetting = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('RakuenSetting')} />
    </StorybookList>
  </StorybookSPA>
)
