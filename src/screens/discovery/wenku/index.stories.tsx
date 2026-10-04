/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 *
 * 找文库 Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Wenku as Component } from '@screens'

export default {
  title: 'screens/Wenku',
  component: Component
}

export const Wenku = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Wenku')} />
    </StorybookList>
  </StorybookSPA>
)
