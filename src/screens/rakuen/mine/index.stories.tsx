/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-27 00:00:00
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Mine as Component } from '@screens'

export default {
  title: 'screens/Mine',
  component: Component
}

export const Mine = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Mine')} />
    </StorybookList>
  </StorybookSPA>
)
