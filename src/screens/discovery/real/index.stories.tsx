/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 00:00:00
 *
 * 找三次元 Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Real as Component } from '@screens'

export default {
  title: 'screens/Real',
  component: Component
}

export const Real = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Real')} />
    </StorybookList>
  </StorybookSPA>
)
